import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/product-slice";
import shopProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shopProduct: shopProductSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
