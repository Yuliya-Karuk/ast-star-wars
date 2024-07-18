import { FavoriteItem } from '@models/index';
import { Middleware } from '@reduxjs/toolkit';
import { AddToFavoriteSuccess, RemoveFromFavoriteSuccess } from '@utils/index';
import { toast } from 'react-toastify';
import { toggleFavoriteInFirebase } from '../favoritesSlice';

export const favoritesNotifyMiddleware: Middleware = () => next => action => {
  const result = next(action);

  if (toggleFavoriteInFirebase.fulfilled.match(action)) {
    const { id } = action.meta.arg;
    const exists = action.payload.some((fav: FavoriteItem) => fav.id === id);
    if (exists) {
      toast.success(AddToFavoriteSuccess);
    } else {
      toast.success(RemoveFromFavoriteSuccess);
    }
  }

  return result;
};
