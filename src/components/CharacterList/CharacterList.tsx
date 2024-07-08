import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Loader } from '@components/Loader/Loader';
import { Character } from '@models/index';
import s from './CharacterList.module.scss';

interface CharacterListProps {
  characters: Character[];
  isLoading: boolean;
}

export const CharacterList = ({ characters, isLoading }: CharacterListProps) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      {characters.length > 0 ? (
        <ul className={s.mainContainer}>
          {characters.map(character => (
            <CharacterItem key={character.name} character={character} />
          ))}
        </ul>
      ) : (
        <div className={s.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
      )}
    </main>
  );
};
