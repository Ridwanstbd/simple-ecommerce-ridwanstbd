import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    sortMethod: "default",
    initialSearch: "",
    initialSortmethod: "default"
}
export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setSortMethod: (state, action) => {
            state.sortMethod = action.payload
        },
        resetFilter: (state) => {
            state.search = state.initialSearch
            state.sortMethod = state.initialSortmethod
        }

    }
});

export const { setSearch, setSortMethod, resetFilter } = filterSlice.actions;
export const selectFilter = (state) => state.filter
export default filterSlice;