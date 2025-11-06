import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendInviteThunk = createAsyncThunk(
  "invite/sendInvite",
  async ({ id, email }, { rejectWithValue }) => {
    try {
      const userString = sessionStorage.getItem("user");

      if (!userString) {
        return rejectWithValue("User not authenticated!");
      }

      const { token, email: loggedInUserEmail } = JSON.parse(userString);

      if (loggedInUserEmail === email) {
        return rejectWithValue("You own this project!");
      }

      const response = await axios.post(
        `https://devlink-9xp4.onrender.com/api/invites/send-invite/${id}`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response.data.newInvite)
      return response.data.newInvite;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send an invite"
      );
    }
  }
);

export const recieveInvite = createAsyncThunk(
  "invite/receiveInvite",
  async (_, { rejectWithValue }) => {
    try {
      const userString = sessionStorage.getItem("user");

      if (!userString) {
        return rejectWithValue("User not authenticated!");
      }

      const { token } = JSON.parse(userString);

      const response = await axios.get(
        "https://devlink-9xp4.onrender.com/api/invites/received-invites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to receive invite"
      );
    }
  }
);
