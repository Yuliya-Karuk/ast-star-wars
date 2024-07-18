import search from '@assets/search-history.svg';
import { useAppDispatch } from '@hooks/storeHooks';
import { removeHistoryItemInFirebase } from '@store/historySlice';
import { extractQueryParameter } from '@utils/index';
import { useNavigate } from 'react-router-dom';
import s from './HistoryItem.module.scss';

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
    <li className={s.historyItem}>
      <div className={s.historyName}>
        <img src={search} alt="search" className={s.historyImage} />
        <button type="button" className={s.historyButton} onClick={handleSearchNavigation}>
          {query}
        </button>
      </div>
      <button type="button" className={s.removeButton} onClick={handleDeleteBtn} aria-label="Close details">
        <span className={s.removeIcon} />
      </button>
    </li>
  );
}
