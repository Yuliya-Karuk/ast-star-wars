import { Film } from '@/models';
import { extractIdFromUrl, urlImgTemplates } from '@/utils';
import s from './DetailsFilms.module.scss';

interface DetailsFilmsProps {
  filteredFilms: Film[];
}

export const DetailsFilms = ({ filteredFilms }: DetailsFilmsProps) => (
  <div className={s.detailsFilms}>
    <h4 className={s.blockTitle}>Films</h4>
    <ul className={s.films}>
      {filteredFilms.map(film => (
        <li key={film.episode_id} className={s.filmItem}>
          <h5 className={s.featureTitle}>{film.title}</h5>
          <div className={s.filmImgContainer}>
            <img className={s.filmImg} src={urlImgTemplates.film(extractIdFromUrl(film.url))} alt="Character" />
          </div>
        </li>
      ))}
    </ul>
  </div>
);
