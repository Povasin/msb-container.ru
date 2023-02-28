import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"
const initialState = {
    items: [],
    isLoading: false,
    error: '',
};
export const getCards = createAsyncThunk("/getCards", async ({}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getCards`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const getDeleteCards = createAsyncThunk("/getDeleteCards", async ({}, {rejectWithValue}) => {
  return fetch(`${baseUrl}/getDeleteCards`)
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
},
);

export const addCards = createAsyncThunk("/addCards", async ({body, img}, {rejectWithValue}) => {
  return fetch(`${baseUrl}/addCards`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({card: body, img: img})
  })
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
});

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: {
        [getCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getCards.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.items = [...state.items, action.payload];
            localStorage.setItem("cards", JSON.stringify(state.items))
        },
        // [getDeleteCards.pending.type]: (state) => {
        //   state.isLoading = true;
        // },
        // [getDeleteCards.fulfilled.type]: (state, action) => {
        //     state.isLoading = false;
        //     state.items = action.payload.doc;
        //     localStorage.setItem("cards", JSON.stringify(state.items))
        // },
        [addCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addCards.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.items = [...state.items, action.payload];
            localStorage.setItem("cards", JSON.stringify(state.items))
        },
    }
});

