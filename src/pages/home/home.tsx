import { CharacterList, Loader } from '@components/index';
import { useAuth } from '@contexts/authProvider';
import { useAppDispatch } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { useGetPeopleQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { selectFavorites, selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites, SuccessLoginMessage } from '@utils/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import s from './home.module.scss';

export const Home = () => {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const isNotificationShown = useRef(false);
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const { data: characters, isLoading: charactersLoading } = useGetPeopleQuery();

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
      const charactersWithFavorites = markFavorites(characters.results, favorites);
      setPreparedCharacters(charactersWithFavorites);
    }
  }, [characters, favorites]);

  const notify = useCallback(() => {
    toast.success(SuccessLoginMessage);
    setIsLoginSuccess(false);
  }, [setIsLoginSuccess]);

  useEffect(() => {
    if (isLoginSuccess && !isNotificationShown.current) {
      notify();
      isNotificationShown.current = true;
    }
  }, [isLoginSuccess, notify]);

  if (charactersLoading || preparedCharacters === null) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      <CharacterList characters={preparedCharacters} />
    </main>
  );
};
