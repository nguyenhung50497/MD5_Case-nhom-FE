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
  home: {},
  searchHome: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomes.fulfilled, (state, action) => {
      state.homes = action.payload;
    });
    builder.addCase(addHome.fulfilled, (state, action) => {
      state.homes.homes.push(action.payload);
    });
    builder.addCase(editHome.fulfilled, (state, action) => {
      state.homes.homes.splice(action.payload.idHome, 1, action.payload);
    });
    builder.addCase(getHomeById.fulfilled, (state, action) => {
      state.home = action.payload;
    });
    builder.addCase(deleteHome.fulfilled, (state, action) => {
      state.homes.homes.splice(action.payload, 1);
    });
    builder.addCase(searchHome.fulfilled, (state, action) => {
      state.searchHome = action.payload;
    });
  },
});

export default homeSlice.reducer;
