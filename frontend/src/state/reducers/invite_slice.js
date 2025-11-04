import { createSlice } from "@reduxjs/toolkit";
import { sendInviteThunk } from "../thunks/invite_thunk";

const initialState = {
    currentInvite: null,
    invites: [],
    loading: false,
    error: null
}

const inviteSlice = createSlice({
    name: "invite",
    initialState,
    reducers: {
        setCurrentInvite(state, action) {
            state.currentInvite = action.payload;
        },
        addInvite(state, action) {
            state.invites.push(action.payload);
        },
        setError(state, action) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendInviteThunk.pending, (state) => {
            state.error = null;
            state.loading = true;
        }).addCase(sendInviteThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(sendInviteThunk.fulfilled, (state) => {
            state.error = null;
            state.loading = false;
        })
    }
})

export const selectCurrentInvite = (state) => state.invite.currentInvite;
export const selectInvites = (state) => state.invite.invites;
export const selectError = (state) => state.invite.error;

export const { setCurrentInvite, addInvite, setError } = inviteSlice.actions;
export default inviteSlice.reducer; 