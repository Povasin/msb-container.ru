import {BagSlice} from "./bag";
import {authSlice} from "./auth"
import {cardsSlice} from "./cards"
import {orderSliceClient} from "./orderClient"
import {OrdersSlice} from "./orders"
import {OrdersCardSlice} from "./ordersCard"
import {peopleSlice} from "./people"
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

const reducers = {
    BagSlice: BagSlice.reducer,
    authSlice: authSlice.reducer,
    cardsSlice: cardsSlice.reducer,
    orderSliceClient: orderSliceClient.reducer,
    OrdersSlice: OrdersSlice.reducer,
    OrdersCardSlice: OrdersCardSlice.reducer,
    peopleSlice: peopleSlice.reducer,
};

export const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
      
      ),
  });

setupListeners(store.dispatch);

  