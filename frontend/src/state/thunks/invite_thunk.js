import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const sendInviteThunk = createAsyncThunk(
    "invite/sendInvite", async ({ id, email }, { rejectWithValue }) => {

        try {
            const user = sessionStorage.getItem("user");

            if (!user) rejectWithValue("User not authenticated!")

            const { token } = JSON.parse(user);
            const response = await axios.post(`https://devlink-9xp4.onrender.com/api/invites/send-invite/${id}`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 409 || response.status === 400 || response.status === 401 || response.status === 404) {
                return response.data.message;
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to send an invite")
        }
    }
)