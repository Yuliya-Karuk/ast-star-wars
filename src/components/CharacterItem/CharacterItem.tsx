import { Character } from '@models/index';
import { extractIdFromUrl } from '@utils/index';
import classnames from 'classnames';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: Character;
}

export const CharacterItem = ({ character }: CharacterItemProps) => {
  const characterId = extractIdFromUrl(character.url);
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

  return (
    <li className={styles.characterItem}>
      <div className={styles.characterImgContainer}>
        <img className={styles.characterImg} src={imageUrl} alt="Character" />
      </div>
      <p>{character.name}</p>
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
    </li>
  );
};
