import { useAuthContext } from '../../features/Auth/AuthContext';

import styles from './Footer.module.css';

export function Footer() {
  const { user } = useAuthContext();

  return (
    <>
      {user && (
        <>
          <div className={styles['footer']}>
            <p className={styles['footer-text']}>
              &copy; 2022 Gym Admin | All rights reserved
            </p>
          </div>
        </>
      )}
    </>
  );
}
