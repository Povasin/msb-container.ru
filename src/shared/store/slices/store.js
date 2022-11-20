import { BagSlice } from "./bag";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
const reducers = {
    BagSlice: BagSlice.reducer 
};

export const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
      
      ),
  });

setupListeners(store.dispatch);

  