import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const sendInviteThunk = createAsyncThunk(
    "invite/sendInvite", async ({ id, email }, { rejectWithValue }) => {

        try {
            const userString = sessionStorage.getItem("user");

            if (!userString) rejectWithValue("User not authenticated!")

            const { token, email: loggedInUserEmail } = JSON.parse(userString);
            console.log('loggedin', loggedInUserEmail)
            console.log("toEmail", email)
            if (loggedInUserEmail === email) rejectWithValue("You own this project!")

            const response = await axios.post(`https://devlink-9xp4.onrender.com/api/invites/send-invite/${id}`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to send an invite")
        }
    }
)