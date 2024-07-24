import HeartIcon from '@/assets/heart.svg?react';
import { DetailsFilms, DetailsInfo, DetailsPlanet, Loader } from '@/components';
import { useCard } from '@/hooks';
import { urlImgTemplates } from '@/utils';
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

  const { preparedCharacter, filteredFilms, planet, isLoggedIn, handleToggleFavorite } = useCard(handleFavoriteClick);

  if (filteredFilms.length === 0 || !planet || !preparedCharacter) {
    return <Loader />;
  }

  return (
    <main className={s.details}>
      {preparedCharacter && (
        <>
          <div className={s.characterImgContainer}>
            <img className={s.characterImg} src={urlImgTemplates.character(preparedCharacter.id)} alt="Character" />
          </div>
          <h1 className={s.characterTitle}>{preparedCharacter.name}</h1>
          <DetailsInfo character={preparedCharacter} />
          {planet && <DetailsPlanet planet={planet} />}
          {filteredFilms && <DetailsFilms filteredFilms={filteredFilms} />}
          <button type="button" className={s.addToFavoriteButton} onClick={handleToggleFavorite}>
            <HeartIcon className={cn(s.heart, { [s.favorite]: isLoggedIn && preparedCharacter.isFavorite })} />
            {showHeart && <HeartIcon className={s.heartAnimation} />}
          </button>
        </>
      )}
    </main>
  );
};
