import { createSlice } from "@reduxjs/toolkit";
import { fetchProjectCommitsThunk } from "../thunks/commit_thunk";

const initialState = {
  commits: [],
  loading: false,
  error: null,
};

const commitSlice = createSlice({
  name: "commits",
  initialState,
  reducers: {
    setCommits: (state, action) => {
      state.commits = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectCommitsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectCommitsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.commits = action.payload;
      })
      .addCase(fetchProjectCommitsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCommits = (state) => state.commits.commits;
export const selectLoading = (state) => state.commits.loading;
export const selectError = (state) => state.commits.error;

export const { setCommits, setLoading, setError } = commitSlice.actions;
