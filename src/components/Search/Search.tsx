import { FormEvent, useState } from 'react';
import s from './Search.module.scss';

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form noValidate method="post" className={s.search} onSubmit={handleSubmit}>
      <input
        className={s.searchInput}
        required
        type="text"
        placeholder="SEARCH ..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="submit" className={s.searchIcon} aria-label="search button" />
    </form>
  );
};
