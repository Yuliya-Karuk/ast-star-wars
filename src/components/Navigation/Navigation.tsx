import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useClickOutside } from '@hooks/useClickOutside';
import { AppRoutes } from '@router/routes';
import { SuccessSignOut } from '@utils/index';
import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import s from './Navigation.module.scss';

const paths: string[] = [AppRoutes.LOGIN_ROUTE, AppRoutes.REGISTRATION_ROUTE];
const authPaths: string[] = [AppRoutes.FAVORITES_ROUTE];

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
  const menuRef = useRef(null);
  const { successNotify, errorNotify } = useToast();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        successNotify(SuccessSignOut);
      })
      .catch(error => {
        errorNotify((error as Error).message);
      });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
    document.body.classList.toggle('lock', !isMenuOpen);
  };

  const onClickOutside = () => {
    if (!isDesktop && isMenuOpen) {
      handleMenuToggle();
    }
  };

  useClickOutside(menuRef, onClickOutside);

  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
      document.body.classList.remove('lock');
    }
  }, [isDesktop, isMenuOpen]);

  return (
    <>
      <div
        className={classnames(s.burger, { [s.active]: isMenuOpen })}
        role="button"
        aria-expanded={isMenuOpen}
        aria-label={`${isMenuOpen ? 'Close' : 'Open'} menu`}
        tabIndex={0}
        onClick={e => {
          e.stopPropagation();
          handleMenuToggle();
        }}
      >
        <span />
      </div>
      <nav className={classnames(s.menu, { [s.active]: isMenuOpen })} ref={menuRef}>
        {!isLoggedIn ? (
          <ul className={s.menuList}>
            {paths.map(path => (
              <li key={path}>
                <Link to={path} onClick={handleMenuToggle} className={s.menuItem}>
                  {path.slice(1)[0].toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={s.menuList}>
            {authPaths.map(path => (
              <li key={path}>
                <Link to={path} onClick={handleMenuToggle} className={s.menuItem}>
                  {path.slice(1)[0].toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
            <li>
              <button type="button" className={s.menuItem} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};
