import { CharacterList, Loader } from '@components/index';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { AppRoutes } from '@router/routes';
import { useGetCharactersByIdsQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites } from '@utils/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './favorites.module.scss';

export const Favorites = () => {
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const navigate = useNavigate();
  const { errorNotify } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const { data: characters, error: charactersError } = useGetCharactersByIdsQuery(favorites || []);

  useEffect(() => {
    if (charactersError) {
      errorNotify(`Error fetching characters: ${charactersError}`);
    }
  }, [charactersError, errorNotify]);

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (characters && favorites) {
      const charactersWithFavorites = markFavorites(characters, favorites);
      setPreparedCharacters(charactersWithFavorites);
    }
    if ((favorites && favorites.length === 0) || (characters && characters.length > 0)) {
      setIsLoading(false);
    }
  }, [characters, favorites]);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate(AppRoutes.LOGIN_ROUTE);
    }
  }, [isLoggedIn, navigate]);

  if (isLoading || preparedCharacters === null) {
    return <Loader />;
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
