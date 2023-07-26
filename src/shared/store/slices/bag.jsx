import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    items: [],
    isLoading: false,
    error: '',
};

const backendUrl = 'https://backend.msb-container.ru'

export const order = createAsyncThunk("/bag", async ({body, idUser}, {rejectWithValue}) => {        
    return fetch(`${backendUrl}/bag`,{
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({body: body, idUser: idUser})
          },
        )
        .then(res => res.json()).catch((rej)=>rejectWithValue(rej))
  },
);

export const BagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addCard(state, {payload}){
            const {idCard, count, month, ...other} = payload
            state.items = [...state.items, {idCard: idCard, data: other, count: count ?? 1 , month: month ?? 1}]
            localStorage.setItem("bag", JSON.stringify(state.items))
        },
        removeCard(state, {payload}){
            state.items =  state.items.filter((item)=>payload.idCard !== item.idCard)
            localStorage.setItem("bag", JSON.stringify(state.items))
        },  
        getItems(state){
            return state.items
        },
        fillStore(state){
            if (localStorage.getItem("bag") != null) {
                state.items = JSON.parse(localStorage.getItem("bag"))
            } 
        },
        updateBag(state, {payload}){
            state.items = payload
            localStorage.setItem("bag", JSON.stringify(state.items))
        },
        checkRegister(state, {payload}){
            state.error = payload
        }
    },
    extraReducers: {
        [order.pending.type]: (state) => {
            state.isLoading = true;
        },
        [order.fulfilled.type]: (state, action) => {
            if (!action.payload.message) {
                state.isLoading = false;
                state.items = [];
                localStorage.setItem("bag", JSON.stringify(state.items))
            } else {
                state.isLoading = false;
                state.error = action.payload.message;
            }
        },
    }
});

