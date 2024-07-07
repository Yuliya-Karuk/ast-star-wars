import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { decrement, increment } from '@store/counterSlice';
import { SuccessLoginMessage } from '@utils/index';
import { useEffect } from 'react';
import s from './home.module.scss';

export const Home = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { customToast, successNotify } = useToast();

  const notify = () => {
    successNotify(SuccessLoginMessage);
    setIsLoginSuccess(false);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.page}>
      <button onClick={() => dispatch(increment())} type="button">
        Increment +
      </button>
      <h3>The count is {count} </h3>
      <button onClick={() => dispatch(decrement())} type="button">
        Decrement -
      </button>
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
};
