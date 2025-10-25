import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducers/project_slice';

const store = configureStore({
    reducer: {
        project: projectReducer,
    },
});

export default store;