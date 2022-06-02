import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { error } = action.payload;
      toast.error({
        title: 'An error occurred!',
        message: typeof error === 'string' ? error : '',
      });
    }

    return next(action);
  };
