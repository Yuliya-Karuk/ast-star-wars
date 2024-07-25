import { useGetCharacterByIdQuery, useGetFilmsQuery, useGetPlanetQuery } from '@/store/api/swapiApi';
import { extractPlanetPath, isNotNullable, markFavorites } from '@/utils';
import { fetchFavorites } from '@store/favoritesSlice';
import { selectFavorites, selectFilms } from '@store/selectors';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from './storeHooks';
import { useHandleFavorites } from './useHandleFavorite';

export const useCard = (callback: () => void) => {
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const films = useSelector(selectFilms);
  const { id } = useParams();

  const { data: character } = useGetCharacterByIdQuery(+isNotNullable(id) || 0);

  const planetPath = useMemo(() => (character ? extractPlanetPath(character.homeworld) : ''), [character]);
  const { data: planet } = useGetPlanetQuery(planetPath, { skip: !character });
  useGetFilmsQuery();

  const { isLoggedIn, handleToggleFavorite } = useHandleFavorites(callback, id);

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  const { preparedCharacter, filteredFilms } = useMemo(() => {
    if (character && films) {
      const preparedItem = markFavorites([character], isLoggedIn && favorites ? favorites : [])[0];
      const preparedFilms = films.filter(film => character.films.includes(film.url));
      return { preparedCharacter: preparedItem, filteredFilms: preparedFilms };
    }
    return { preparedCharacter: null, filteredFilms: [] };
  }, [character, favorites, films, isLoggedIn]);

  return { preparedCharacter, filteredFilms, planet, isLoggedIn, handleToggleFavorite };
};
