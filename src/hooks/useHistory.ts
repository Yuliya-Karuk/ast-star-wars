import { fetchHistory } from '@store/historySlice';
import { selectHistory, selectUserIsLoggedIn } from '@store/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './storeHooks';

export const useHistory = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const history = useSelector(selectHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getHistory = async () => {
      await dispatch(fetchHistory());
    };

    if (isLoggedIn) {
      getHistory();
    }
  }, [dispatch, isLoggedIn]);

  return { isLoggedIn, history };
};
