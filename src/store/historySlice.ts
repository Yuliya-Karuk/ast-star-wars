import { auth, db } from '@firebase/firebase';
import { LoadingState } from '@models/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type HistoryState = {
  history: string[] | null;
  loading: LoadingState;
  error: string | null;
};

const initialState: HistoryState = {
  history: null,
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

export const fetchHistory = createAsyncThunk('history/fetchHistory', async () => {
  const user = await waitForAuth();

  const docRef = doc(db, 'history', user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().items as string[];
  }
  return [];
});

export const addHistoryItemInFirebase = createAsyncThunk('history/addHistoryItemInFirebase', async (item: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const docRef = doc(db, 'history', user.uid);
  const docSnap = await getDoc(docRef);

  let newHistory: string[] = [];

  if (docSnap.exists()) {
    const currentHistory = docSnap.data().items as string[];
    newHistory = [...currentHistory, item];
  } else {
    newHistory = [item];
  }

  await setDoc(docRef, { items: newHistory });

  return newHistory;
});

export const removeHistoryItemInFirebase = createAsyncThunk(
  'history/removeHistoryItemInFirebase',
  async (itemToRemove: string) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const docRef = doc(db, 'history', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentHistory = docSnap.data().items as string[];
      const newHistory = currentHistory.filter(item => item !== itemToRemove);

      await setDoc(docRef, { items: newHistory });

      return newHistory;
    }
    throw new Error('History document does not exist');
  }
);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHistory.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch history';
      })
      .addCase(addHistoryItemInFirebase.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addHistoryItemInFirebase.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.history = action.payload;
      })
      .addCase(addHistoryItemInFirebase.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to add history item';
      })
      .addCase(removeHistoryItemInFirebase.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(removeHistoryItemInFirebase.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.history = action.payload;
      })
      .addCase(removeHistoryItemInFirebase.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to remove history item';
      });
  },
});

export const historyReducer = historySlice.reducer;