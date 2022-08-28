import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../features/Auth/AuthContext';
import { Header } from '../../components/Header/Header';
import { CustomerLine } from './CustomerLine';
import { Pagination } from '../../components/Pagination/Pagination';
import { Footer } from '../../components/Footer/Footer';

import styles from './CustomerList.module.css';

export function CustomerList() {
  const navigate = useNavigate();

  const { user, logout } = useAuthContext();

  const [searchCustomer, setSearchCustomer] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [hasServerError, setHasServerError] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/api/customers`)
      .then((res) => {
        if (res.status === 401) {
          setMessage('Session timed out! Please login again!');
          logout();
          navigate('/login');
        } else if (res.status === 404) {
          navigate('*');
        }
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setIsLoading(false);
      })
      .catch((err) => setHasServerError(err));
  }, [navigate, logout]);

  let loadingNoError = isLoading && !hasServerError;
  let loadingError = isLoading && hasServerError;

  function goToLogin() {
    return (
      <p className={styles['access-denied-message']}>
        Go to{' '}
        <a href="/login" className={styles['access-denied-link']}>
          login
        </a>
        !
      </p>
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    const data = fetch('http://localhost:3001/customers')
      .then((res) => {
        if (res.status === 401) {
          setMessage('Session timed out! Please login again!');
          logout();
          navigate('/login');
        } else if (res.status === 404) {
          navigate('*');
        }
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setIsLoading(false);
      });
  }, [logout, navigate]);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers?.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles['customer-list-container']}>
      <div className={styles['customer-list-container-content']}>
        <Header />
        {user && (
          <>
            {loadingNoError && (
              <h1 className={styles['loading-no-error']}>Loading...</h1>
            )}
            {customers && (
              <>
                <div className={styles['search']}>
                  <FontAwesomeIcon
                    icon={solid('magnifying-glass')}
                    className={styles['search-icon']}
                  />
                  <input
                    className={styles['input-search']}
                    type="search"
                    placeholder="Search customer"
                    onChange={(e) => setSearchCustomer(e.target.value)}
                  />
                </div>
                {message && (
                  <p
                    className={
                      hasServerError
                        ? styles['error-text']
                        : styles['success-text']
                    }
                  >
                    <FontAwesomeIcon icon={solid('circle-exclamation')} />{' '}
                    {message}
                  </p>
                )}
                <div className={styles['customers-table']}>
                  <table className={styles['table-list']}>
                    <thead className={styles['thead-list']}>
                      <tr className={styles['tr-list']}>
                        <th className={styles['th-list']}>
                          <p>Full name</p>
                          <FontAwesomeIcon
                            icon={solid('user')}
                            className={styles['user-icon']}
                          />
                        </th>
                        <th className={styles['th-list']}>
                          <p>Email address</p>
                          <FontAwesomeIcon
                            icon={solid('envelope')}
                            className={styles['envelope-icon']}
                          />
                        </th>
                        <th className={styles['th-list']}>
                          <p>Phone number</p>
                          <FontAwesomeIcon
                            icon={solid('phone')}
                            className={styles['phone-icon']}
                          />
                        </th>
                        <th className={styles['th-list']}>
                          <p>Date of birth</p>
                          <FontAwesomeIcon
                            icon={solid('cake-candles')}
                            className={styles['cake-candles-icon']}
                          />
                        </th>
                        <th className={styles['th-list']}>
                          <p>Subscription status</p>
                          <FontAwesomeIcon
                            icon={solid('calendar-days')}
                            className={styles['calendar-days-icon']}
                          />
                        </th>
                        <th className={styles['th-list']}>
                          <p>Gender</p>
                          <FontAwesomeIcon
                            icon={solid('venus-mars')}
                            className={styles['venus-mars-icon']}
                          />
                        </th>
                        <th className={styles['th-list']}>Edit</th>
                        <th className={styles['th-list']}>Delete</th>
                      </tr>
                    </thead>
                    {currentCustomers
                      .filter((customer) => {
                        if (
                          searchCustomer === '' ||
                          customer.firstName
                            .toLowerCase()
                            .includes(searchCustomer.toLowerCase()) ||
                          customer.lastName
                            .toLowerCase()
                            .includes(searchCustomer.toLowerCase()) ||
                          customer.email_address
                            .toLowerCase()
                            .includes(searchCustomer.toLowerCase()) ||
                          customer.phone_number.includes(searchCustomer) ||
                          customer.birth_day.includes(searchCustomer) ||
                          customer.birth_month
                            .toLowerCase()
                            .includes(searchCustomer.toLowerCase()) ||
                          customer.birth_year.includes(searchCustomer) ||
                          customer.subscription.toLowerCase() ===
                            searchCustomer.toLowerCase() ||
                          customer.gender.toLowerCase() ===
                            searchCustomer.toLowerCase()
                        ) {
                          return customer;
                        }
                        return false;
                      })
                      .map((customer) => {
                        return (
                          <CustomerLine key={customer.id} customer={customer} />
                        );
                      })}
                  </table>
                </div>
                <Pagination
                  customersPerAge={customersPerPage}
                  totalCustomers={customers?.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
                <div className={styles['add']}>
                  <Link
                    to="/customers/add"
                    target="_blank"
                    className={styles['add-link']}
                  >
                    <button className={styles['add-customer']}>
                      <FontAwesomeIcon icon={solid('circle-plus')} /> Add
                      customer
                    </button>
                  </Link>
                </div>
              </>
            )}
            {loadingError && (
              <h1 className={styles['loading-error']}>No data!</h1>
            )}
          </>
        )}
        {!user && (
          <div className={styles['access-denied-title-and-message']}>
            <h1 className={styles['access-denied-title']}>Access denied!</h1>
            {goToLogin()}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
