import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Character, FavoriteItem } from '@models/index';
import s from './CharacterList.module.scss';

interface CharacterListProps {
  characters: Character[];
  favorites: FavoriteItem[];
}

export const CharacterList = ({ characters, favorites }: CharacterListProps) => {
  return (
    characters.length > 0 && (
      <ul className={s.mainContainer}>
        {characters.map(character => (
          <CharacterItem key={character.name} character={character} favorites={favorites} />
        ))}
      </ul>
    )
  );
};
