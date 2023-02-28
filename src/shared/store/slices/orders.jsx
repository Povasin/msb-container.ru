import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"
const initialState = {
    items: [],
    isLoading: false,
    error: '',
};
export const getorders = createAsyncThunk("/getOrders", async ({}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getOrders`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const changeOrderCard = createAsyncThunk("/changeOrderCard", async ({email, body}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/changeOrderCard`,{
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, body})
      },
    )
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const OrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        [getorders.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getorders.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                let newItems = []
                for (let i = 0; i < action.payload.length; i++) {
                    newItems.push(action.payload[`${i}`])
                }
                state.items = newItems
                localStorage.setItem("orders", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },
        [changeOrderCard.pending.type]: (state) => {
            state.isLoading = true;
        },
        [changeOrderCard.fulfilled.type]: (state, action) => {
          
            state.isLoading = false;
            state.items = [action.payload.doc];
            localStorage.setItem("orders", JSON.stringify(state.items))
        },
    }
});

