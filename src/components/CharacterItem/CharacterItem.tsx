import HeartIcon from '@assets/heart.svg?react';
import { useAppDispatch } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { AppRoutes } from '@router/routes';
import { toggleFavoriteInFirebase } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { selectUseIsLoggedIn } from '@store/selectors';
import { extractIdFromUrl } from '@utils/index';
import classnames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: CharacterWithFavorite;
}

export const CharacterItem = ({ character }: CharacterItemProps) => {
  const characterId = extractIdFromUrl(character.url);
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
  const isLoggedIn = useSelector((state: RootState) => selectUseIsLoggedIn(state));
  const navigate = useNavigate();

  const [showHeart, setShowHeart] = useState(false);

  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  const handleToggleFavorite = () => {
    handleFavoriteClick();
    dispatch(toggleFavoriteInFirebase({ id: characterId }));
  };

  const handleItemClick = () => {
    navigate(`${AppRoutes.HOME_ROUTE}people/${characterId}`);
  };

  return (
    <li
      className={styles.characterItem}
      role="button"
      tabIndex={0}
      onClick={handleItemClick}
      onKeyUp={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleItemClick();
        }
      }}
    >
      <div className={styles.characterImgContainer}>
        <img className={styles.characterImg} src={imageUrl} alt="Character" />
      </div>
      <p className={styles.characterName}>{character.name}</p>
      <div className={styles.characterFeatureBlock}>
        <p className={styles.featureTitle}>Gender</p>
        <div className={styles.genderIcon}>
          <span className={classnames(styles.male, { [styles.female]: character.gender === 'female' })} />
        </div>
      </div>
      <div className={styles.characterFeatureBlock}>
        <p className={styles.featureTitle}>Date of Birth</p>
        <p className={styles.featureValue}>{character.birth_year}</p>
      </div>
      {isLoggedIn && (
        <button type="button" className={styles.addToFavoriteButton} onClick={handleToggleFavorite}>
          <HeartIcon className={classnames(styles.heart, { [styles.favorite]: character.isFavorite })} />
          {showHeart && <HeartIcon className={styles.heartAnimation} />}
        </button>
      )}
    </li>
  );
};
