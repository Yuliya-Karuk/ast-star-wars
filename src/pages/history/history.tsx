import { HistoryItem, Loader } from '@components/index';
import { useAppDispatch } from '@hooks/index';
import { AppRoutes } from '@router/routes';
import { fetchHistory } from '@store/historySlice';
import { selectHistory, selectUseIsLoggedIn } from '@store/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './history.module.scss';

export const HistoryPage = () => {
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

  if (!history) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      <h1 className={s.historyTitle}>Search history</h1>
      {history && history.length > 0 && (
        <ul className={s.historyList}>
          {history.map(item => (
            <HistoryItem key={crypto.randomUUID()} historyItem={item} />
          ))}
        </ul>
      )}
    </main>
  );
};
