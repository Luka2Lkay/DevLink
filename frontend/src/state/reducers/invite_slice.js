import { createSlice } from "@reduxjs/toolkit";
import { sendInviteThunk } from "../thunks/invite_thunk";

const initialState = {
    currentInvite: null,
    invites: [],
    loading: false,
    error: null,
    success: null
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
        setErrorMessage(state, action) {
            state.error = action.payload
        },
        setSuccessMessage(state, action) {
            state.success = action.payload
        },
        resetInvites: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(sendInviteThunk.pending, (state) => {
            state.error = null;
            state.loading = true;
            state.success = null
        }).addCase(sendInviteThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = null
        }).addCase(sendInviteThunk.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.success = action.payload
        })
    }
})

export const selectCurrentInvite = (state) => state.invite.currentInvite;
export const selectInvites = (state) => state.invite.invites;
export const selectErrorMessage = (state) => state.invite.error;
export const selectLoading = (state) => state.invite.loading;
export const selectSuccessMessage = (state) => state.invite.success;

export const { setCurrentInvite, addInvite, setErrorMessage, setSuccessMessage, resetInvites } = inviteSlice.actions;
export default inviteSlice.reducer; 