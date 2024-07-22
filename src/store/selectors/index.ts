import { type RootState } from '../index';

export const selectUserUid = (state: RootState) => state.user.uid;
export const selectUseIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFilms = (state: RootState) => state.films.films;
export const selectHistory = (state: RootState) => state.history.history;
