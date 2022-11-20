import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { getAllPhotos } from '../api/photos';

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
            state.items = [...state.items, payload]
            localStorage.setItem("bag", JSON.stringify([...state.items, payload]))
        },
        removeCard(state, {payload}){
            state.items =  state.items.filter((item)=>payload.id !== item.id)
            localStorage.setItem("bag", JSON.stringify([...state.items, payload]))
        },  
        getItems(state){
            return state.items
        },
        fillStore(state){
            if (localStorage.getItem("bag") != null) {
                state.items = JSON.parse(localStorage.getItem("bag"))
            } 
        } 
    },
    // extraReducers: {
    //     [getAllPhotos.pending.type]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [getAllPhotos.fulfilled.type]: (state, action) => {
    //         state.isLoading = false;
    //         state.error = '';
    //         state.photos = action.payload;
    //     },
    //     [getAllPhotos.rejected.type]: (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
    //     },
    // },
});

