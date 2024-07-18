import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './AuthFormHeader.module.scss';

interface AuthFormHeaderProps {
  titleText: string;
  linkDescription: string;
  linkText: string;
  linkTo: string;
}

export function AuthFormHeader({ titleText, linkDescription, linkText, linkTo }: AuthFormHeaderProps) {
  return (
    <>
      <h1 className={s.title}>{titleText}</h1>
      <div className={s.links}>
        <div className={s.linkWrapper}>
          <p className={s.subtitle}>{linkDescription}</p>
          <Link to={linkTo} className={s.link}>
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
