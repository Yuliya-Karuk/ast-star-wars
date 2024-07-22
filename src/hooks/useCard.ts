import { CharacterWithFavorite, Film } from '@models/index';
import { AppRoutes } from '@router/routes';
import { useGetCharacterByIdQuery, useGetPlanetQuery } from '@store/api/swapiApi';
import { fetchFavorites, toggleFavoriteInFirebase } from '@store/favoritesSlice';
import { selectFavorites, selectFilms, selectUseIsLoggedIn } from '@store/selectors';
import { extractPlanetPath, isNotNullable, markFavorites } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from './storeHooks';

export const useCard = (callback: () => void) => {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [preparedCharacter, setPreparedCharacter] = useState<CharacterWithFavorite | null>(null);
  const films = useSelector(selectFilms);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [homeworld, setHomeworld] = useState<string | null>(null);
  const { id } = useParams();
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const navigate = useNavigate();
  const { data: character } = useGetCharacterByIdQuery(+isNotNullable(id) || 0);
  const { data: planet } = useGetPlanetQuery(homeworld || '', { skip: !homeworld });

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
      if (character && favorites && id && films) {
        const preparedItem = markFavorites([character], favorites);
        setPreparedCharacter(preparedItem[0]);
        setIsFavorite(preparedItem[0].isFavorite);
        setHomeworld(extractPlanetPath(preparedItem[0].homeworld));
        setFilteredFilms(films.filter(film => character.films.includes(film.url)));
      }
    };

    getData();
  }, [character, favorites, films, id]);

  const handleToggleFavorite = () => {
    if (isLoggedIn && id) {
      callback();
      setIsFavorite(!isFavorite);
      dispatch(toggleFavoriteInFirebase({ id }));
    } else {
      navigate(AppRoutes.LOGIN_ROUTE);
    }
  };

  return { preparedCharacter, filteredFilms, planet, isLoggedIn, isFavorite, handleToggleFavorite };
};
