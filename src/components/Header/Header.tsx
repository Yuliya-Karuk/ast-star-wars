import logo from '@/assets/logo.png';
import { Navigation } from '@/components/Navigation/Navigation';
import { Search } from '@/components/Search/Search';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { AppRoutes } from '@/router/routes';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

export const Header = () => (
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
