import { configureStore, Middleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { offlineStorage } from './middleware/offlineStorage';
import { STORE_NAME } from 'utils/constants';
import { api } from 'core';

const savedLocalStorage = localStorage.getItem(STORE_NAME);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(offlineStorage as Middleware<any>)
      .prepend(api.middleware),
  ...(savedLocalStorage &&
    savedLocalStorage?.length > 0 && {
      preloadedState: JSON.parse(savedLocalStorage),
    }),
});

export default store;
