import { CharacterList, Loader } from '@components/index';
import { useAppDispatch } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { AppRoutes } from '@router/routes';
import { useGetCharactersByIdsQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { selectFavorites, selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites } from '@utils/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './favorites.module.scss';

export const Favorites = () => {
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { data: characters } = useGetCharactersByIdsQuery(favorites || []);

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
      <main className={s.main}>{preparedCharacters && <CharacterList characters={preparedCharacters} />}</main>
    </div>
  );
};
