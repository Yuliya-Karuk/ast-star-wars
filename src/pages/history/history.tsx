import { HistoryItem, Loader } from '@components/index';
import { useHistory } from '@hooks/useHistory';
import s from './history.module.scss';

export const HistoryPage = () => {
  const { history } = useHistory();

  if (!history) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      <h1 className={s.historyTitle}>Search history</h1>
      {history.length > 0 ? (
        <ul className={s.historyList}>
          {history.map(item => (
            <HistoryItem key={crypto.randomUUID()} historyItem={item} />
          ))}
        </ul>
      ) : (
        <div className={s.emptySearch}>Your search history is empty.</div>
      )}
    </main>
  );
};
