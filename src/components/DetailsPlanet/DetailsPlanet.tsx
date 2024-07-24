import defaultPlanet from '@assets/default-planet.jpg';
import { Planet } from '@models/index';
import { extractIdFromUrl } from '@utils/index';
import s from './DetailsPlanet.module.scss';

interface DetailsPlanetProps {
  planet: Planet;
}

export const DetailsPlanet = ({ planet }: DetailsPlanetProps) => {
  const handleImgSrcError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultPlanet;
  };

  return (
    <div className={s.characterFeatureBlock}>
      <h4 className={s.blockTitle}>Home planet</h4>
      <div className={s.characterFeatureBlock}>
        <h5 className={s.featureTitle}>{planet.name}</h5>
        <div className={s.planetImgContainer}>
          <img
            className={s.planetImg}
            src={`https://starwars-visualguide.com/assets/img/planets/${extractIdFromUrl(planet.url)}.jpg`}
            alt="Character"
            onError={e => handleImgSrcError(e)}
          />
        </div>
      </div>
    </div>
  );
};
