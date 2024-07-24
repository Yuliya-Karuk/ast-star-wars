import { CharacterList, Loader } from '@/components';
import { useAuth } from '@/contexts';
import { useCharacters } from '@/hooks';
import { SuccessLoginMessage } from '@/utils';
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import s from './home.module.scss';

export const Home = () => {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const isNotificationShown = useRef(false);
  const { charactersIsFetching, preparedCharacters } = useCharacters('', 1);

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

  if (charactersIsFetching || preparedCharacters === null) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      <CharacterList characters={preparedCharacters} />
    </main>
  );
};
