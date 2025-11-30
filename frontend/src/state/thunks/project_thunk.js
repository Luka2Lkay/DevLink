import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjectsThunk = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) rejectWithValue("User not authenticated!");

      const { token } = JSON.parse(user);
      const response = await axios.get(
        "https://devlink-9xp4.onrender.com/api/projects/get-all-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.projects.reverse();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

export const updateProjectThunk = createAsyncThunk(
  "projects/updateProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) rejectWithValue("User not authenticated!");

      const { token } = JSON.parse(user);
      const response = await axios.put(
        `https://devlink-9xp4.onrender.com/api/projects/update-project/${projectData.id}`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }
);

export const deleteProjectThunk = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) rejectWithValue("User not authenticated!");

      const { token } = JSON.parse(user);
      const response = await axios.delete(
        `https://devlink-9xp4.onrender.com/api/projects/delete-project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }
);

export const addProjectThunk = createAsyncThunk(
  "projects/addProjects",
  async (projectData, { rejectWithValue }) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) rejectWithValue("User not authenticated!");

      const { token } = JSON.parse(user);
      const response = await axios.post(
        "https://devlink-9xp4.onrender.com/api/projects/add-project",
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add project"
      );
    }
  }
);

export const fetchProjectCommitsThunk = createAsyncThunk(
  "projects/fetchProjectCommits",
  async (projectId, { rejectWithValue }) => {
    try {
      const user = sessionStorage.getItem("user");

      if (!user) {
        return rejectWithValue("User not authenticated!");
      }

      const { token } = JSON.parse(user);

      const response = await axios.get(
        `https://devlink-9xp4.onrender.com/api/projects/commits/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Commits response:", response.data);
      return response.data.commits;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch project commits"
      );
    }
  }
);
