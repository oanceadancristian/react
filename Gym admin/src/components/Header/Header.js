import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/AuthContext';

import styles from './Header.module.css';

export function Header() {
  const { user, logout } = useAuthContext();

  const { pathname } = useLocation();
  const isCustomers = pathname === '/customers';

  return (
    <div className={styles['navigation']}>
      {user && (
        <>
          {!isCustomers && (
            <Link to="/customers" className={styles['primary-link']}>
              Customers
            </Link>
          )}
          <ul>
            <li>
              <label htmlFor="menu">
                Welcome, {user.firstName}{' '}
                <FontAwesomeIcon
                  icon={solid('caret-down')}
                  className={styles['caret-down-icon']}
                />
              </label>
              <input type="checkbox" id="menu" className={styles['menu']} />
              <ul className={styles['dropdown']}>
                <li>
                  <Link
                    to={`/admins/edit/${user.id}`}
                    className={styles['secondary-link']}
                  >
                    <FontAwesomeIcon
                      icon={solid('gear')}
                      className={styles['gear-icon']}
                    />{' '}
                    Edit profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className={styles['secondary-link']}
                    onClick={(e) => {
                      logout();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={solid('right-from-bracket')}
                      className={styles['right-from-bracket-icon']}
                    />{' '}
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
