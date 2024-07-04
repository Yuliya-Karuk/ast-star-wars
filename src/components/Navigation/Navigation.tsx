import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';
import { AppRoutes } from '../../router/routes';
import styles from './Navigation.module.scss';

const paths: string[] = [AppRoutes.LOGIN_ROUTE, AppRoutes.REGISTRATION_ROUTE];

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
  const menuRef = useRef(null);

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
        className={classnames(styles.burger, { [styles.active]: isMenuOpen })}
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
      <nav className={classnames(styles.menu, { [styles.active]: isMenuOpen })} ref={menuRef}>
        <ul className={styles.menuList}>
          {paths.map(path => (
            <li key={path} className={styles.menuItem}>
              <Link to={path} onClick={handleMenuToggle}>
                {path.slice(1)[0].toUpperCase() + path.slice(2)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
