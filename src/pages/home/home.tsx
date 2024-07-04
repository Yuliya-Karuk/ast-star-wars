import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { decrement, increment } from '../../store/counterSlice';
import styles from './home.module.scss';

export const Home = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.page}>
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
