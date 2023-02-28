import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const res = await customAxios.get("categories");
    console.log(6, res.data);
    return res.data;
  }
);
