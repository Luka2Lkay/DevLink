import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjectsThunk = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const user = sessionStorage.getItem('user');
            const response = await axios.get('http://localhost:3000/api/projects/get-all-projects', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`,
                },
            });

            return response.data.projects;
        } catch (error) {
            return rejectWithValue("Failed to fetch projects: ", error.response.data);
        }
    }
);

export const updateProjectThunk = createAsyncThunk(
    'projects/updateProject',
    async (projectData, { rejectWithValue }) => {
        try {
            const user = sessionStorage.getItem('user');
            const response = await axios.put(`http://localhost:3000/api/projects/update-project/${projectData.id}`, projectData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to update project: ", error.response.data);
        }
    }
);

export const deleteProjectThunk = createAsyncThunk(
    'projects/deleteProject',
    async (projectId, { rejectWithValue }) => {
        try {
            const user = sessionStorage.getItem('user');
            const response = await axios.delete(`http://localhost:3000/api/projects/delete-project/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to delete project: ", error.response.data);
        }
    }
);

export const addProjectThunk = createAsyncThunk("projects/addProjects",
    async (projectData, { rejectWithValue }) => {

        try {

            const user = sessionStorage.getItem("user");
            const response = await axios.post("http://localhost:3000/api/projects/add-project", projectData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`
                }
            })

            return response.data;

        } catch (error) {
            return rejectWithValue("Failed to add project: ", error.response.data)
        }
    })

