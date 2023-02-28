import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"
const initialState = {
    items: [],
    isLoading: false,
    error: '',
};
export const getOrdersCards = createAsyncThunk("/getOrdersCards", async ({}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getOrdersCards`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const OrdersCardSlice = createSlice({
    name: 'ordersCard',
    initialState,
    reducers: {},
    extraReducers: {
        [getOrdersCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getOrdersCards.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                state.items = action.payload
                localStorage.setItem("ordersCard", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },
    }
});

