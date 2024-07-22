import { CharacterList, Loader } from '@components/index';
import { useFavorites } from '@hooks/useFavorites';
import s from './favorites.module.scss';

export const Favorites = () => {
  const { isLoading, preparedCharacters } = useFavorites();

  if (isLoading || preparedCharacters === null) {
    return <Loader />;
  }

  return <main className={s.main}>{preparedCharacters && <CharacterList characters={preparedCharacters} />}</main>;
};
