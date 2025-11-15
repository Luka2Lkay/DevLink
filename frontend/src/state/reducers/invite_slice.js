import { createSlice } from "@reduxjs/toolkit";
import {
  sendInviteThunk,
  inviteResponseThunk,
  receivedInvitesThunk,
} from "../thunks/invite_thunk";

const initialState = {
  currentInvite: null,
  invites: [],
  loading: false,
  error: null,
  success: null,
};

const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    setCurrentInvite(state, action) {
      state.currentInvite = action.payload;
    },
    setInvites(state, action) {
      state.invites = action.payload;
    },
    addInvite(state, action) {
      state.invites.push(action.payload);
    },
    setErrorMessage(state, action) {
      state.error = action.payload;
    },
    setSuccessMessage(state, action) {
      state.success = action.payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    removeInvite(state, action) {
      const inviteId = action.payload ?? null;

      state.invites = state.invites.filter((invite) => invite.id !== inviteId);
    },
    resetInvites: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInviteThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = null;
      })
      .addCase(sendInviteThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = null;
      })
      .addCase(sendInviteThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(inviteResponseThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = null;
      })
      .addCase(inviteResponseThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = null;
      })
      .addCase(inviteResponseThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(receivedInvitesThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = null;
      })
      .addCase(receivedInvitesThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = null;
      })
      .addCase(receivedInvitesThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = action.payload;
      });
  },
});

export const selectCurrentInvite = (state) => state.invite.currentInvite;
export const selectInvites = (state) => state.invite.invites;
export const selectErrorMessage = (state) => state.invite.error;
export const selectLoading = (state) => state.invite.loading;
export const selectSuccessMessage = (state) => state.invite.success;

console.log(selectSuccessMessage);

export const {
  setCurrentInvite,
  addInvite,
  setInvites,
  setErrorMessage,
  setSuccessMessage,
  removeInvite,
  resetInvites,
} = inviteSlice.actions;
export default inviteSlice.reducer;
