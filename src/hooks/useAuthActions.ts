import { auth } from '@/firebase/firebase';
import { LoginData, UserData } from '@/models';
import { clearFavorites } from '@/store/favoritesSlice';
import { clearHistory } from '@/store/historySlice';
import { authUser, removeUser, setUser } from '@/store/userSlice';
import { catchAuthErrors } from '@/utils';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useAppDispatch } from './storeHooks';

export const useAuthActions = () => {
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
        dispatch(authUser());
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
        dispatch(authUser());
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
        return true;
      })
      .catch(error => {
        const message = catchAuthErrors(error);
        toast.error(message);
        return null;
      });

  return { login, logout, signup };
};
