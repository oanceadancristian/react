import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.css';

export function Pagination({
  customersPerAge,
  totalCustomers,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  const lastPage = Math.ceil(totalCustomers / customersPerAge);

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i <= 0) {
      continue;
    }

    if (i > lastPage) {
      break;
    }
    pageNumbers.push(i);
  }

  const goToFirstPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    paginate(1);
  };

  const goToPreviousPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage === 1) {
      paginate(1);
    } else {
      paginate(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage === lastPage) {
      paginate(currentPage);
    } else {
      paginate(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    paginate(lastPage);
  };

  return (
    <div className={styles['pagination-container']}>
      <Link
        to=""
        className={
          currentPage === 1 ? styles['page-link-inactive'] : styles['page-link']
        }
        onClick={() => goToFirstPage()}
      >
        <FontAwesomeIcon
          icon={solid('angles-left')}
          className={styles['angles-left-icon']}
        />
      </Link>
      <Link
        to=""
        className={
          currentPage === 1 ? styles['page-link-inactive'] : styles['page-link']
        }
        onClick={() => goToPreviousPage()}
      >
        <FontAwesomeIcon
          icon={solid('angle-left')}
          className={styles['angle-left-icon']}
        />
      </Link>
      {pageNumbers.map((pageNumber) => (
        <Link
          to=""
          key={pageNumber}
          className={
            currentPage === pageNumber
              ? styles['page-link-active']
              : styles['page-link']
          }
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            paginate(pageNumber);
          }}
        >
          {pageNumber}
        </Link>
      ))}
      <Link
        to=""
        className={
          currentPage === lastPage
            ? styles['page-link-inactive']
            : styles['page-link']
        }
        onClick={() => goToNextPage()}
      >
        <FontAwesomeIcon
          icon={solid('angle-right')}
          className={styles['angle-right-icon']}
        />
      </Link>
      <Link
        to=""
        className={
          currentPage === lastPage
            ? styles['page-link-inactive']
            : styles['page-link']
        }
        onClick={() => goToLastPage()}
      >
        <FontAwesomeIcon
          icon={solid('angles-right')}
          className={styles['angles-right-icon']}
        />
      </Link>
    </div>
  );
}
