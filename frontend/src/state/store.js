import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducers/project_slice';
import inviteReducer from './reducers/invite_slice'

const store = configureStore({
    reducer: {
        project: projectReducer,
        invite: inviteReducer
    },
});

export default store;