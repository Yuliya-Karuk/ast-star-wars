/* eslint-disable react-refresh/only-export-components */
import { useGetFilmsQuery } from '@store/api/swapiApi';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { PaginatedFilms } from '../models';
import { useToast } from './toastProvider';

type FilmsProviderProps = {
  children?: ReactNode;
};

export interface FilmsContextValue {
  films: PaginatedFilms | undefined;
}

const initialFilms: FilmsContextValue = {
  films: undefined,
};

export const FilmsContext = createContext<FilmsContextValue>(initialFilms);

export const FilmsProvider = ({ children }: FilmsProviderProps) => {
  const { data: films, error: filmsError } = useGetFilmsQuery();
  const { errorNotify } = useToast();

  useEffect(() => {
    if (filmsError) {
      errorNotify(`Error fetching characters: ${filmsError}`);
    }
  }, [filmsError, errorNotify]);

  return <FilmsContext.Provider value={{ films }}>{children}</FilmsContext.Provider>;
};

export const useFilms = () => {
  const context = useContext(FilmsContext);

  if (context === undefined) {
    throw new Error('useFilms hook must be used within a FilmsProvider');
  }

  return context;
};
