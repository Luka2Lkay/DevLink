import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

      console.log("Commits response:", response.data.commits);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch project commits"
      );
    }
  }
);