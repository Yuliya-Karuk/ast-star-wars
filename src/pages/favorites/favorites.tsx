import { CharacterList, Loader } from '@components/index';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { CharacterWithFavorite, FavoriteItem } from '@models/index';
import { AppRoutes } from '@router/routes';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { selectUseIsLoggedIn } from '@store/selectors';
import { isNotNullable, markFavorites } from '@utils/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/services';
import s from './favorites.module.scss';

export const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const fetchCharacters = async (favs: FavoriteItem[]) => {
      const characterPromises = favs.map(fav => api.getCharacterById(+fav.id));
      const resolvedCharacters = await Promise.all(characterPromises);

      const charactersWithFavorites = markFavorites(resolvedCharacters, isNotNullable(favorites));
      setPreparedCharacters(charactersWithFavorites);
      setIsLoading(false);
    };

    if (favorites && favorites.length > 0) {
      fetchCharacters(favorites);
    } else if (favorites && favorites.length === 0) {
      setPreparedCharacters([]);
    }
  }, [favorites]);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate(AppRoutes.LOGIN_ROUTE);
    }
  }, [isLoggedIn, navigate]);

  if (isLoading || preparedCharacters === null) {
    return (
      <div className={s.page}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <main className={s.main}>
        {preparedCharacters.length > 0 ? (
          <CharacterList characters={preparedCharacters} />
        ) : (
          <div className={s.emptySearch}>Sorry, we didn`t add something to favorite</div>
        )}
      </main>
    </div>
  );
};
