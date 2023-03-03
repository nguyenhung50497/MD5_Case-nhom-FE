import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getHomes = createAsyncThunk("homes/getHomes", async (page) => {
  const res = await customAxios.get("homes?page=" + page);
  return res.data;
});

export const getHomeById = createAsyncThunk("homes/getHome", async (data) => {
  const res = await customAxios.get("homes/find-by-id/" + data,
   { headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('access-token'),
    }});
  return res.data;
});

export const getMyHome = createAsyncThunk("homes/getMyHome", async () => {
  const res = await customAxios.get("homes/my-homes/" ,
   { headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('access-token'),
    }});
  return res.data;
});

export const addHome = createAsyncThunk("homes/addHome", async (data) => {
  const res = await customAxios.post("homes", data,
  { headers: {
     'Content-Type': 'application/json',
     authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return res.data;
});

export const deleteHome = createAsyncThunk("homes/deleteHome", async (data) => {
  const res = await customAxios.delete("homes/" + data,
  { headers: {
     'Content-Type': 'application/json',
     authorization: 'Bearer ' + localStorage.getItem('access-token'),
  }});
  return res.data;
});

export const searchHome = createAsyncThunk(
    "homes/searchHome",
    async (data) => {
      const res = await customAxios.get('/homes/find-by-address?address=' + data[1] + '&page=' + data[0],
      { headers: {
         'Content-Type': 'application/json',
         authorization: 'Bearer ' + localStorage.getItem('access-token'),
     }})
    return res.data;
})

export const getHomeForRent = createAsyncThunk(
  "homes/getHomeForRent",
  async (page) => {
    const res = await customAxios.get('/homes/for-rent?page='+page,
    { headers: {
       'Content-Type': 'application/json',
       authorization: 'Bearer ' + localStorage.getItem('access-token'),
   }})
  return res.data;
})

export const getHomeRented = createAsyncThunk(
  "homes/getHomeRented",
  async (page) => {
    const res = await customAxios.get('/homes/rented?page='+page,
    { headers: {
       'Content-Type': 'application/json',
       authorization: 'Bearer ' + localStorage.getItem('access-token'),
   }})
  return res.data;
})

export const editHome = createAsyncThunk(
    "homes/editHome",
    async (data) => {
  const res = await customAxios.put("homes/" + data[1], data[0],
    { headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('access-token'),
    }});
    return res.data;
});
