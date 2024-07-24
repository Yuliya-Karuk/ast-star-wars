import { CharacterWithId } from '@/models';
import { AppRoutes } from '@/router/routes';
import { useNavigate } from 'react-router-dom';
import s from './SuggestionList.module.scss';

interface SuggestionListProps {
  suggestions: CharacterWithId[];
}

export const SuggestionList = (props: SuggestionListProps) => {
  const { suggestions } = props;
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`${AppRoutes.HOME_ROUTE}people/${id}`);
  };

  return (
    suggestions.length > 0 && (
      <ul className={s.suggestionList}>
        {suggestions.map(sugg => (
          <li key={sugg.name} className={s.suggestionItem}>
            <button type="button" className={s.suggestionButton} onMouseDown={() => handleItemClick(sugg.id)}>
              {sugg.name}
            </button>
          </li>
        ))}
      </ul>
    )
  );
};
