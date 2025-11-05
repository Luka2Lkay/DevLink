import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const sendInviteThunk = createAsyncThunk(
    "invite/sendInvite", async ({ id, email }, { rejectWithValue }) => {

        try {
            const userString = sessionStorage.getItem("user");

            if (!userString) rejectWithValue("User not authenticated!")

            const { token } = JSON.parse(userString);
            const response = await axios.post(`https://devlink-9xp4.onrender.com/api/invites/send-invite/${id}`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            if(response.data.status === 409 || response.data.status === 404){
                return response.data.message
            }

            return response.data;
        } catch (error) {
            console.log("there is an error")
            return rejectWithValue(error.response?.data || "Failed to send an invite")
        }
    }
)