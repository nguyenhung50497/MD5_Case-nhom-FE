import { createSlice } from "@reduxjs/toolkit";
import { cancelOrderDetail, checkOut, editOrderDetail, getOrderDetails, getOrderDetailsByHome, getOrderDetailsById, getOrderDetailsByIdUser, rentHome } from "../../service/orderDetailService";

const initialState = {
  orderDetails: [],
  orderDetail: [],
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
    builder.addCase(editOrderDetail.fulfilled, (state, action) => {
      state.orderDetails = action.payload[1];
      state.loading = false;
    });
    builder.addCase(getOrderDetailsByIdUser.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderDetailsById.fulfilled, (state, action) => {
      state.orderDetail = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderDetailsByHome.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(cancelOrderDetail.fulfilled, (state, action) => {
      state.orderDetails = action.payload[1];
      state.loading = false;
    });
    builder.addCase(checkOut.fulfilled, (state, action) => {
      state.orderDetails = action.payload[1];
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
