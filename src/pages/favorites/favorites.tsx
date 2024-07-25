import { CharacterList, Loader } from '@/components';
import { useFavorites } from '@/hooks';
import s from './favorites.module.scss';

export const Favorites = () => {
  const { isLoading, preparedCharacters } = useFavorites();

  if (isLoading) {
    return <Loader />;
  }

  return <main className={s.main}>{preparedCharacters && <CharacterList characters={preparedCharacters} />}</main>;
};
