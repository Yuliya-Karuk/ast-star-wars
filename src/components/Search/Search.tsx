import { SuggestionList } from '@components/SuggestionList/SuggestionList';
import { Character } from '@models/index';
import { FormEvent, useEffect, useState } from 'react';
import { api } from 'src/services';
import { useDebouncedCallback } from 'use-debounce';
import s from './Search.module.scss';

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue) {
        try {
          const response = await api.searchPeopleByName(searchValue);
          setSuggestions(response.results.slice(0, 6));
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchData();
  }, [searchValue]);

  const debouncedInputChange = useDebouncedCallback((newSearchValue: string) => {
    setSearchValue(newSearchValue);
  }, 200);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedInputChange(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={s.searchContainer}>
      <form noValidate method="post" className={s.search} onSubmit={handleSubmit}>
        <input
          className={s.searchInput}
          required
          type="text"
          placeholder="SEARCH ..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button type="submit" className={s.searchIcon} aria-label="search button" />
      </form>
      {isFocused && <SuggestionList suggestions={suggestions} />}
    </div>
  );
};
