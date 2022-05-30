import { combineReducers } from '@reduxjs/toolkit';
import appSlice from 'app/app.slice';
import { api } from 'core';
import homeSlice from 'pages/home/homeSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appSlice,
  home: homeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
