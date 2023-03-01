import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getOrderDetails = createAsyncThunk(
    "homes/getOrderDetails",
    async () => {
    const res = await customAxios.get("orderDetails",
    { headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('access-token'),
    }});
    return res.data;
});

export const rentHome = createAsyncThunk(
    "homes/rentHome",
    async (data) => {
    const res = await customAxios.post("orderDetails", data,
    { headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('access-token'),
    }});
    return res.data;
});