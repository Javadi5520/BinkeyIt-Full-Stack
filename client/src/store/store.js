import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import cartReducer from "./cartProduct";
import orderReducer from "./orderSlice";
import productReducer from "./productSlice";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: orderReducer,
    cartItem: cartReducer,
    product: productReducer,
    addresses: addressReducer,
  },
});
