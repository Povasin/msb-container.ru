import { BagSlice} from "./bag";
import {authSlice} from "./auth"
import {cardsSlice} from "./cards"
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

const reducers = {
    BagSlice: BagSlice.reducer,
    authSlice: authSlice.reducer,
    cardsSlice: cardsSlice.reducer
};

export const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
      
      ),
  });

setupListeners(store.dispatch);

  