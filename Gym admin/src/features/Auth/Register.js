import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from './AuthContext';

import styles from './Register.module.css';

export function Register() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retype_password: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retype_password: '',
    serverError: '',
  });

  const { login, accessToken } = useAuthContext();

  if (accessToken) {
    return <Navigate to="/customers" />;
  }

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    const data = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    })
      .then((res) => res.json())
      .catch(() =>
        setErrors({
          ...errors,
          serverError: 'An error has occurred! Please try again later!',
        })
      );

    if (!data) {
      return;
    }

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data + '!' });
      return;
    }

    login(data);
  }

  return (
    <div className={styles['login-or-register-container']}>
      <div className={styles['title-and-form']}>
        <h1 className={styles['title']}>Admin Register</h1>
        {errors.serverError && (
          <p className={styles['error-text']}>
            <FontAwesomeIcon icon={solid('circle-exclamation')} />{' '}
            {errors.serverError}
          </p>
        )}
        <div className={styles['login-or-register-form']}>
          <form className={styles['form']} onSubmit={handleSubmit}>
            <div className={styles['firstName']}>
              <input
                className={styles[errors.firstName ? 'with-error' : 'no-error']}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="first name"
                value={values.firstName}
                onChange={handleInputChange}
              />
              <FontAwesomeIcon
                icon={solid('user')}
                className={styles['firstName-icon']}
              />
            </div>
            {errors.firstName && (
              <p className={styles['error-text']}>{errors.firstName}</p>
            )}
            <div className={styles['lastName']}>
              <input
                className={styles[errors.lastName ? 'with-error' : 'no-error']}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="last name"
                value={values.lastName}
                onChange={handleInputChange}
              />
              <FontAwesomeIcon
                icon={solid('user')}
                className={styles['lastName-icon']}
              />
            </div>
            {errors.lastName && (
              <p className={styles['error-text']}>{errors.lastName}</p>
            )}
            <div className={styles['email']}>
              <input
                className={styles[errors.email ? 'with-error' : 'no-error']}
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={values.email}
                onChange={handleInputChange}
              />
              <FontAwesomeIcon
                icon={solid('envelope')}
                className={styles['email-icon']}
              />
            </div>
            {errors.email && (
              <p className={styles['error-text']}>{errors.email}</p>
            )}
            <div className={styles['password']}>
              <input
                className={styles[errors.password ? 'with-error' : 'no-error']}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={values.password}
                onChange={handleInputChange}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
              />
              <FontAwesomeIcon
                icon={solid('key')}
                className={styles['password-icon']}
              />
            </div>
            {errors.password && (
              <p className={styles['error-text']}>{errors.password}</p>
            )}
            <div className={styles['retype_password']}>
              <input
                className={
                  styles[errors.retype_password ? 'with-error' : 'no-error']
                }
                type="password"
                name="retype_password"
                id="retype_password"
                placeholder="retype password"
                value={values.retype_password}
                onChange={handleInputChange}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
              />
              <FontAwesomeIcon
                icon={solid('key')}
                className={styles['retype_password-icon']}
              />
            </div>
            {errors.retype_password && (
              <p className={styles['error-text']}>{errors.retype_password}</p>
            )}
            <button className={styles['login-or-register']}>
              <FontAwesomeIcon
                icon={solid('circle-chevron-right')}
                className={styles['circle-chevron-right-icon']}
              />{' '}
              Register
            </button>
            <p className={styles['no-account-text']}>
              Already a member?{' '}
              <Link to="/login" className={styles['no-account-text-link']}>
                Login
              </Link>
            </p>
          </form>
        </div>
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
