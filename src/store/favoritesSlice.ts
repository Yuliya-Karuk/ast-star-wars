import { db } from '@firebase/firebase';
import { FavoriteItem, LoadingState } from '@models/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

export type FavoritesState = {
  items: FavoriteItem[];
  loading: LoadingState;
  error: string | null;
};

const initialState: FavoritesState = {
  items: [],
  loading: 'idle',
  error: null,
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  const querySnapshot = await getDocs(collection(db, 'favorites'));
  const favorites: FavoriteItem[] = [];
  querySnapshot.forEach(fav => {
    favorites.push({ id: fav.id });
  });
  return favorites;
});

export const toggleFavoriteInFirebase = createAsyncThunk(
  'favorites/toggleFavoriteInFirebase',
  async (item: FavoriteItem, { getState }) => {
    const state = getState() as { favorites: FavoritesState };
    const exists = state.favorites.items.find(fav => fav.id === item.id);
    const docRef = doc(db, 'favorites', item.id);

    if (exists) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, item);
    }

    return item;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push({ id: action.payload });
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      .addCase(toggleFavoriteInFirebase.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(toggleFavoriteInFirebase.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items.splice(index, 1);
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(toggleFavoriteInFirebase.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to toggle favorite';
      });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
