import { auth } from '@/firebase/firebase';
import { useAppDispatch } from '@/hooks';
import { setIsLoading, setUser } from '@store/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect } from 'react';

export interface AuthContextValue {}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

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

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
