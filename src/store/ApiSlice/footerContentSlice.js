import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  footerContent: {
    termsconditions: [],
    aboutus: [],
    privacypolicy: [],
    help: [],
  },
};

export const getTermsConditions = createAsyncThunk(
  "/footerContent/getTermsConditions",
  async (id) => {
    try {
      const response = await axiosInstance.get(
        `quicklinks?title=termscondition`,
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

export const getAboutUs = createAsyncThunk(
  "/footerContent/getAboutUs",
  async (id) => {
    try {
      const response = await axiosInstance.get(`quicklinks?title=aboutus`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const getPrivacyPolicy = createAsyncThunk(
  "/footerContent/getPrivacyPolicy",
  async (id) => {
    try {
      const response = await axiosInstance.get(
        `quicklinks?title=privacypolicy`,
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

export const getHelp = createAsyncThunk(
  "/footerContent/getHelp", 
  async (id) => {
    try {
      const response = await axiosInstance.get(
        `quicklinks?title=help`, {
        headers: { ...authHeader() },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);


export const footerContentSlice = createSlice({
  name: "footerContent",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTermsConditions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTermsConditions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.footerContent.termsconditions = action?.payload?.payload?.data;
      })
      .addCase(getTermsConditions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAboutUs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.footerContent.aboutus = action?.payload?.payload?.data;
      })
      .addCase(getAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPrivacyPolicy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPrivacyPolicy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.footerContent.privacypolicy = action?.payload?.payload?.data;
      })
      .addCase(getPrivacyPolicy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getHelp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHelp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.footerContent.help = action?.payload?.payload?.data;
      })
      .addCase(getHelp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const {} = footerContentSlice.actions;
export default footerContentSlice.reducer;
