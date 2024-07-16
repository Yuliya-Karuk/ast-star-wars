import { getPaginationRange } from '@utils/index';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';

const maxShownPages = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('page', String(newPage));
    setSearchParams(currentParams);
  };

  return (
    <nav className={styles.paginationNav} aria-label="Page navigation">
      {totalPages > 1 && (
        <ul className={styles.pagination}>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.first]: true })}
              onClick={() => handlePageChange(1)}
              aria-label="First"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.previous]: true })}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          {paginationRange.map(el => (
            <li key={el}>
              <button
                type="button"
                className={classnames(styles.pgnButton, { [styles.active]: el === currentPage })}
                onClick={() => handlePageChange(el)}
              >
                {el}
              </button>
            </li>
          ))}
          {totalPages > maxShownPages && paginationRange.length === 5 && (
            <li>
              <button type="button" className={classnames(styles.pgnButton, { [styles.empty]: true })} disabled>
                ...
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.next]: true })}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.last]: true })}
              onClick={() => handlePageChange(totalPages)}
              aria-label="Last"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span aria-hidden="true" />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
