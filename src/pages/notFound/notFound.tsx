import notFoundImage from '@assets/404.png';
import { AppRoutes } from '@router/routes';
import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <img className={styles.notFoundImage} src={notFoundImage} alt="Icon Not Found" />
        <Link className={styles.notFoundLink} to={AppRoutes.HOME_ROUTE}>
          Back to Home page
        </Link>
      </div>
    </div>
  );
}
