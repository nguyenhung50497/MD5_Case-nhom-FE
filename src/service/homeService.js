import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api"

export const getHomes = createAsyncThunk(
    'homes/getHomes',
    async (page)=> {
        const res = await customAxios.get('homes?page=' + page);
        return res.data;
    }
)

export const getHomeById = createAsyncThunk(
    'homes/getHome',
    async (data)=> {
        const res = await customAxios.get('homes/find-by-id/'+data);
        return res.data;
    }
)

export const addHome = createAsyncThunk(
    'homes/addHome',
    async (data)=> {
        const res = await customAxios.post('homes', data);
        return res.data;
    }
)

export const deleteHome = createAsyncThunk(
    'homes/deleteHome',
    async (data)=> {
        const res = await customAxios.delete('homes/'+data[0]);
        return res.data;
    }
)

export const editAlbum = createAsyncThunk(
    'albums/editAlbum',
    async (data)=> {
        const res = await customAxios.put('albums/'+data[0], data[1]);
        return res.data;
    }
)