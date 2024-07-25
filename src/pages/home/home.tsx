import { CharacterList, Loader } from '@/components';
import { useCharacters } from '@/hooks';
import s from './home.module.scss';

export const Home = () => {
  const { charactersIsFetching, preparedCharacters } = useCharacters('', 1);

  if (charactersIsFetching || preparedCharacters === null) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      <CharacterList characters={preparedCharacters} />
    </main>
  );
};
