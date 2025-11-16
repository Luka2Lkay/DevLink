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
  errorMessage: "",
  successMessage: "",
};

const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    setCurrentInvite(state, action) {
      state.currentInvite = action.payload ?? "";
    },
    setInvites(state, action) {
      state.invites = action.payload ?? [];
    },
    addInvite(state, action) {
      state.invites.push(action.payload) ?? null;
    },
    setErrorMessage(state, action) {
      state.errorMessage =
        typeof action.payload === "string"
          ? action.payload ?? ""
          : action.payload?.message ?? "";
    },
    setSuccessMessage(state, action) {
      state.successMessage =
        typeof action.payload === "string"
          ? action.payload ?? ""
          : action.payload?.message ?? "";
    },
    setLoading(state, action) {
      state.loading = action.payload ?? false;
    },
    removeInvite(state, action) {
      const inviteId = action.payload ?? null;

      state.invites = state.invites.filter((invite) => invite.id !== inviteId);
    },
    resetInvites() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInviteThunk.pending, (state) => {
        state.errorMessage = "";
        state.loading = true;
        state.successMessage = "";
      })
      .addCase(sendInviteThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Failed to send invite.";
        state.loading = false;
        state.successMessage = "";
      })
      .addCase(sendInviteThunk.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.loading = false;
        state.successMessage = action.payload ?? "Invite sent successfully!";
      })
      .addCase(inviteResponseThunk.pending, (state) => {
        state.errorMessage = "";
        state.loading = true;
        state.successMessage = "";
      })
      .addCase(inviteResponseThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Failed to respond to invite.";
        state.loading = false;
        state.successMessage = "";
      })
      .addCase(inviteResponseThunk.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.loading = false;
        state.successMessage =
          action.payload ?? "Invite response recorded successfully!";
      })
      .addCase(receivedInvitesThunk.pending, (state) => {
        state.errorMessage = "";
        state.loading = true;
        state.successMessage = "";
      })
      .addCase(receivedInvitesThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Failed to fetch invites.";
        state.loading = false;
        state.successMessage = "";
      })
      .addCase(receivedInvitesThunk.fulfilled, (state) => {
        state.errorMessage = "";
        state.loading = false;
        state.successMessage = "";
      });
  },
});

export const selectCurrentInvite = (state) => state.invite.currentInvite ?? "";
export const selectInvites = (state) => state.invite.invites ?? [];
export const selectErrorMessage = (state) => state.invite.errorMessage ?? "";
export const selectLoading = (state) => state.invite.loading ?? false;
export const selectSuccessMessage = (state) =>
  state.invite.successMessage ?? "";

export const {
  setCurrentInvite,
  setLoading,
  addInvite,
  setInvites,
  setErrorMessage,
  setSuccessMessage,
  removeInvite,
  resetInvites,
} = inviteSlice.actions;
export default inviteSlice.reducer;
