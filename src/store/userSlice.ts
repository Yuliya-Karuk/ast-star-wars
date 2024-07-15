import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  uid: null | string;
  isLoggedIn: boolean | null;
};

const initialState: UserState = {
  uid: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, actions) {
      state.uid = actions.payload.uid;
      state.isLoggedIn = true;
    },
    removeUser(state) {
      state.uid = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
