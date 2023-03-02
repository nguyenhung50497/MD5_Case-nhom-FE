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

export const editOrderDetail = createAsyncThunk(
  "homes/editOrderDetail",
  async (data) => {
  const res1 = await customAxios.put("orderDetails/edit/" + data[1], data[0],
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  const res2 = await customAxios.get("orderDetails/my-order-detail/" + data[2],
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return [res1.data, res2.data];
});

export const getOrderDetailsByIdUser = createAsyncThunk(
  "homes/getOrderDetailsByIdUser",
  async (data) => {
  const res = await customAxios.get("orderDetails/my-order-detail/" + data,
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return res.data;
});

export const cancelOrderDetail = createAsyncThunk(
  "homes/cancelOrderDetail",
  async (data) => {
    const res1 = await customAxios.put("orderDetails/cancel/" + data[0],
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  const res2 = await customAxios.get("orderDetails/my-order-detail/" + data[1],
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return [res1.data, res2.data];
});

export const getOrderDetailsById = createAsyncThunk(
  "homes/getOrderDetailsById",
  async (data) => {
  const res = await customAxios.get("orderDetails/order-detail/" + data,
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return res.data;
});

export const getOrderDetailsByHome = createAsyncThunk(
  "homes/getOrderDetailsByHome",
  async (data) => {
  const res = await customAxios.get("orderDetails/order-by-home/" + data,
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return res.data;
});

export const checkOut = createAsyncThunk(
  "homes/checkOut",
  async (data) => {
    console.log(data);
  const res1 = await customAxios.put("orderDetails/check-out/" + data[0], data[1],
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  const res2 = await customAxios.get("orderDetails/my-order-detail/" + data,
  { headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return [res1.data, res2.data];
});