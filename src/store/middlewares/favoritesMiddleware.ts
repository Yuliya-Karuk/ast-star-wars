import { FavoriteItem } from '@/models';
import { AddToFavoriteSuccess, RemoveFromFavoriteSuccess } from '@/utils';
import { Middleware } from '@reduxjs/toolkit';
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
