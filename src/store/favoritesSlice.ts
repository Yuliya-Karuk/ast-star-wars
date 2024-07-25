import { favoriteItemConverter } from '@/firebase/converter';
import { auth, db } from '@/firebase/firebase';
import { FavoriteItem, LoadingState } from '@/models';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { type RootState } from '.';
import { selectUserUid } from './selectors';

type FavoritesState = {
  favorites: FavoriteItem[] | null;
  loading: LoadingState;
  error: string | null;
};

const initialState: FavoritesState = {
  favorites: null,
  loading: 'idle',
  error: null,
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (_, { getState }) => {
  const uid = selectUserUid(getState() as RootState);
  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const docRef = doc(db, 'favorites', uid).withConverter(favoriteItemConverter);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return [];
});

export const toggleFavoriteInFirebase = createAsyncThunk(
  'favorites/toggleFavoriteInFirebase',
  async (item: FavoriteItem) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User is not authenticated');
    }

    const docRef = doc(db, 'favorites', user.uid).withConverter(favoriteItemConverter);
    const docSnap = await getDoc(docRef);

    let newFavorites: FavoriteItem[] = [];

    if (docSnap.exists()) {
      const currentFavorites = docSnap.data();

      const exists = currentFavorites.find(fav => fav.id === item.id);
      if (exists) {
        newFavorites = currentFavorites.filter(fav => fav.id !== item.id);
      } else {
        newFavorites = [...currentFavorites, item];
      }
    } else {
      newFavorites = [item];
    }

    await setDoc(docRef, newFavorites);

    return newFavorites;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites(state) {
      state.favorites = null;
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
        state.favorites = action.payload;
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
        state.favorites = action.payload;
      })
      .addCase(toggleFavoriteInFirebase.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to toggle favorite';
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
