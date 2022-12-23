import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"

const initialState = {
    userData: null,
    isLoading: false,
    error: '',
};

export const login = createAsyncThunk("auth/login", async ({body}, {rejectWithValue}) => {
      return fetch(`${baseUrl}/login`,{
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state){
            state.error = ''
        },
        setUser(state, {payload}){
            state.userData = JSON.parse(payload) 
        }
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled.type]: (state, action) => {
            if (!action.payload.message) {
                state.isLoading = false;
                state.userData = action.payload.doc;
                localStorage.setItem("user", JSON.stringify(state.userData))
            } else {
                state.isLoading = false;
                state.error = action.payload.message;
            }
        },
    },
});