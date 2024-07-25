import { SuccessLoginMessage } from '@/utils';
import { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { authUser } from '../userSlice';

export const authNotificationMiddleware: Middleware = () => next => action => {
  if (authUser.match(action)) {
    toast.success(SuccessLoginMessage);
  }
  return next(action);
};
