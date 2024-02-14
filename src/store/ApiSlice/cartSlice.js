import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  cart: [],
};
export const getCartProducts = createAsyncThunk(
  "getCartProducts/cart ",
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
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    ResetCart: (state, action) => {
      state.cart = [];
    },
    cartItems: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { cartItems, removecartItems, ResetCart } = cartSlice.actions;
export default cartSlice.reducer;
