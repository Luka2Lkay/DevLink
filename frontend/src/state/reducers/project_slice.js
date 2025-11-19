import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjectsThunk,
  updateProjectThunk,
  addProjectThunk,
} from "../thunks/project_thunk.js";

const initialState = {
  currentProject: null,
  projects: [],
  errorMessage: "",
  loading: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject(state, action) {
      state.currentProject = action.payload;
    },
    addProject(state, action) {
      const newProject = action.payload ?? null;

      const index = state.projects.findIndex(
        (project) => project.id === newProject.owner
      );

      if (index !== -1) {
        state.projects[index] = action.payload;
      } else {
        state.projects.unshift(action.payload);
      }
    },
    setProjects(state, action) {
      state.projects = action.payload;
    },
    updateProject(state, action) {
      const payload = action.payload ?? null;

      const index = state.projects.findIndex(
        (project) => project.id === payload.id
      );
      if (index !== -1) {
        state.projects[index] = payload;
      }

      if (state.currentProject.id === payload.id) {
        state;
      }
    },
    removeProject(state, action) {
      const projectId = action.payload ?? null;

      state.projects = state.projects.filter(
        (project) => project.id !== projectId
      );

      if (state.currentProject.id === projectId) {
        state.currentProject = null;
      }
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsThunk.pending, (state) => {
        state.errorMessage = "";
        state.loading = true;
      })
      .addCase(fetchProjectsThunk.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectsThunk.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(updateProjectThunk.fulfilled, (state) => {
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(updateProjectThunk.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(updateProjectThunk.pending, (state) => {
        state.errorMessage = "";
        state.loading = true;
      })
      .addCase(addProjectThunk.rejected, (state) => {
        state.errorMessage = action.payload;
        state.loading = true;
      });
  },
});

export const selectProjects = (state) => state.project.projects ?? [];
export const selectCurrentProject = (state) => state.project.currentProject ?? null;
export const selectLoading = (state) => state.project.loading ?? false;
export const selectErrorMessage = (state) => state.project.errorMessage ?? "";

export const {
  setCurrentProject,
  addProject,
  setProjects,
  updateProject,
  removeProject,
  setErrorMessage,
} = projectSlice.actions;

export default projectSlice.reducer;
