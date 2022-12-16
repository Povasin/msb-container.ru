import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    isLoading: false,
    error: '',
};

export const BagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addCard(state, {payload}){
            state.items = [...state.items, {id: payload.id, data: payload.data, count: payload.count ?? 1 , month: payload.month ?? 1}]
            localStorage.setItem("bag", JSON.stringify(state.items))
        },
        removeCard(state, {payload}){
            state.items =  state.items.filter((item)=>payload.id !== item.id)
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
        }
    },
});

