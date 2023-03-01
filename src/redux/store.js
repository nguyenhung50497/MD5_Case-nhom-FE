import userReducer from "./slices/userSlice";
import homeReducer from "./slices/homeSlice";
import categoryReducer from "./slices/categorySlice";
import orderDetailReducer from "./slices/orderDetailSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    homes: homeReducer,
    categories: categoryReducer,
    orders: orderDetailReducer,
  },
});

export default store;
