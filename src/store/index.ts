import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';
import { favoritesReducer } from './favoritesSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
    user: userReducer,
    favorites: favoritesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
