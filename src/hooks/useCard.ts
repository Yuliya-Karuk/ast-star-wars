import { CharacterWithFavorite, Film } from '@models/index';
import { useGetCharacterByIdQuery, useGetPlanetQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { selectFavorites, selectFilms } from '@store/selectors';
import { extractPlanetPath, isNotNullable, markFavorites } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from './storeHooks';
import { useHandleFavorites } from './useHandleFavorite';

export const useCard = (callback: () => void) => {
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [preparedCharacter, setPreparedCharacter] = useState<CharacterWithFavorite | null>(null);
  const films = useSelector(selectFilms);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [homeworld, setHomeworld] = useState<string | null>(null);
  const { id } = useParams();

  const { data: character } = useGetCharacterByIdQuery(+isNotNullable(id) || 0);
  const { data: planet } = useGetPlanetQuery(homeworld || '', { skip: !homeworld });

  const { isLoggedIn, handleToggleFavorite } = useHandleFavorites(callback, id);

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const getData = async () => {
      if (character && id && films) {
        setHomeworld(extractPlanetPath(character.homeworld));
        setFilteredFilms(films.filter(film => character.films.includes(film.url)));

        if (isLoggedIn && favorites) {
          const preparedItem = markFavorites([character], favorites);
          setPreparedCharacter(preparedItem[0]);
        } else if (!isLoggedIn) {
          const preparedItem = markFavorites([character], []);
          setPreparedCharacter(preparedItem[0]);
        }
      }
    };

    getData();
  }, [character, favorites, films, id, isLoggedIn]);

  return { preparedCharacter, filteredFilms, planet, isLoggedIn, handleToggleFavorite };
};
