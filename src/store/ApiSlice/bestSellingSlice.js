import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  bestSelling: [],
};
export const getBestSelling = createAsyncThunk(
  "/bestSelling/getBestSelling ",
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

export const bestSellingSlice = createSlice({
  name: "bestSelling",
  initialState: initialState,
  reducers: {
    BestSelling: (state, action) => {
      state.bestSelling = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBestSelling.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBestSelling.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bestSelling = action?.payload?.payload?.data;
      })
      .addCase(getBestSelling.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { bestSelling } = bestSellingSlice.actions;
export default bestSellingSlice.reducer;
