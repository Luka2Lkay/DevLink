import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentInvite: "",
    invites: [],
    loading: "",
    error: ""
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
    }
})

export const selectCurrentInvite = (state) => state.invite.currentInvite;
export const selectInvites = (state) => state.invite.invites;
export const selectError = (state) => state.invite.error;

export const { setCurrentInvite, addInvite, setError } = inviteSlice.actions;
export default inviteSlice.reducer; 