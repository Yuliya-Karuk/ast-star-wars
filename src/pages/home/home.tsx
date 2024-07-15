import { CharacterList, Loader } from '@components/index';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { Character, CharacterWithFavorite } from '@models/index';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { markFavorites, SuccessLoginMessage } from '@utils/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from 'src/services';
import s from './home.module.scss';

export const Home = () => {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { successNotify } = useToast();
  const isNotificationShown = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);

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
    const getData = async () => {
      const response = await api.getPeople();
      setCharacters(response.results);
      setIsLoading(false);
    };

    getData();
  }, []);

  const notify = useCallback(() => {
    successNotify(SuccessLoginMessage);
    setIsLoginSuccess(false);
  }, [successNotify, setIsLoginSuccess]);

  useEffect(() => {
    if (isLoginSuccess && !isNotificationShown.current) {
      notify();
      isNotificationShown.current = true;
    }
  }, [isLoginSuccess, notify]);

  useEffect(() => {
    if (characters) {
      const charactersWithFavorites = markFavorites(characters, favorites);
      setPreparedCharacters(charactersWithFavorites);
    }
  }, [characters, favorites]);

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
          <div className={s.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
        )}
      </main>
    </div>
  );
};
