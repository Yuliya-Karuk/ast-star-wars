import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useClickOutside } from './useClickOutside';

export const useBurgerMenu = (menuRef: React.RefObject<HTMLDivElement>) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

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

  return { isMenuOpen, handleMenuToggle };
};
