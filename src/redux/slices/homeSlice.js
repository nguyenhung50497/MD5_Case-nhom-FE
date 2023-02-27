import { createSlice } from "@reduxjs/toolkit";
import { addHome, getHomes } from "../../service/homeService";

const initialState = {
  homes: [],
  home: {},
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
  },
});

export default homeSlice.reducer;
