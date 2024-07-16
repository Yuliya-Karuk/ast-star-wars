import { Character } from '@models/index';
import classnames from 'classnames';
import styles from './DetailsInfo.module.scss';

interface DetailsInfoProps {
  character: Character;
}

export const DetailsInfo = ({ character }: DetailsInfoProps) => (
  <div className={styles.detailsInfo}>
    <h4 className={styles.blockTitle}>Info</h4>
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
    <div className={styles.characterFeatureBlock}>
      <p className={styles.featureTitle}>Weight</p>
      <p className={styles.featureValue}>{character.mass}</p>
    </div>
    <div className={styles.characterFeatureBlock}>
      <p className={styles.featureTitle}>Height</p>
      <p className={styles.featureValue}>{character.height}</p>
    </div>
  </div>
);
