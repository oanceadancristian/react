import { useLocation } from 'react-router-dom';

import styles from './NotFound.module.css';

export function NotFound() {
  const { pathname } = useLocation();

  function setNotFound() {
    if (pathname.includes('login')) {
      return (
        <>
          <h1 className={styles['title']}>
            Sorry, this page could not be found!
          </h1>
          <p className={styles['message']}>
            Go back{' '}
            <a href="/login" className={styles['message-link']}>
              home
            </a>
            !
          </p>
        </>
      );
    } else if (pathname.includes('register')) {
      return (
        <>
          <h1 className={styles['title']}>
            Sorry, this page could not be found!
          </h1>
          <p className={styles['message']}>
            Go back{' '}
            <a href="/register" className={styles['message-link']}>
              home
            </a>
            !
          </p>
        </>
      );
    } else {
      return (
        <>
          <h1 className={styles['title']}>
            Sorry, this page could not be found!
          </h1>
          <p className={styles['message']}>
            Go back{' '}
            <a href="/" className={styles['message-link']}>
              home
            </a>
            !
          </p>
        </>
      );
    }
  }

  return (
    <div className={styles['not-found-title-and-message']}>{setNotFound()}</div>
  );
}
