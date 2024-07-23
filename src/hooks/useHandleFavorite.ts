import { AppRoutes } from '@router/routes';
import { toggleFavoriteInFirebase } from '@store/favoritesSlice';
import { selectUseIsLoggedIn } from '@store/selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './storeHooks';

export const useHandleFavorites = (callback: () => void, id: string = '') => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const navigate = useNavigate();

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLoggedIn) {
      callback();
      dispatch(toggleFavoriteInFirebase({ id }));
    } else {
      navigate(AppRoutes.LOGIN_ROUTE);
    }
  };

  return { isLoggedIn, handleToggleFavorite };
};
