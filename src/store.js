import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import productSlice from "./features/productlist/productSlice";
import filterSlice from "./features/filter/filterSlice";

export default configureStore({
    reducer: {
        cart: cartSlice.reducer,
        products: productSlice.reducer,
        filter: filterSlice.reducer
    }
});
