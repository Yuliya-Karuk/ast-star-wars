import { CharacterWithId } from '@models/index';
import { useSearchPeopleQuery } from '@store/api/swapiApi';
import { addHistoryItemInFirebase } from '@store/historySlice';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useAppDispatch } from './storeHooks';

export const useSearchForm = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [searchValue, setSearchValue] = useState<string>(urlQuery);
  const [suggestions, setSuggestions] = useState<CharacterWithId[]>([]);

  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: characters } = useSearchPeopleQuery({
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

  return { suggestions, searchValue, handleInputChange, handleSubmit };
};
