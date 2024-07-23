import { useAuth } from '@contexts/authProvider';
import { useBurgerMenu } from '@hooks/useBurgerMenu';
import { AppRoutes } from '@router/routes';
import { selectUseIsLoggedIn } from '@store/selectors';
import { SuccessSignOut } from '@utils/index';
import cn from 'classnames';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import s from './Navigation.module.scss';

const paths: string[] = [AppRoutes.LOGIN_ROUTE, AppRoutes.REGISTRATION_ROUTE];
const authPaths: string[] = [AppRoutes.FAVORITES_ROUTE, AppRoutes.HISTORY_ROUTE];

export const Navigation = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { isMenuOpen, handleMenuToggle } = useBurgerMenu(menuRef);
  const { logout } = useAuth();
  const isLoggedIn = useSelector(selectUseIsLoggedIn);

  const handleLogout = async () => {
    handleMenuToggle();
    const result = await logout();
    if (result) {
      toast.success(SuccessSignOut);
    }
  };

  return (
    <>
      <div
        className={cn(s.burger, { [s.active]: isMenuOpen })}
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
      <nav className={cn(s.menu, { [s.active]: isMenuOpen })} ref={menuRef}>
        {isLoggedIn === false && (
          <ul className={s.menuList}>
            {paths.map(path => (
              <li key={path}>
                <Link to={path} onClick={handleMenuToggle} className={s.menuItem}>
                  {path.slice(1)[0].toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isLoggedIn === true && (
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
