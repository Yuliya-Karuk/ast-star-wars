import loader from '@assets/loader.gif';
import s from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <img className={s.loader} src={loader} alt="Loader" />
    </div>
  );
};
