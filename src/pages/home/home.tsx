import { CharacterList, Loader } from '@components/index';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { useGetPeopleQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites, SuccessLoginMessage } from '@utils/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './home.module.scss';

export const Home = () => {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { successNotify } = useToast();
  const isNotificationShown = useRef(false);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const { data: characters, error: charactersError, isLoading: charactersLoading } = useGetPeopleQuery();
  const { errorNotify } = useToast();

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (charactersError) {
      errorNotify(`Error fetching characters: ${charactersError}`);
    }
  }, [charactersError, errorNotify]);

  useEffect(() => {
    if (characters && favorites) {
      const charactersWithFavorites = markFavorites(characters.results, favorites);
      setPreparedCharacters(charactersWithFavorites);
    }
  }, [characters, favorites]);

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

  if (charactersLoading || preparedCharacters === null) {
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
