import { auth } from '@/firebase/firebase';
import { useAppDispatch } from '@/hooks';
import { LoginData, UserData } from '@/models';
import { clearFavorites } from '@/store/favoritesSlice';
import { clearHistory } from '@/store/historySlice';
import { catchAuthErrors } from '@/utils';
import { removeUser, setIsLoading, setUser } from '@store/userSlice';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface AuthContextValue {
  isLoginSuccess: boolean;
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  login: (data: LoginData) => Promise<User | null>;
  signup: (data: UserData) => Promise<User | null>;
  logout: () => Promise<boolean | null>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const signup = async (userData: UserData) =>
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(({ user }) => {
        dispatch(
          setUser({
            uid: user.uid,
            isAuth: true,
          })
        );
        setIsLoginSuccess(true);
        return user;
      })
      .catch(error => {
        const message = catchAuthErrors(error);
        toast.error(message);
        return null;
      });

  const login = async (userData: LoginData) =>
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(({ user }) => {
        dispatch(
          setUser({
            uid: user.uid,
            isAuth: true,
          })
        );
        setIsLoginSuccess(true);
        return user;
      })
      .catch(error => {
        const message = catchAuthErrors(error);
        toast.error(message);
        return null;
      });

  const logout = () =>
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        dispatch(clearFavorites());
        dispatch(clearHistory());
        setIsLoginSuccess(false);
        return true;
      })
      .catch(error => {
        const message = catchAuthErrors(error);
        toast.error(message);
        return null;
      });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            isAuth: true,
          })
        );
      } else {
        dispatch(
          setUser({
            uid: null,
            isAuth: false,
          })
        );
      }
      dispatch(setIsLoading(false));
    });

    dispatch(setIsLoading(true));
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isLoginSuccess, setIsLoginSuccess, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
