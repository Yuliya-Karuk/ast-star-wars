import HeartIcon from '@assets/heart.svg?react';
import { useAppDispatch } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { AppRoutes } from '@router/routes';
import { toggleFavoriteInFirebase } from '@store/favoritesSlice';
import { selectUseIsLoggedIn } from '@store/selectors';
import cn from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: CharacterWithFavorite;
}

export const CharacterItem = ({ character }: CharacterItemProps) => {
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`;
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const navigate = useNavigate();

  const [showHeart, setShowHeart] = useState(false);

  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleFavoriteClick();
    dispatch(toggleFavoriteInFirebase({ id: character.id }));
  };

  const handleItemClick = () => {
    navigate(`${AppRoutes.HOME_ROUTE}people/${character.id}`);
  };

  return (
    <li
      className={s.characterItem}
      role="button"
      tabIndex={0}
      onClick={handleItemClick}
      onKeyUp={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleItemClick();
        }
      }}
    >
      <div className={s.characterImgContainer}>
        <img className={s.characterImg} src={imageUrl} alt="Character" />
      </div>
      <p className={s.characterName}>{character.name}</p>
      <div className={s.characterFeatureBlock}>
        <p className={s.featureTitle}>Gender</p>
        <div className={s.genderIcon}>
          <span className={cn(s.male, { [s.female]: character.gender === 'female' })} />
        </div>
      </div>
      <div className={s.characterFeatureBlock}>
        <p className={s.featureTitle}>Date of Birth</p>
        <p className={s.featureValue}>{character.birth_year}</p>
      </div>
      {isLoggedIn && (
        <button type="button" className={s.addToFavoriteButton} onClick={handleToggleFavorite}>
          <HeartIcon className={cn(s.heart, { [s.favorite]: character.isFavorite })} />
          {showHeart && <HeartIcon className={s.heartAnimation} />}
        </button>
      )}
    </li>
  );
};
