import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"

const initialState = {
    userData: [],
    isLoading: false,
    error: '',
};

export const login = createAsyncThunk("auth/login", async ({body}, {rejectWithValue}) => {
      try{
        const data = await fetch(`${baseUrl}/login`,{
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...body})
        },
      )
      return JSON.parse(data);
      } catch(e){
        rejectWithValue(e)
      }
     
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
            state.error = JSON.parse(action.payload);
            console.log(action);
        }, 
    },
});