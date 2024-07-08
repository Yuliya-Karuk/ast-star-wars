import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Loader } from '@components/Loader/Loader';
import { Character } from '@models/index';
import s from './CharacterList.module.scss';

interface CharacterListProps {
  characters: Character[];
  isLoading: boolean;
}

export const CharacterList = ({ characters, isLoading }: CharacterListProps) => {
  const renderCharacterCards = () => {
    if (isLoading) {
      return <Loader />;
    }

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

  return <main className={s.main}>{renderCharacterCards()}</main>;
};
