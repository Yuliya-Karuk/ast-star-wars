import { type RootState } from '../index';

export const selectUserUid = (state: RootState) => state.user.uid;
export const selectUseIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
