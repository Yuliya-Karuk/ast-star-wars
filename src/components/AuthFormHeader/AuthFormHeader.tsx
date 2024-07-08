import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './AuthFormHeader.module.scss';

interface AuthFormHeaderProps {
  titleText: string;
  linkDescription: string;
  linkText: string;
  linkTo: string;
}

export function AuthFormHeader({ titleText, linkDescription, linkText, linkTo }: AuthFormHeaderProps) {
  return (
    <>
      <h1 className={styles.title}>{titleText}</h1>
      <div className={styles.links}>
        <div className={styles.linkWrapper}>
          <p className={styles.subtitle}>{linkDescription}</p>
          <Link to={linkTo} className={styles.link}>
            {linkText}
          </Link>
        </div>
      </div>
    </>
  );
}

AuthFormHeader.propTypes = {
  titleText: PropTypes.string.isRequired,
  linkDescription: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};
