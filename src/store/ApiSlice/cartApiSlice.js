import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  apiCart: { products: [] },
};
export const addProductToCartApi = createAsyncThunk(
  "/apiCart/addProductToCartApi",
  async (body) => {
    try {
      const response = await axiosInstance.post(`cart`, body, {
        headers: authHeader(),
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getCartApiProduct = createAsyncThunk(
  "/apiCart/getCartApiProduct",
  async (id) => {
    try {
      const response = await axiosInstance.get(`cart`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "/apiCart/deleteCartProduct",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`cart/${id}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const cartApiSlice = createSlice({
  name: "apiCart",
  initialState: initialState,
  reducers: {
    resetCart: (state, action) => {
      state.apiCart = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCartApiProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartApiProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apiCart = action?.payload.payload.data;
      })
      .addCase(getCartApiProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetCart } = cartApiSlice.actions;

export default cartApiSlice.reducer;
