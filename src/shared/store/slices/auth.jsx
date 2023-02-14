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
export const register = createAsyncThunk("auth/register", async ({body}, {rejectWithValue}) => {
      return fetch(`${baseUrl}/register`,{
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
export const getOrder = createAsyncThunk("auth/overwriteMass", async ({email}, {rejectWithValue}) => {
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


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state){
            state.error = ''
            state.isLoading = false
        },
        setUser(state, {payload}){
            state.userData = JSON.parse(payload) 
        },
        exit(state){
            state.userData = null
            localStorage.removeItem("user")
        }
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled.type]: (state, action) => {
            if (!action.payload.message) {
                state.isLoading = false;
                state.userData = action.payload;
                localStorage.setItem("user", JSON.stringify(state.userData))
            } else {
                state.isLoading = false;
                state.error = action.payload.message;
            }
        },
        [register.pending.type]: (state) => {
            state.isLoading = true;
        },
        [register.fulfilled.type]: (state, action) => {
            if (!action.payload.message) {
                state.isLoading = false;
                state.userData = action.payload;
                localStorage.setItem("user", JSON.stringify(state.userData))
            } else {
                state.isLoading = false;
                state.error = action.payload.message;
            }
        },
        [getOrder.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getOrder.fulfilled.type]: (state, action) => {
            if (!action.payload.message) {
                state.isLoading = false;
                state.userData ={...state.userData, orderMass: action.payload.orderMass} 
                localStorage.setItem("user", JSON.stringify(state.userData))
            } else {
                state.isLoading = false;
                state.error = action.payload.message;
            }
        },
    },
});