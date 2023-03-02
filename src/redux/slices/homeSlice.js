import { createSlice } from "@reduxjs/toolkit";
import {
  addHome,
  deleteHome,
  editHome,
  getHomeById,
  getHomes,
  searchHome,
} from "../../service/homeService";

const initialState = {
  homes: [],
  home: [],
  searchHome: [],
  address: "",
  orderDetails: [],
  loading: true,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomes.fulfilled, (state, action) => {
      state.homes = action.payload;
      state.loading = false;
      state.home = {};
    });
    builder.addCase(addHome.fulfilled, (state, action) => {
      state.homes.homes.push(action.payload);
    });
    builder.addCase(editHome.fulfilled, (state, action) => {
      state.homes.homes.splice(action.payload.idHome, 1, action.payload);
      state.home = {};
    });
    builder.addCase(getHomeById.fulfilled, (state, action) => {
      state.home = action.payload;
      state.loading = true;
    });
    builder.addCase(deleteHome.fulfilled, (state, action) => {
      state.homes.homes.splice(action.payload, 1);
    });
    builder.addCase(searchHome.fulfilled, (state, action) => {
      state.address = action.payload.address;
      state.searchHome = action.payload;
    });
  },
});

export default homeSlice.reducer;
