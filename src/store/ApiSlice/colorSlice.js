import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  colors: [],
};

export const getColors = createAsyncThunk(
  "/colors/getColors",
  async (id) => {
    try {
      const response = await axiosInstance.get(`color`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const colorSlice = createSlice({
  name: "colors",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.colors = action?.payload?.payload?.data;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = colorSlice.actions;
export default colorSlice.reducer;
