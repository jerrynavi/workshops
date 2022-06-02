import { combineReducers } from '@reduxjs/toolkit';
import appSlice from 'app/app.slice';
import cartSlice from 'components/cart/cartSlice';
import checkoutSlice from 'components/checkout/checkoutSlice';
import { api } from 'core';
import homeSlice from 'pages/home/homeSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appSlice,
  home: homeSlice,
  cart: cartSlice,
  checkout: checkoutSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
