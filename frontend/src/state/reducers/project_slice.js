import { createSlice } from '@reduxjs/toolkit';
import { fetchProjectsThunk, updateProjectThunk } from '../thunk/project_thunk';

const initialState = {
    currentProject: null,
    projects: [],
    error: null,
    loading: false,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setCurrentProject(state, action) {
            state.currentProject = action.payload;
        },
        addProject(state, action) {
            const newProject = action.payload ?? null;

            const index = state.projects.findIndex(project => project.id === newProject.owner)

            if (index !== -1) {
                state.projects[index] = action.payload
            } else {
                state.projects.push(action.payload);
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
                state
            }
        },
        removeProject(state, action) {
            const projectId = action.payload ?? null;

            state.projects = state.projects.filter(
                (project) => project.id !== projectId);

            if (state.currentProject.id === projectId) {
                state.currentProject = null;
            }
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }, // Add more and revise the extra reducers when implementing the logic for displaying loading spinner and error messages.
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsThunk.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchProjectsThunk.fulfilled, (state, action) => {
                state.projects = action.payload;
                state.loading = false;
            })
            .addCase(fetchProjectsThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateProjectThunk.fulfilled, (state, action) => {
                state.error = null
                state.loading = false;
            })
            .addCase(updateProjectThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateProjectThunk.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
    }
});

export const selectProjects = (state) => state.project.projects;
export const selectCurrentProject = (state) => state.project.currentProject;

export const {
    setCurrentProject,
    addProject,
    setProjects,
    updateProject,
    removeProject,
    setError
} = projectSlice.actions;

export default projectSlice.reducer;