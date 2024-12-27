import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        isLogin: false,
        user: null,
    },
    reducers: reducers,
});

export const {setVal} = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;