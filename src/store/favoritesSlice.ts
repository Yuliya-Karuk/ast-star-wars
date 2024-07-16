import { auth, db } from '@firebase/firebase';
import { FavoriteItem, LoadingState } from '@models/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

const waitForAuth = () => {
  return new Promise<User>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User is not authenticated'));
      }
    }, reject);
  });
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  const user = await waitForAuth();

  const docRef = doc(db, 'favorites', user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().items as FavoriteItem[];
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

    const docRef = doc(db, 'favorites', user.uid);
    const docSnap = await getDoc(docRef);

    let newFavorites: FavoriteItem[] = [];

    if (docSnap.exists()) {
      const currentFavorites = docSnap.data().items as FavoriteItem[];
      const exists = currentFavorites.find(fav => fav.id === item.id);

      if (exists) {
        newFavorites = currentFavorites.filter(fav => fav.id !== item.id);
      } else {
        newFavorites = [...currentFavorites, item];
      }
    } else {
      newFavorites = [item];
    }

    await setDoc(docRef, { items: newFavorites });

    return newFavorites;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
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

export const favoritesReducer = favoritesSlice.reducer;
