import HeartIcon from '@assets/heart.svg?react';
import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { Loader } from '@components/index';
import { useCard } from '@hooks/useCard';
import cn from 'classnames';
import { useState } from 'react';
import s from './card.module.scss';

export const Card = () => {
  const [showHeart, setShowHeart] = useState(false);

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  const { preparedCharacter, filteredFilms, planet, isLoggedIn, isFavorite, handleToggleFavorite } =
    useCard(handleFavoriteClick);

  if (filteredFilms.length === 0 || !planet || !preparedCharacter) {
    return <Loader />;
  }

  return (
    <main className={s.details}>
      {preparedCharacter && (
        <>
          <div className={s.characterImgContainer}>
            <img
              className={s.characterImg}
              src={`https://starwars-visualguide.com/assets/img/characters/${preparedCharacter.id}.jpg`}
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
  );
};
