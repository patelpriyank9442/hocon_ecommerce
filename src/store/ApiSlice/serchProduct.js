import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  arrSearchProducts: [],
};

export const serchProduct = createAsyncThunk(
  "/arrSearchProducts/serchProduct",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `masterService/itemMaster/list`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const arrSearchProductSlice = createSlice({
  name: "arrSearchProducts",
  initialState: initialState,
  reducers: {
    clearSearch: (state, action) => {
      state.arrSearchProducts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(serchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(serchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.arrSearchProducts = action?.payload?.data?.result;
      })
      .addCase(serchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearSearch } = arrSearchProductSlice.actions;
export default arrSearchProductSlice.reducer;
