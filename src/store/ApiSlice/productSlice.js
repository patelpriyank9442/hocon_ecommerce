import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  product: {},
  catProducts: [],
};
export const getProduct = createAsyncThunk(
  "/productSlice/getProduct ",
  async (id) => {
    try {
      const response = await axiosInstance.post(
        `masterService/itemMaster/list`,
        {
          productTypeId: [id],
          makeById: [],
        }
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getFilteredProduct = createAsyncThunk(
  "/productSlice/getFilteredProduct ",
  async (id) => {
    try {
      const response = await axiosInstance.post(
        `masterService/itemMaster/list`,
        id
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getBrandProducts = createAsyncThunk(
  "/product/getBrandProducts",
  async (body) => {
    const data = {
      productTypeId: [body.category.id],
      makeById: [body.brand.id],
    };
    try {
      const response = await axiosInstance.post(
        `masterService/itemMaster/list`,
        data
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    CatProducts: (state, action) => {
      state.catProducts = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action?.payload?.data;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBrandProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBrandProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action?.payload?.data;
      })
      .addCase(getBrandProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getFilteredProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilteredProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action?.payload?.data;
      })
      .addCase(getFilteredProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { CatProducts } = productSlice.actions;
export default productSlice.reducer;
