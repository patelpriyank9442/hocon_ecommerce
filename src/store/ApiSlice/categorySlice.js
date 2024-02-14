import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  category: [],
  catProds: [],
  singleCategory: {},
};

export const getCategory = createAsyncThunk(
  "category/getCategory ",
  async () => {
    try {
      const response = await axiosInstance.get(`category?isProductsData=true`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    CatProducts: (state, action) => {
      state.catProds = action.payload;
    },
    SingleCategory: (state, action) => {
      state.singleCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action?.payload?.payload.data;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { CatProducts, SingleCategory } = categorySlice.actions;
export default categorySlice.reducer;
