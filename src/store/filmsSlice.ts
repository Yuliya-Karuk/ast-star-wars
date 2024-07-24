import { Film } from '@/models';
import { createSlice } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';

type FilmsState = {
  films: Film[];
};

const initialState: FilmsState = {
  films: [],
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(swapiApi.endpoints.getFilms.matchFulfilled, (state, action) => {
      state.films = action.payload.results;
    });
  },
});

export const filmsReducer = filmsSlice.reducer;
