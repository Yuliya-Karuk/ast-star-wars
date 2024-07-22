import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { CharacterWithFavorite } from '@models/index';
import s from './CharacterList.module.scss';

interface CharacterListProps {
  characters: CharacterWithFavorite[];
}

export const CharacterList = ({ characters }: CharacterListProps) => {
  return characters.length > 0 ? (
    <ul className={s.mainContainer}>
      {characters.map(character => (
        <CharacterItem key={character.name} character={character} />
      ))}
    </ul>
  ) : (
    <div className={s.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
  );
};
