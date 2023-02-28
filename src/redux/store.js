import userReducer from "./slices/userSlice";
import homeReducer from "./slices/homeSlice";
import categoryReducer from "./slices/categorySlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    homes: homeReducer,
    categories: categoryReducer,
  },
});

export default store;
