import { CharacterList } from '@components/index';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { Character } from '@models/index';
import { decrement, increment } from '@store/counterSlice';
import { SuccessLoginMessage } from '@utils/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from 'src/services';
import s from './home.module.scss';

export const Home = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { successNotify } = useToast();
  const isNotificationShown = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await api.getPeople();
      setCharacters(result.results);
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

  return (
    <div className={s.page}>
      <button onClick={() => dispatch(increment())} type="button">
        Increment +
      </button>
      <h3>The count is {count} </h3>
      <button onClick={() => dispatch(decrement())} type="button">
        Decrement -
      </button>
      <CharacterList characters={characters} isLoading={isLoading} />
    </div>
  );
};
