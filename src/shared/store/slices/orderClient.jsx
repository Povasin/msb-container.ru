import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"
const initialState = {
    items: [],
    isLoading: false,
    error: '',
};
export const getorder = createAsyncThunk("/overwriteMass", async ({email}, {rejectWithValue}) => {   
    return fetch(`${baseUrl}/overwriteMass`,{
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email})
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
        [getorder.pending.type]: (state) => {
            state.isLoading = true;
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
    }
});

