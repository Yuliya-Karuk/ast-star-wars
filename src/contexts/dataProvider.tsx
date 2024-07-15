/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PaginatedFilms } from '../models';
import { api } from '../services/api';

type FilmsProviderProps = {
  children?: ReactNode;
};

export interface FilmsContextValue {
  films: PaginatedFilms | null;
}

const initialFilms: FilmsContextValue = {
  films: null,
};

export const FilmsContext = createContext<FilmsContextValue>(initialFilms);

export const FilmsProvider = ({ children }: FilmsProviderProps) => {
  const [films, setFilms] = useState<PaginatedFilms | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmsResponse = await api.getAllFilms();
        setFilms(filmsResponse);
      } catch (error) {
        console.error('Error fetching Films:', error);
      }
    };

    fetchFilms();
  }, []);

  return <FilmsContext.Provider value={{ films }}>{children}</FilmsContext.Provider>;
};

export const useFilms = () => {
  const context = useContext(FilmsContext);

  if (context === undefined) {
    throw new Error('useFilms hook must be used within a FilmsProvider');
  }

  return context;
};
