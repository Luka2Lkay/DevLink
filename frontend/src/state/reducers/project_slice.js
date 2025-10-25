import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentProject: null,
    projects: [],
    error: null,

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
        setError(state, action) {
            state.error = action.payload;
        }
    },
});

export const selectProjects = (state) => state.project.projects;
export const selectCurrentProject = (state) => state.project.currentProject;

export const {
    setCurrentProject,
    addProject,
    setProjects,
    setError
} = projectSlice.actions;

export default projectSlice.reducer;