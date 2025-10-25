import {configureStore} from require('@reduxjs/toolkit');
import projectReducer from require('./reducers/project_slice');

const store = configureStore({
    reducer: {
        project: projectReducer,
    },
});

export default store;