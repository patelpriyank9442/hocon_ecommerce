import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  dashboardContent: {
    offers: [],
    banner: [],
    newcollection: [],
  },
};

export const getOffers = createAsyncThunk(
  "/dashboardContent/getOffers",
  async (id) => {
    try {
      const response = await axiosInstance.get(`banner?type=offer`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getBanner = createAsyncThunk(
  "/dashboardContent/getBanner",
  async (id) => {
    try {
      const response = await axiosInstance.get(`banner?type=banner`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const getNewCollection = createAsyncThunk(
  "/dashboardContent/getNewCollection",
  async (id) => {
    try {
      const response = await axiosInstance.get(`banner?type=newcollection`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const dashboardContentSlice = createSlice({
  name: "dashboardContent",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOffers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashboardContent.offers = action?.payload?.payload?.data;
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashboardContent.banner = action?.payload?.payload?.data;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getNewCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashboardContent.newcollection = action?.payload?.payload?.data;
      })
      .addCase(getNewCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = dashboardContentSlice.actions;
export default dashboardContentSlice.reducer;
