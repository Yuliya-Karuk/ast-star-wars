import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Loader } from '@components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { Character } from '@models/index';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { useEffect } from 'react';
import s from './CharacterList.module.scss';

interface CharacterListProps {
  characters: Character[];
  isLoading: boolean;
}

export const CharacterList = ({ characters, isLoading }: CharacterListProps) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state: RootState) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      {characters.length > 0 ? (
        <ul className={s.mainContainer}>
          {characters.map(character => (
            <CharacterItem key={character.name} character={character} favorites={items} />
          ))}
        </ul>
      ) : (
        <div className={s.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
      )}
    </main>
  );
};
