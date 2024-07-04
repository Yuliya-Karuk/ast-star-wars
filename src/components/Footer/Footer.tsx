import classnames from 'classnames';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerCopyright}>
          <span className={styles.footerText}>© 2024 Data sourced from the</span>
          <a className={classnames(styles.footerText, { [styles.api]: true })} href="https://swapi.dev/">
            SWAPI API
          </a>
        </div>
        <a className={styles.footerGithubLink} href="https://github.com/Yuliya-Karuk" aria-label="link to github">
          <span className={styles.footerGithub} />
        </a>
      </div>
    </footer>
  );
};
