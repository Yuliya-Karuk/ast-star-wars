import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';
import { favoritesReducer } from './favoritesSlice';
import { historyReducer } from './historySlice';
import { favoritesNotifyMiddleware } from './middlewares/favoritesMiddleware';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
    user: userReducer,
    favorites: favoritesReducer,
    history: historyReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiApi.middleware, favoritesNotifyMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
