import { useEffect } from 'react';

export const useClickOutside = (ref: React.MutableRefObject<HTMLDivElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};
