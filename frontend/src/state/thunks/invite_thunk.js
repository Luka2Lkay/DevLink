import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const sendInviteThunk = createAsyncThunk(
    "invite/sendInvite", async (id, email, { rejectWithValue }) => {

        try {
            console.log(id)
            const user = sessionStorage.getItem("user");
            const response = await axios.post(`https://devlink-9xp4.onrender.com/api/invites/send-invite/${id}`, email, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`
                }
            })

            console.log(response.data);
            return response.data;

        } catch (error) {
            return rejectWithValue("Failed to send an invite", error.response.data)
        }
    }
)