import search from '@assets/search-history.svg';
import { useAppDispatch } from '@hooks/storeHooks';
import { removeHistoryItemInFirebase } from '@store/historySlice';
import { extractQueryParameter } from '@utils/index';
import { useNavigate } from 'react-router-dom';
import styles from './HistoryItem.module.scss';

interface HistoryItemProps {
  historyItem: string;
}

export function HistoryItem({ historyItem }: HistoryItemProps) {
  const query = extractQueryParameter(historyItem);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearchNavigation = () => {
    navigate(historyItem);
  };

  async function handleDeleteBtn() {
    dispatch(removeHistoryItemInFirebase(historyItem));
  }

  return (
    <li className={styles.historyItem}>
      <div className={styles.historyName}>
        <img src={search} alt="search" className={styles.historyImage} />
        <button type="button" className={styles.historyButton} onClick={handleSearchNavigation}>
          {query}
        </button>
      </div>
      <button type="button" className={styles.removeButton} onClick={handleDeleteBtn} aria-label="Close details">
        <span className={styles.removeIcon} />
      </button>
    </li>
  );
}
