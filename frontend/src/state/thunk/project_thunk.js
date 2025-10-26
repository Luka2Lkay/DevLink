import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setProjects, updateProject, setError } from "../reducers/project_slice";

export const fetchProjectsThunk = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { dispatch }) => {
        try {
            const user = sessionStorage.getItem('user');
            const response = await axios.get('http://localhost:3000/api/projects/get-all-projects', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`,
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

export const updateProjectThunk = createAsyncThunk(
    'projects/updateProject',
    async (projectData, { dispatch }) => {
        try {
            const user = sessionStorage.getItem('user');
            const response = await axios.put(`http://localhost:3000/api/projects/update-project/${projectData.id}`, projectData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`,
                },
            });
            console.log("Updated project response:", response.data);
            // dispatch(updateProject(response.data));
            return response.data;
        } catch (error) {
            dispatch(setError("Failed to update project"));
            throw new Error(error.response.data);
        }
    }
);

