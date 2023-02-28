import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../service/categoryService";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      console.log(action.payload);
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
