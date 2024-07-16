import { type RootState } from '../index';

export const selectUserUid = (state: RootState) => state.user.uid;
export const selectUseIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
