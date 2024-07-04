import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AppRoutes } from '../../router/routes';
import { Navigation } from '../Navigation/Navigation';
import { Search } from '../Search/Search';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Navigation />
        <Link
          to={AppRoutes.HOME_ROUTE}
          className={styles.logoLink}
          onClick={() => {
            document.body.classList.remove('lock');
          }}
        >
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>
        <Search />
      </div>
    </header>
  );
};
