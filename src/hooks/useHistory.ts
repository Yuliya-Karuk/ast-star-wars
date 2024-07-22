import { AppRoutes } from '@router/routes';
import { fetchHistory } from '@store/historySlice';
import { selectHistory, selectUseIsLoggedIn } from '@store/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './storeHooks';

export const useHistory = () => {
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const history = useSelector(selectHistory);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getHistory = async () => {
      await dispatch(fetchHistory());
    };

    if (isLoggedIn) {
      getHistory();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate(AppRoutes.LOGIN_ROUTE);
    }
  }, [isLoggedIn, navigate]);

  return { isLoggedIn, history };
};
