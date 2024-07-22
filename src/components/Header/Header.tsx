import logo from '@assets/logo.png';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher';
import { AppRoutes } from '@router/routes';
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { Search } from '../Search/Search';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <Navigation />
        <Link
          to={AppRoutes.HOME_ROUTE}
          className={s.logoLink}
          onClick={() => {
            document.body.classList.remove('lock');
          }}
        >
          <img className={s.logo} src={logo} alt="Logo" />
        </Link>
        <Search />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
