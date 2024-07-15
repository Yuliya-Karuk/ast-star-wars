import HeartIcon from '@assets/heart.svg?react';
import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { Loader } from '@components/index';
import { useAuth } from '@contexts/authProvider';
import { useFilms } from '@contexts/dataProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { CharacterWithFavorite, Film, Planet } from '@models/index';
import { AppRoutes } from '@router/routes';
import { fetchFavorites, toggleFavoriteInFirebase } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { markFavorites } from '@utils/utils';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from 'src/services';
import s from './card.module.scss';

export const Card = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [preparedCharacter, setPreparedCharacter] = useState<CharacterWithFavorite | null>(null);
  const { films } = useFilms();
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFavorites());
      setIsLoading(false);
    };

    if (isLoading) {
      fetchData();
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    const getData = async () => {
      if (id && films) {
        setIsLoading(true);
        const response = await api.getCharacterById(+id);
        const preparedItem = markFavorites([response], favorites);
        setPreparedCharacter(preparedItem[0]);
        setIsFavorite(preparedItem[0].isFavorite);

        setFilteredFilms(films.results.filter(film => response.films.includes(film.url)));
        setIsLoading(false);
      }
    };

    getData();
  }, [films]);

  useEffect(() => {
    const getPlanet = async () => {
      if (preparedCharacter) {
        const planetResponse = await api.getPlanet(preparedCharacter.homeworld);
        setPlanet(planetResponse);
      }
    };

    getPlanet();
  }, [preparedCharacter]);

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

  if (isLoading) {
    return (
      <div className={s.page}>
        <Loader />
      </div>
    );
  }

  return (
    preparedCharacter && (
      <div className={s.page}>
        <main className={s.details}>
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
            <HeartIcon className={classnames(s.heart, { [s.favorite]: isLoggedIn && isFavorite })} />
            {showHeart && <HeartIcon className={s.heartAnimation} />}
          </button>
        </main>
      </div>
    )
  );
};
