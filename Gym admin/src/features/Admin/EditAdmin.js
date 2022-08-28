import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/AuthContext';
import { Footer } from '../../components/Footer/Footer';
import { ModalDeleteAdminDetails } from '../../components/Modal/ModalDeleteAdminDetails';

import styles from './EditAdmin.module.css';

export function EditAdmin() {
  const { adminId } = useParams();

  const { user, accessToken, logout } = useAuthContext();

  const navigate = useNavigate();

  if (!accessToken) {
    navigate('/login');
  }

  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [hasServerError, setHasServerError] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/api/users/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
        setAdmin(data);
        setIsLoading(false);
      })
      .catch((err) => setHasServerError(err));
  }, [accessToken, logout, navigate, user.id]);

  let loadingNoError = isLoading && !hasServerError;
  let loadingError = isLoading && hasServerError;

  const [values, setValues] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    password: '',
    retype_password: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retype_password: '',
  });

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values);

    if (!validation.isValid) {
      setMessage('');
      setErrors(validation.errors);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    const data = await fetch(`http://localhost:3001/api/users/${adminId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataForServer),
    })
      .then((res) => {
        if (res.status === 200) {
          setMessage('The admin details have been successfully updated!');
          setTimeout(function goBack() {
            navigate('/customers');
          }, 5000);
        } else if (res.status === 401) {
          setMessage('Session timed out! Please login again!');
          logout();
          navigate('/login');
        }
        return res.json();
      })
      .catch((err) => {
        setHasServerError(err);

        setMessage('An error has occurred! Please try again later!');
        setTimeout(function goBack() {
          navigate('/customers');
        }, 5000);
      });

    return data;
  }

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

  const [deleteMessage, setDeleteMessage] = useState();

  return (
    <div className={styles['edit-admin-container']}>
      <div className={styles['edit-admin-container-content']}>
        <Header />
        {user && (
          <>
            {loadingNoError && (
              <h1 className={styles['loading-no-error']}>Loading...</h1>
            )}
            {admin && (
              <>
                <h1 className={styles['title']}>Admin details</h1>
                <form className={styles['update-form']} onSubmit={handleSubmit}>
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
                  {deleteMessage && (
                    <p className={styles['error-text']}>
                      <FontAwesomeIcon icon={solid('circle-exclamation')} />{' '}
                      {deleteMessage}
                    </p>
                  )}
                  <div className={styles['divide-parts']}>
                    <div className={styles['firstName']}>
                      <FontAwesomeIcon
                        icon={solid('user')}
                        className={styles['firstName-icon']}
                      />
                      <label htmlFor="firstName">First name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={values.firstName}
                        className={
                          styles[
                            errors.firstName
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.firstName && (
                      <p className={styles['error-text']}>{errors.firstName}</p>
                    )}
                    <div className={styles['lastName']}>
                      <FontAwesomeIcon
                        icon={solid('user')}
                        className={styles['lastName-icon']}
                      />
                      <label htmlFor="lastName">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={values.lastName}
                        className={
                          styles[
                            errors.lastName
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.lastName && (
                      <p className={styles['error-text']}>{errors.lastName}</p>
                    )}
                    <div className={styles['email']}>
                      <FontAwesomeIcon
                        icon={solid('envelope')}
                        className={styles['email-icon']}
                      />
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        className={
                          styles[
                            errors.email
                              ? 'input-email-error'
                              : 'input-email-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.email && (
                      <p className={styles['error-text']}>{errors.email}</p>
                    )}
                    <div className={styles['password']}>
                      <FontAwesomeIcon
                        icon={solid('key')}
                        className={styles['password-icon']}
                      />
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        className={
                          styles[
                            errors.password
                              ? 'input-password-error'
                              : 'input-password-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.password && (
                      <p className={styles['error-text']}>{errors.password}</p>
                    )}
                    <div className={styles['retype_password']}>
                      <FontAwesomeIcon
                        icon={solid('key')}
                        className={styles['retype_password-icon']}
                      />
                      <label htmlFor="retype_password">Retype password</label>
                      <input
                        type="password"
                        name="retype_password"
                        id="retype_password"
                        value={values.retype_password}
                        className={
                          styles[
                            errors.retype_password
                              ? 'input-password-error'
                              : 'input-password-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.retype_password && (
                      <p className={styles['error-text']}>
                        {errors.retype_password}
                      </p>
                    )}
                  </div>
                  <div className={styles['update']}>
                    <button className={styles['update-admin']}>
                      <FontAwesomeIcon icon={solid('edit')} /> Update profile
                    </button>
                  </div>
                </form>
                <ModalDeleteAdminDetails
                  key={values.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  setDeleteMessage={setDeleteMessage}
                />
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

function validateForm(values) {
  const validation = {
    errors: {
      email: '',
      password: '',
      retype_password: '',
      firstName: '',
      lastName: '',
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!values.firstName) {
    validation.isValid = false;
    validation.errors.firstName = 'Please enter your first name';
  }

  if (!values.lastName) {
    validation.isValid = false;
    validation.errors.lastName = 'Please enter your last name';
  }

  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = 'Please enter a valid email address';
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password = 'Please enter a valid password';
  }

  if (values.password !== values.retype_password) {
    validation.isValid = false;
    validation.errors.retype_password = 'The passwords do not match';
  }

  return validation;
}
