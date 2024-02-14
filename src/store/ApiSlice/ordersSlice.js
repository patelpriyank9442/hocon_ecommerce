import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "../../helpers/authHelper";

const initialState = {
  orders: {},
};
export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  try {
    const response = await axiosInstance.get(`order`, {
      headers: authHeader(),
    });
    // console.log("resorder", response);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const cencelOrders = createAsyncThunk(
  "orders/cencelOrders",
  async (id) => {
    try {
      const response = await axiosInstance.put(
        `order/${id}`,
        { status: "cancelled" },
        {
          headers: authHeader(),
        }
      );
      // console.log("resorder", response);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const placeOrder = createAsyncThunk(
  "orderService/orders",
  async (data) => {
    try {
      const response = await axiosInstance.post(`order/${data.id}`, data.cart, {
        headers: authHeader(),
      });
      // console.log("resorder", response);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action?.payload?.payload?.data;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetLoggedIn } = orderSlice.actions;
export default orderSlice.reducer;
