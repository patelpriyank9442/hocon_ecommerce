import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  singleOrder: {},
};

export const singleOrderSlice = createSlice({
  name: "singleOrder",
  initialState: initialState,
  reducers: {
    SingleOrder: (state, action) => {
      state.singleOrder = action.payload;
    },
  },
});

export const { SingleOrder } = singleOrderSlice.actions;
export default singleOrderSlice.reducer;
