import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const sendInviteThunk = createAsyncThunk(
    "invite/sendInvite", async (projectData, { rejectWithValue }) => {

        try {
            const user = sessionStorage.getItem("user");
            const response = await axios.post(`https://devlink-9xp4.onrender.com/api/invites/send-invite/${projectData.id}`, projectData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`
                }
            })

            return response.data;

        } catch (error) {
            return rejectWithValue("Failed to send an invite", error.response.data)
        }
    }
)