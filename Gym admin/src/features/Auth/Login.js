import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

import styles from './Login.module.css';

export function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retype_password: '',
    isChecked: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retype_password: '',
    serverError: '',
  });

  const { login, accessToken } = useAuthContext();

  useEffect(() => {
    window.addEventListener('load', rememberMe());

    function rememberMe() {
      if (localStorage.isChecked && localStorage.email !== '') {
        setValues({
          ...values,
          email: localStorage.email,
          password: localStorage.password,
          isChecked: true,
        });
      }
    }
  }, []);

  if (accessToken) {
    return <Navigate to="/customers" />;
  }

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function handleCheckbox(e) {
    setValues({ ...values, isChecked: e.target.checked });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.isChecked && values.email !== '') {
      localStorage.email = values.email;
      localStorage.password = values.password;
      localStorage.isChecked = values.isChecked;
    } else if (!values.isChecked) {
      localStorage.clear();
    }

    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    const data = await fetch(`http://localhost:3001/api/login`, {
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
        <h1 className={styles['title']}>Admin Login</h1>
        {errors.serverError && (
          <p className={styles['error-text']}>
            <FontAwesomeIcon icon={solid('circle-exclamation')} />{' '}
            {errors.serverError}
          </p>
        )}
        <div className={styles['login-or-register-form']}>
          <form className={styles['form']} onSubmit={handleSubmit}>
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
            <button className={styles['login-or-register']}>
              <FontAwesomeIcon
                icon={solid('circle-chevron-right')}
                className={styles['circle-chevron-right-icon']}
              />{' '}
              Login
            </button>
            <div className={styles['remember-me']}>
              <input
                type="checkbox"
                id="remember"
                checked={values.isChecked === true}
                className={styles['remember-input']}
                onChange={handleCheckbox}
              />
              <label htmlFor="remember" className={styles['remember-label']}>
                Remember me
              </label>
            </div>
            <p className={styles['no-account-text']}>
              Not a member yet?{' '}
              <Link to="/register" className={styles['no-account-text-link']}>
                Register
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
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = 'Please enter a valid email address';
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password = 'Please enter a valid password';
  }

  return validation;
}
