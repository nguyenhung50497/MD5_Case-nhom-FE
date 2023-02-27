import userReducer from "./slices/userSlice";
import homeReducer from "./slices/homeSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    homes: homeReducer,
  },
});

export default store;
