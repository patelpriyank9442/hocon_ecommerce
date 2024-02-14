import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  couponData: [],
  couponAmount: 0,
  isApplied: false,
  discount: 0,
};
export const applyCoupons = createAsyncThunk(
  "/couponData/applyCoupons",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        `cart/${data}`,
        {},
        {
          headers: { ...authHeader() },
        }
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const couponSlice = createSlice({
  name: "couponData",
  initialState: initialState,
  reducers: {
    setFinalAmount: (state, action) => {
      console.log("sdfsdfds", action.payload);
      state.couponAmount = action.payload;
    },
    setCouponApplied(state, action) {
      state.isApplied = true;
      state.discount = action.payload;
    },
    ResetCouponData(state, action) {
      state.couponData = [];
      state.couponAmount = 0;
      state.isApplied = false;
      state.discount = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(applyCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applyCoupons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.couponData = action?.payload?.payload?.data;
      })
      .addCase(applyCoupons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFinalAmount, setCouponApplied, ResetCouponData } =
  couponSlice.actions;
export default couponSlice.reducer;
