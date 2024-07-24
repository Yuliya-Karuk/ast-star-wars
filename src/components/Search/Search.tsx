import { SuggestionList } from '@/components/SuggestionList/SuggestionList';
import { useSearchForm } from '@/hooks';
import { useRef, useState } from 'react';
import s from './Search.module.scss';

export const Search = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { suggestions, searchValue, handleInputChange, handleSubmit } = useSearchForm(inputRef);

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
