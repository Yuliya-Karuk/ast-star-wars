import { auth } from '@firebase/firebase';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { decrement, increment } from '@store/counterSlice';
import { useEffect } from 'react';
import s from './home.module.scss';

export const Home = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      // console.log(user);
    });
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
    </div>
  );
};
