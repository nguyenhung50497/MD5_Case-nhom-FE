import { createSlice } from "@reduxjs/toolkit";
import {changePassword, editProfile, getProfile, login, register} from "../../service/userService";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user')),
    user: [],
    profile: [],
    checkPassword: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
            localStorage.setItem("accessToken", action.payload.token)
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.user.push(action.payload)
        });
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
            localStorage.setItem("accessToken", action.payload.token)
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.checkPassword = action.payload;
        })
    }
})

export default userSlice.reducer;