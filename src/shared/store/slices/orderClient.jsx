import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"
const initialState = {
    items: [],
    orderCards: [],
    auth: {},
    isLoading: false,
    error: '',
};
export const getorder = createAsyncThunk("/overwriteMass", async ({idUser}, {rejectWithValue}) => {   
    return fetch(`${baseUrl}/overwriteMass`,{
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({idUser})
          },
    )
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const getOrdersCards = createAsyncThunk("/getOrdersCards", async ({idUser, number}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getOrdersCards`,{
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idUser, number})
      },)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);
export const getOrdersAuth = createAsyncThunk("/getOrdersAuth", async ({idUser}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getOrdersAuth`,{
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idUser})
      },)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);


export const getordersAdmin = createAsyncThunk("/getOrdersAdmin", async ({}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getOrdersAdmin`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const changeOrderCard = createAsyncThunk("/changeOrderCard", async ({body}, {rejectWithValue}) => {
  console.log(body);
    return fetch(`${baseUrl}/changeOrderCard`,{
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({body})
      },
    )
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const orderSliceClient = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [getOrdersCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getOrdersCards.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                state.orderCards = action.payload
                localStorage.setItem("orderCard", JSON.stringify(state.orderCards))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },
        [getorder.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getordersAdmin.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getordersAdmin.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                state.items = action.payload
                localStorage.setItem("order", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },
        [getOrdersAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getOrdersAuth.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                state.auth = action.payload
                localStorage.setItem("orderAuth", JSON.stringify(state.auth))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },
        [getorder.fulfilled.type]: (state, action) => {
            if (!action.payload.message && !action.payload.err) {
                state.isLoading = false;
                state.items = action.payload;
                localStorage.setItem("order", JSON.stringify(state.items))
            } else {
                state.isLoading = false;
                state.error = action.payload.message || action.payload.err;
            }
        },
        [changeOrderCard.pending.type]: (state) => {
            state.isLoading = true;
        },
        [changeOrderCard.fulfilled.type]: (state, action) => {  
          console.log(action.payload);
            state.isLoading = false;
            state.items = action.payload;
            localStorage.setItem("order", JSON.stringify(state.items))
        },
    }
});

