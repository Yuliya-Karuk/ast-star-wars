import { CharacterList, Loader, Pagination } from '@components/index';
import { usePaginatedCharacters } from '@hooks/usePaginatedCharacters';
import s from './searchPage.module.scss';

export const SearchPage = () => {
  const { charactersIsFetching, preparedCharacters, totalPages, currentPage } = usePaginatedCharacters();

  if (charactersIsFetching || preparedCharacters === null) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      {preparedCharacters && (
        <>
          <CharacterList characters={preparedCharacters} />
          {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} />}
        </>
      )}
    </main>
  );
};
