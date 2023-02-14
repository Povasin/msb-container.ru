import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {cardsUrl} from "../api/base.js"
const initialState = {
    items: [],
    isLoading: false,
    error: '',
};
export const getCards = createAsyncThunk("/getCards", async ({}, {rejectWithValue}) => {
    return fetch(`${cardsUrl}/getCards`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: {
        [getCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getCards.fulfilled.type]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.items = action.payload.doc;
            localStorage.setItem("cards", JSON.stringify(state.items))
        },
    }
});

