import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';
import { favoritesReducer } from './favoritesSlice';
import { filmsReducer } from './filmsSlice';
import { historyReducer } from './historySlice';
import { errorsNotifyMiddleware } from './middlewares/errorNotifyMiddleware';
import { favoritesNotifyMiddleware } from './middlewares/favoritesMiddleware';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
    user: userReducer,
    favorites: favoritesReducer,
    history: historyReducer,
    films: filmsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(swapiApi.middleware, favoritesNotifyMiddleware, errorsNotifyMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
