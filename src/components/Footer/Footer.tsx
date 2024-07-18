import cn from 'classnames';
import s from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContainer}>
        <div className={s.footerCopyright}>
          <span className={s.footerText}>© 2024 Data sourced from the</span>
          <a className={cn(s.footerText, { [s.api]: true })} href="https://swapi.dev/">
            SWAPI API
          </a>
        </div>
        <a className={s.footerGithubLink} href="https://github.com/Yuliya-Karuk" aria-label="link to github">
          <span className={s.footerGithub} />
        </a>
      </div>
    </footer>
  );
};
