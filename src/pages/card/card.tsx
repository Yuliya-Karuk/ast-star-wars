import HeartIcon from '@assets/heart.svg?react';
import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { Loader } from '@components/index';
import { useFilms } from '@contexts/dataProvider';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { CharacterWithFavorite, Film } from '@models/index';
import { AppRoutes } from '@router/routes';
import { useGetCharacterByIdQuery, useGetPlanetQuery } from '@store/api/swapiApi';
import { fetchFavorites, toggleFavoriteInFirebase } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { selectUseIsLoggedIn } from '@store/selectors';
import { extractPlanetPath, isNotNullable, markFavorites } from '@utils/utils';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import s from './card.module.scss';

export const Card = () => {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [preparedCharacter, setPreparedCharacter] = useState<CharacterWithFavorite | null>(null);
  const { films } = useFilms();
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [homeworld, setHomeworld] = useState<string | null>(null);
  const { id } = useParams();
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const navigate = useNavigate();
  const {
    data: character,
    error: characterError,
    isLoading: characterLoading,
  } = useGetCharacterByIdQuery(+isNotNullable(id) || 0);
  const {
    data: planet,
    error: planetError,
    isLoading: planetLoading,
  } = useGetPlanetQuery(homeworld || '', { skip: !homeworld });
  const { errorNotify } = useToast();

  useEffect(() => {
    if (characterError || planetError) {
      errorNotify(`Error fetching data: ${characterError}`);
    }
  }, [characterError, planetError, errorNotify]);

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
        setFilteredFilms(films.results.filter(film => character.films.includes(film.url)));
      }
    };

    getData();
  }, [character, favorites, films, id]);

  const [showHeart, setShowHeart] = useState(false);
  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  const handleToggleFavorite = () => {
    if (isLoggedIn && id) {
      handleFavoriteClick();
      setIsFavorite(!isFavorite);
      dispatch(toggleFavoriteInFirebase({ id }));
    } else {
      navigate(AppRoutes.LOGIN_ROUTE);
    }
  };

  if (characterLoading || planetLoading || !preparedCharacter) {
    return (
      <div className={s.page}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <main className={s.details}>
        {preparedCharacter && (
          <>
            <div className={s.characterImgContainer}>
              <img
                className={s.characterImg}
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                alt="Character"
              />
            </div>
            <h1 className={s.characterTitle}>{preparedCharacter.name}</h1>
            <DetailsInfo character={preparedCharacter} />
            {planet && <DetailsPlanet planet={planet} />}
            {filteredFilms && <DetailsFilms filteredFilms={filteredFilms} />}
            <button type="button" className={s.addToFavoriteButton} onClick={handleToggleFavorite}>
              <HeartIcon className={cn(s.heart, { [s.favorite]: isLoggedIn && isFavorite })} />
              {showHeart && <HeartIcon className={s.heartAnimation} />}
            </button>
          </>
        )}
      </main>
    </div>
  );
};
