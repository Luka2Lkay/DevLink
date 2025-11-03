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
        }
    }
})

export const selectCurrentInvite = (state) => state.invite.currentInvite;
export const selectInvites = (state) => state.invite.invites;

export const { setCurrentInvite, addInvite } = inviteSlice.actions;
export default inviteSlice.reducer; 