import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setProjects, setError } from "../reducers/project_slice";

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/projects/get-all-projects', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            dispatch(setProjects(response.data.projects));
            return response.data.projects;
        } catch (error) {
            dispatch(setError("Failed to fetch projects"));
            throw new Error(error.response.data);
        }
    }
);
