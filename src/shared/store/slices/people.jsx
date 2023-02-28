import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"

const initialState = {
    items: [],
    isLoading: false,
    error: '',
};

export const create = createAsyncThunk("auth/create", async ({body}, {rejectWithValue}) => {
      return fetch(`${baseUrl}/create`,{
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...body})
        },
      )
      .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
    },
);

export const getPeople = createAsyncThunk("/overwriteAuthAdmin", async ({}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/overwriteAuthAdmin`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        clearError(state){
            state.error = ''
            state.isLoading = false
        },
        setUser(state, {payload}){
            state.items = JSON.parse(payload) 
        },
        exit(state){
            state.items = null
            localStorage.removeItem("user")
        }
    },
    extraReducers: {
        [create.pending.type]: (state) => {
            state.isLoading = true;
        },
        [create.fulfilled.type]: (state, action) => {
            console.log(action.payload);
            if (!action.payload.message) {
                state.isLoading = false;
                state.items = action.payload.doc;
                localStorage.setItem("people", JSON.stringify(state.items))
            } else {
                state.isLoading = false;
                state.error = action.payload.message;
            }
        },
        [getPeople.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getPeople.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                let newItems = []
                for (let i = 0; i < action.payload.length; i++) {
                    newItems.push(action.payload[`${i}`])
                }
                state.items = newItems
                localStorage.setItem("people", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },
    },
});