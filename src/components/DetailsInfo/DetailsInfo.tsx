import { Character } from '@/models';
import cn from 'classnames';
import s from './DetailsInfo.module.scss';

interface DetailsInfoProps {
  character: Character;
}

export const DetailsInfo = ({ character }: DetailsInfoProps) => (
  <div className={s.detailsInfo}>
    <h4 className={s.blockTitle}>Info</h4>
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
    <div className={s.characterFeatureBlock}>
      <p className={s.featureTitle}>Weight</p>
      <p className={s.featureValue}>{character.mass}</p>
    </div>
    <div className={s.characterFeatureBlock}>
      <p className={s.featureTitle}>Height</p>
      <p className={s.featureValue}>{character.height}</p>
    </div>
  </div>
);
