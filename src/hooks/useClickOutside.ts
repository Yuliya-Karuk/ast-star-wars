import { useEffect } from 'react';

export const useClickOutside = (ref: React.MutableRefObject<HTMLDivElement | null>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (ref.current && !ref.current.contains(target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
