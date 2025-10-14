import {configureStore} from '@reduxjs/toolkit';
import projectReducer from './state/reducers/project_slice.js';

const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});

export default store;
