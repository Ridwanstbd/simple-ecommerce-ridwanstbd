import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    originalItem: [],
    isLoading: false,
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
            state.originalItem = action.payload;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
})
export const { setProducts, setLoading } = productSlice.actions;
export const selectProducts = (state) => state.products;
export default productSlice;
