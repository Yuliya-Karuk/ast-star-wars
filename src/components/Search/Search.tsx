import { FormEvent, useState } from 'react';
import styles from './Search.module.scss';

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form noValidate method="post" className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        required
        type="text"
        placeholder="SEARCH ..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.searchIcon} aria-label="search button" />
    </form>
  );
};
