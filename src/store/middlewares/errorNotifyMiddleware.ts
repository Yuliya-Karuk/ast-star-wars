import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const errorsNotifyMiddleware: Middleware = () => next => action => {
  const result = next(action);

  if (isRejectedWithValue(action)) {
    toast.error(action.error.message || 'An unknown error occurred');
  }

  return result;
};
