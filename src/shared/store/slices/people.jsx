import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    isLoading: false,
    error: '',
};

const backendUrl = 'https://backend.msb-container.ru'

export const create = createAsyncThunk("/create", async ({body}, {rejectWithValue}) => {
      return fetch(`${backendUrl}/create`,{
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
export const deletePeople = createAsyncThunk("/deletePeople", async ({idUser}, {rejectWithValue}) => {   
    return fetch(`${backendUrl}/deletePeople`,{
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

export const changePeople = createAsyncThunk("/changePeople", async ({body}, {rejectWithValue}) => {
      return fetch(`${backendUrl}/changePeople`,{
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

export const getPeople = createAsyncThunk("/overwriteAuthAdmin", async ({}, {rejectWithValue}) => {
    return fetch(`${backendUrl}/overwriteAuthAdmin`)
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
          
            if (!action.payload.message) {
                state.isLoading = false;
                state.items = [...state.items, action.payload];
                localStorage.setItem("people", JSON.stringify(state.items))
            } else {
                console.log(action.payload);
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
                state.items = action.payload
                localStorage.setItem("people", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },

        [changePeople.pending.type]: (state) => {
            state.isLoading = true;
        },
        [changePeople.fulfilled.type]: (state, action) => {  
          console.log(action.payload);
            state.isLoading = false;
            state.items = action.payload;
            localStorage.setItem("people", JSON.stringify(state.items))
        },

        [deletePeople.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deletePeople.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                state.isLoading = false;
                state.items = action.payload
                localStorage.setItem("people", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
        },
    },
});