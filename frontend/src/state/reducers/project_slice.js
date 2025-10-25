import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentProject: null,
    projects: [],
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
    },
});

export const {
    setCurrentProject,
    addProject,
} = projectSlice.actions;

export default projectSlice.reducer;