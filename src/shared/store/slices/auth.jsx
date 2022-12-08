import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';
import {baseUrl} from "../api/base.js"

const initialState = {
    userData: [],
    isLoading: false,
    error: '',
};

export const login = createAsyncThunk(
    "auth/login",
    async ({body}) => {
      const data = await fetch(
        `${baseUrl}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        },
      );
      return JSON.parse(data);
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.userData = action.payload;
            console.log(action);
            console.log(action.payload);
        },
        [login.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(action);
            // console.log(action.payload);
        }, 
    },
});