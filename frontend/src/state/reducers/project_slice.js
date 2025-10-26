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
            state.projects.push(action.payload);
        },
        setProjects(state, action) {
            state.projects = action.payload;
        },
        updateProject(state, action) {
            const index = state.projects.findIndex(
                (project) => project.id === action.payload.id
            );
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        setError(state, action) {
            state.error = action.payload;
        }
    },
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
    }
});

export const selectProjects = (state) => state.project.projects;
export const selectCurrentProject = (state) => state.project.currentProject;

export const {
    setCurrentProject,
    addProject,
    setProjects,
    updateProject,
    setError
} = projectSlice.actions;

export default projectSlice.reducer;