import { Film } from '@models/index';
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
            <img
              className={s.filmImg}
              src={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
              alt="Character"
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);
