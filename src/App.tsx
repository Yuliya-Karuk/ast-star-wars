import viteLogo from '../public/vite.svg';
import './App.css';
import reactLogo from './assets/react.svg';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { decrement, increment } from './store/counterSlice';

function App() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())} type="button">
          Increment +
        </button>
        <h3>The count is {count} </h3>
        <button onClick={() => dispatch(decrement())} type="button">
          Decrement -
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
