import { type RootState } from '..';

export const selectUserUid = (state: RootState) => state.user.uid;
export const selectUserIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFilms = (state: RootState) => state.films.films;
export const selectHistory = (state: RootState) => state.history.history;
