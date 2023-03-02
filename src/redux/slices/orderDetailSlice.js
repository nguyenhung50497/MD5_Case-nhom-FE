import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails, getOrderDetailsByIdUser, rentHome } from "../../service/orderDetailService";

const initialState = {
  orderDetails: [],
  loading: true
};

const orderDetailSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(rentHome.fulfilled, (state, action) => {
      state.orderDetails.push(action.payload);
    });
    builder.addCase(getOrderDetailsByIdUser.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.loading = false;
    });
    // builder.addCase(editHome.fulfilled, (state, action) => {
    //   state.homes.homes.splice(action.payload.idHome, 1, action.payload);
    //   state.home = {};
    // });
    // builder.addCase(getHomeById.fulfilled, (state, action) => {
    //   state.home = action.payload;
    //   state.loading = true;
    // });
    // builder.addCase(deleteHome.fulfilled, (state, action) => {
    //   state.homes.homes.splice(action.payload, 1);
    // });
    // builder.addCase(searchHome.fulfilled, (state, action) => {
    //   state.searchHome = action.payload;
    // });
  },
});

export default orderDetailSlice.reducer;
