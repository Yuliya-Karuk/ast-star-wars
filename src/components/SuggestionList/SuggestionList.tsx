import { Character } from '@models/index';
import s from './SuggestionList.module.scss';

interface SuggestionListProps {
  suggestions: Character[];
}

export const SuggestionList = (props: SuggestionListProps) => {
  const { suggestions } = props;

  return (
    suggestions.length > 0 && (
      <ul className={s.suggestionList}>
        {suggestions.map(sugg => (
          <li key={sugg.name} className={s.suggestionItem}>
            <button type="button" className={s.suggestionButton}>
              {sugg.name}
            </button>
          </li>
        ))}
      </ul>
    )
  );
};
