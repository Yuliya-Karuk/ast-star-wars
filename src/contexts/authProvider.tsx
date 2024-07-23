/* eslint-disable react-refresh/only-export-components */
import { auth } from '@firebase/firebase';
import { useAppDispatch } from '@hooks/index';
import { LoginData, UserData } from '@models/index';
import { removeUser, setIsLoading, setUser } from '@store/userSlice';
import { catchAuthErrors } from '@utils/index';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AuthContextValue {
  isLoginSuccess: boolean;
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  login: (data: LoginData) => Promise<User | null>;
  signup: (data: UserData) => Promise<User | null>;
  logout: () => Promise<boolean | null>;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const signup = async (userData: UserData) => {
    return createUserWithEmailAndPassword(auth, userData.email, userData.password)
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
  };

  const login = async (userData: LoginData) => {
    return signInWithEmailAndPassword(auth, userData.email, userData.password)
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
  };

  const logout = () => {
    return signOut(auth)
      .then(() => {
        dispatch(removeUser());
        setIsLoginSuccess(false);
        return true;
      })
      .catch(error => {
        const message = catchAuthErrors(error);
        toast.error(message);
        return null;
      });
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within a AuthProvider');
  }

  return context;
};
