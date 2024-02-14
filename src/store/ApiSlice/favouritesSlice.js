import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  favourites: [],
};
export const toggleFavourite = createAsyncThunk(
  "/favourites/toggleFavourite",
  async (id) => {
    try {
      const response = await axiosInstance.post(
        `wishlist`,
        { productId: id },
        {
          headers: authHeader(),
        }
      );

      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getFavourite = createAsyncThunk(
  "/favourites/getFavourite",
  async (id) => {
    try {
      const response = await axiosInstance.get(`wishlist`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const removeFromFavourite = createAsyncThunk(
  "/favourites/removeFromFavourite",
  async (id) => {
    try {
      const response = await axiosInstance.delete(
        `masterService/favourite/delete/${id}`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    resetFav: (state, action) => {
      state.favourites = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFavourite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavourite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favourites = action?.payload?.payload?.data;
      })
      .addCase(getFavourite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetFav } = favouriteSlice.actions;
export default favouriteSlice.reducer;
