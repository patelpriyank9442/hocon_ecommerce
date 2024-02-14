import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  socialMedia: [],
};

export const getSocialMedia = createAsyncThunk(
  "/socialMedia/getSocialMedia",
  async (id) => {
    try {
      const response = await axiosInstance.get(`social-media`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSocialMedia.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSocialMedia.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.socialMedia = action?.payload?.payload?.data;
      })
      .addCase(getSocialMedia.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
