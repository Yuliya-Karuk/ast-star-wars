/* eslint-disable react-refresh/only-export-components */
import { auth } from '@firebase/firebase';
import { LoginData, UserData } from '@models/index';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextValue {
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  isLoginSuccess: boolean;
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  login: (data: LoginData) => Promise<UserCredential>;
  signup: (data: UserData) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const signup = async (userData: UserData) => {
    setIsLoginSuccess(true);
    return createUserWithEmailAndPassword(auth, userData.email, userData.password);
  };

  const login = async (userData: LoginData) => {
    setIsLoginSuccess(true);
    return signInWithEmailAndPassword(auth, userData.email, userData.password);
  };

  const logout = () => {
    setIsLoginSuccess(false);
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(Boolean(user));
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoginSuccess, setIsLoginSuccess, login, logout, signup }}
    >
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
