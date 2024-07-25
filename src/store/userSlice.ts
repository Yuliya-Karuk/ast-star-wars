import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  uid: null | string;
  isLoggedIn: boolean | null;
  isLoading: boolean;
};

const initialState: UserState = {
  uid: null,
  isLoggedIn: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, actions) {
      state.uid = actions.payload.uid;
      state.isLoggedIn = actions.payload.isAuth;
      state.isLoading = false;
    },
    removeUser(state) {
      state.uid = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    authUser() {},
    setIsLoading(state, actions) {
      state.isLoading = actions.payload;
    },
  },
});

export const { setUser, removeUser, setIsLoading, authUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
