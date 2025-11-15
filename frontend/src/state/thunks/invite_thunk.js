import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInvites } from "../reducers/invite_slice";
import axios from "axios";

export const sendInviteThunk = createAsyncThunk(
  "invite/sendInvite",
  async ({ id, email }, { getState, dispatch, rejectWithValue }) => {
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

      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send an invite"
      );
    }
  }
);

export const recievedInvites = createAsyncThunk(
  "invite/receivedInvites",
  async (_, { getState, dispatch, rejectWithValue }) => {
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

      const invites = response.data["received invites"];

      await dispatch(setInvites(invites));

      return getState();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to receive invite"
      );
    }
  }
);

export const acceptInviteThunk = createAsyncThunk(
  "invite/acceptInvite",
  async ({ inviteId, status }, { dispatch, rejectWithValue }) => {
    try {
      const userString = sessionStorage.getItem("user");
      if (!userString) {
        return rejectWithValue("User not authenticated!");
      }
      const { token } = JSON.parse(userString);

      const response = await axios.post(
        `https://devlink-9xp4.onrender.com/api/invites/invite-response/${inviteId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Accept Invite Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept invite"
      );
    }
  }
);
