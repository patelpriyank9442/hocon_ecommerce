import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  singleProduct: {},
  searchProducts: [],
};
export const searchProduct = createAsyncThunk(
  "singleProduct/singleProduct ",
  async (searchText) => {
    try {
      const response = await axiosInstance.get(`product?search=${searchText}`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: initialState,
  reducers: {
    Product: (state, action) => {
      state.singleProduct = action.payload;
    },
    ResetSearch: (state, action) => {
      state.searchProducts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchProducts = action?.payload?.payload?.data;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { Product, ResetSearch } = singleProductSlice.actions;
export default singleProductSlice.reducer;
