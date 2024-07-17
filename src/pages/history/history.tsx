import { HistoryItem } from '@components/index';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { AppRoutes } from '@router/routes';
import { fetchHistory } from '@store/historySlice';
import { RootState } from '@store/index';
import { selectUseIsLoggedIn } from '@store/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './history.module.scss';

export const HistoryPage = () => {
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const { history } = useAppSelector((state: RootState) => state.history);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // console.log(history);

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

  // if (isLoading || preparedCharacters === null) {
  //   return (
  //     <div className={s.page}>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className={s.page}>
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
    </div>
  );
};
