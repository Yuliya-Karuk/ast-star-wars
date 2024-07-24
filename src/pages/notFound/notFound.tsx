import notFoundImage from '@/assets/404.png';
import { AppRoutes } from '@/router/routes';
import { Link } from 'react-router-dom';
import s from './notFound.module.scss';

export function NotFound() {
  return (
    <div className={s.notFound}>
      <div className={s.container}>
        <img className={s.notFoundImage} src={notFoundImage} alt="Icon Not Found" />
        <Link className={s.notFoundLink} to={AppRoutes.HOME_ROUTE}>
          Back to Home page
        </Link>
      </div>
    </div>
  );
}
