import { useTheme } from '@contexts/themeProvider';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  const onToggle = () => {
    toggleTheme();
  };

  return (
    <div className={styles.switcher}>
      <label className={styles.switcherLabel} htmlFor="theme-switcher">
        <input
          type="checkbox"
          id="theme-switcher"
          className={styles.switcherInput}
          onChange={onToggle}
          aria-labelledby="theme-switcher"
        />
        <span className={styles.switcherRound} />
      </label>
    </div>
  );
};
