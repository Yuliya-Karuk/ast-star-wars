import { SuggestionList } from '@components/SuggestionList/SuggestionList';
import { useToast } from '@contexts/toastProvider';
import { Character } from '@models/index';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from 'src/services';
import { useDebouncedCallback } from 'use-debounce';
import s from './Search.module.scss';

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { errorNotify } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const setSearchInput = () => {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('q') || '';

      setSearchValue(searchQuery);
    };

    setSearchInput();
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue) {
        try {
          const response = await api.searchPeopleByName(searchValue);
          setSuggestions(response.results.slice(0, 6));
        } catch (error) {
          errorNotify((error as Error).message);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchData();
  }, [errorNotify, searchValue]);

  const debouncedInputChange = useDebouncedCallback((newSearchValue: string) => {
    setSearchValue(newSearchValue);
  }, 200);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedInputChange(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    const params = new URLSearchParams({ q: searchValue, page: '1' });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={s.searchContainer}>
      <form noValidate method="post" className={s.search} onSubmit={handleSubmit}>
        <input
          className={s.searchInput}
          required
          ref={inputRef}
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
