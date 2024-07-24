import defaultPlanet from '@/assets/default-planet.jpg';
import { Planet } from '@/models';
import { extractIdFromUrl, urlImgTemplates } from '@/utils';
import s from './DetailsPlanet.module.scss';

interface DetailsPlanetProps {
  planet: Planet;
}

export const DetailsPlanet = ({ planet }: DetailsPlanetProps) => {
  const planetImgSrc = urlImgTemplates.planet(extractIdFromUrl(planet.url));
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
          <img className={s.planetImg} src={planetImgSrc} alt="Character" onError={e => handleImgSrcError(e)} />
        </div>
      </div>
    </div>
  );
};
