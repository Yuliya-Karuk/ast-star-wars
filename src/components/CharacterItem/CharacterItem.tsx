import HeartIcon from '@assets/heart.svg?react';
import { useAuth } from '@contexts/authProvider';
import { useAppDispatch } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { toggleFavoriteInFirebase } from '@store/favoritesSlice';
import { extractIdFromUrl } from '@utils/index';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: CharacterWithFavorite;
}

export const CharacterItem = ({ character }: CharacterItemProps) => {
  const characterId = extractIdFromUrl(character.url);
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
  const { isLoggedIn } = useAuth();

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

  return (
    <li className={styles.characterItem}>
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
