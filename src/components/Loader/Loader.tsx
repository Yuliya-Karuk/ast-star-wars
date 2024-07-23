import loader from '@assets/loader.gif';
import { useTheme } from '@contexts/themeProvider';
import cn from 'classnames';
import s from './Loader.module.scss';

export const Loader = () => {
  const { theme } = useTheme();

  return (
    <div className={cn(s.page, { [s.light]: theme === 'light' })} data-testid="loader">
      <div className={s.loaderContainer}>
        <img className={s.loader} src={loader} alt="Loader" />
      </div>
    </div>
  );
};
