import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "../api/base.js"
const initialState = {
    items: [],
    img: [],
    isLoading: false,
    error: '',
};
export const getCards = createAsyncThunk("/getCards", async ({}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getCards`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);
export const deleteCard = createAsyncThunk("/deleteCard", async ({idCard}, {rejectWithValue}) => {   
    return fetch(`${baseUrl}/deleteCard`,{
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({idCard})
          },
    )
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);


export const getCardsImg = createAsyncThunk("/getCardsImg", async ({}, {rejectWithValue}) => {
    return fetch(`${baseUrl}/getCardsImg`)
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const getDeleteCards = createAsyncThunk("/getDeleteCards", async ({}, {rejectWithValue}) => {
  return fetch(`${baseUrl}/getDeleteCards`)
  .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
},
);

export const addCards = createAsyncThunk("/addCards", async ({body}, {rejectWithValue}) => {
    const formData = new FormData();
    for (let i = 0; i < body.img.length; i++) {
      formData.append('img', body.img[i]);
    }
    formData.append('name', body.name)
    formData.append('role', body.role)
    formData.append('content', body.content)
    formData.append('size', body.size)
    formData.append('finishing', body.finishing)
    formData.append('states', body.states)
    formData.append('star', body.star)
    formData.append('text', body.text)
    formData.append('price', body.price)
    formData.append('discount', body.discount)
    return fetch(`${baseUrl}/addCards`,{
        method: "POST",
        body: formData
    })
    .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
});

export const updateCard = createAsyncThunk("/updateCard", async ({body, img}, {rejectWithValue}) => {
  const formData = new FormData();
  for (let i = 0; i < img.length; i++) {
    formData.append('img', img[i]);
  }
  formData.append('name', body.name)
  formData.append('role', body.role)
  formData.append('content', body.content)
  formData.append('size', body.size)
  formData.append('finishing', body.finishing)
  formData.append('states', body.states)
  formData.append('star', body.star)
  formData.append('text', body.text)
  formData.append('price', body.price)
  formData.append('discount', body.discount)
  return fetch(`${baseUrl}/addCards`,{
      method: "POST",
      body: formData
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
            console.log(action.payload);
            state.isLoading = false;
            state.items = action.payload;
            localStorage.setItem("cards", JSON.stringify(state.items))
        },
        [getCardsImg.pending.type]: (state) => {
          state.isLoading = true;
        },
        [getCardsImg.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.img = action.payload;
            localStorage.setItem("cardsImg", JSON.stringify(state.img))
        },
        [addCards.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addCards.fulfilled.type]: (state, action) => {
            if (!action.payload.err && !action.payload.message) {
                console.log(action.payload);
                state.isLoading = false;
                state.items = [...state.items, action.payload];
                localStorage.setItem("cards", JSON.stringify(state.items))
            } else{
                state.error = action.payload.err || action.payload.message
            }
         
        },
        [updateCard.fulfilled.type]: (state, action) => {
          if (!action.payload.err && !action.payload.message) {
              console.log(action.payload);
              state.isLoading = false;
              state.items = [...state.items, action.payload];
              localStorage.setItem("cards", JSON.stringify(state.items))
          } else{
              state.error = action.payload.err || action.payload.message
          }
       
      },
    }
});

