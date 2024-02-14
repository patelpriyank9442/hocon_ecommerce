import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  newLaunch: [],
};
export const getNewLaunch = createAsyncThunk(
  "/newLaunch/getNewLaunch ",
  async (id) => {
    try {
      const response = await axiosInstance.get(`product?sortBy=orderCount`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const newLaunchSlice = createSlice({
  name: "newLaunch",
  initialState: initialState,
  reducers: {
    NewLaunch: (state, action) => {
      state.newLaunch = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNewLaunch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewLaunch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newLaunch = action?.payload?.payload?.data;
      })
      .addCase(getNewLaunch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { newLaunch } = newLaunchSlice.actions;
export default newLaunchSlice.reducer;
