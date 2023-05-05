import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    isLoading: false,
    error: '',
};

export const create = createAsyncThunk("/create", async ({body}, {rejectWithValue}) => {
      return fetch(`/create`,{
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
    return fetch(`/overwriteAuthAdmin`)
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
                state.items = action.payload;
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
    },
});