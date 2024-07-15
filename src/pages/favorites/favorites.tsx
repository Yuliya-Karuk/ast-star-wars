import { CharacterList, Loader } from '@components/index';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { Character, FavoriteItem } from '@models/index';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { useEffect, useState } from 'react';
import { api } from 'src/services';
import s from './favorites.module.scss';

export const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [characters, setCharacters] = useState<Character[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFavorites());
      setIsLoading(false);
    };

    if (isLoading) {
      fetchData();
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    const fetchCharacters = async (favs: FavoriteItem[]) => {
      const characterPromises = favs.map(fav => api.getCharacterById(+fav.id));
      const resolvedCharacters = await Promise.all(characterPromises);
      setCharacters(resolvedCharacters);
    };

    if (!isLoading && favorites.length === 0) {
      setCharacters([]);
    } else if (!isLoading) {
      fetchCharacters(favorites);
    }
  }, [favorites, isLoading]);

  if (isLoading || characters === null) {
    return (
      <div className={s.page}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <main className={s.main}>
        {characters.length > 0 ? (
          <CharacterList characters={characters} favorites={favorites} />
        ) : (
          <div className={s.emptySearch}>Sorry, we didn`t add something to favorite</div>
        )}
      </main>
    </div>
  );
};
