import { SuggestionList } from '@components/SuggestionList/SuggestionList';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch } from '@hooks/index';
import { Character } from '@models/index';
import { useSearchPeopleQuery } from '@store/api/swapiApi';
import { addHistoryItemInFirebase } from '@store/historySlice';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import s from './Search.module.scss';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [searchValue, setSearchValue] = useState<string>(urlQuery);
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { errorNotify } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: characters, error: charactersError } = useSearchPeopleQuery({
    searchValue: debouncedSearchValue,
  });

  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    if (characters) {
      setSuggestions(characters.results.slice(0, 6));
    }
  }, [characters]);

  useEffect(() => {
    if (charactersError) {
      errorNotify(`Error fetching characters: ${charactersError}`);
    }
  }, [charactersError, errorNotify]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('page', '1');
    currentParams.set('q', searchValue);
    dispatch(addHistoryItemInFirebase(`/search?${currentParams.toString()}`));
    navigate(`/search?${currentParams.toString()}`);
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
