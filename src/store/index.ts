import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { STORE_NAME } from 'utils/constants';
import { api } from 'core';
import { rtkQueryErrorLogger } from './middleware/errorHandler';

const savedLocalStorage = localStorage.getItem(STORE_NAME);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(rtkQueryErrorLogger).prepend(api.middleware),
  ...(savedLocalStorage &&
    savedLocalStorage?.length > 0 && {
      preloadedState: JSON.parse(savedLocalStorage),
    }),
});

export default store;
