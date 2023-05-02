import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPage: 0,
    current: 1
};

export const PaginationSlice = createSlice({
    name: "PaginationSlice",
    initialState,
    reducers: {
        clearState(state, action) {
            state.totalPage = 0;
            state.current = 1;
        },
        setPagination(state, action) {
            state.totalPage = action.payload.totalPage;
            state.current = action.payload.current;
        }
    }
});

export const { clearState, setPagination } = PaginationSlice.actions;
export default PaginationSlice.reducer;
