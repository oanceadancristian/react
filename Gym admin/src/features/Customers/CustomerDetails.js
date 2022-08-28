import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { Header } from '../../components/Header/Header';
import { ModalDeleteCustomerDetails } from '../../components/Modal/ModalDeleteCustomerDetails';
import { Footer } from '../../components/Footer/Footer';

import styles from './CustomerDetails.module.css';

export function CustomerDetails() {
  const navigate = useNavigate();

  const { user, accessToken, logout } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [hasServerError, setHasServerError] = useState('');

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

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email_address: '',
    phone_number: '',
    street_name: '',
    street_number: '',
    house_number_or_block_of_flats_number: '',
    entrance_number: '',
    floor_number: '',
    apartment_number: '',
    district_number: '',
    city: '',
    county: '',
    country: '',
    zip_code: '',
    additional_information: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    gender: '',
    subscription: '',
    occupation: '',
    created_at: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email_address: '',
    phone_number: '',
    street_name: '',
    street_number: '',
    house_number_or_block_of_flats_number: '',
    entrance_number: '',
    floor_number: '',
    apartment_number: '',
    district_number: '',
    city: '',
    county: '',
    country: '',
    zip_code: '',
    additional_information: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    gender: '',
    subscription: '',
    occupation: '',
  });

  const { customerId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/customers/${customerId}`)
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
      .then((data) => setValues(data));
  }, [customerId, navigate, logout]);

  function handleInputChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const data = await fetch(
      `http://localhost:3001/api/customers/${customerId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setMessage('The customer details have been successfully updated!');
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

  function hasBirthdayToday() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();
    const age = year - values.birth_year;
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    month = monthNames[month];

    function getHimOrHer() {
      if (values.gender === 'Male') {
        const him = 'him';
        return him;
      } else if (values.gender === 'Female') {
        const her = 'her';
        return her;
      }
    }

    if (Number(values.birth_day) === day && values.birth_month === month) {
      return (
        <div className={styles['happy-birthday-container']}>
          <p className={styles['happy-birthday-message']}>
            {values.firstName} turns {age} today!
          </p>
          <p className={styles['happy-birthday-message']}>
            Wish {getHimOrHer()} happy birthday!
          </p>
          <FontAwesomeIcon
            icon={solid('gift')}
            className={styles['gift-icon']}
          />
        </div>
      );
    }
  }

  function generateDays() {
    let daysValues = [];

    for (let i = 1; i <= 31; i++) {
      daysValues.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return daysValues;
  }

  function generateMonths() {
    let monthsValues = [];

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    for (let i = 0; i < months.length; i++) {
      monthsValues.push(
        <option key={i} value={months[i]}>
          {months[i]}
        </option>
      );
    }

    return monthsValues;
  }

  function generateYears() {
    let yearsValues = [];

    const year = new Date().getFullYear();

    for (let i = year; i >= 1900; i--) {
      yearsValues.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return yearsValues;
  }

  function generateOccupations() {
    let occupationsValues = [];

    const occupations = [
      'Accountancy, banking and finance',
      'Business, consulting and management',
      'Charity and voluntary work',
      'Creative arts and design',
      'Energy and utilities',
      'Engineering and manufacturing',
      'Environment and agriculture',
      'Healthcare',
      'Hospitality and events management',
      'Information technology',
      'Law',
      'Law enforcement and security',
      'Leisure, sport and tourism',
      'Marketing, advertising and PR',
      'Media and internet',
      'Property and construction',
      'Public services and administration',
      'Recruitment and HR',
      'Retail',
      'Sales',
      'Science and pharmaceuticals',
      'Social care',
      'Teacher training and education',
      'Transport and logistics',
      'Other',
      'Unemployed',
      'Student',
      'Retired',
    ];

    for (let i = 0; i < occupations.length; i++) {
      occupationsValues.push(
        <option key={i} value={occupations[i]}>
          {occupations[i]}
        </option>
      );
    }

    return occupationsValues;
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

  let today = new Date().getDate();

  let expirationDate = '';
  let date = new Date();
  date.setTime(date.getTime() + values.created_at * 24 * 60 * 60 * 1000);
  expirationDate = date.getDate();

  useEffect(() => {
    if (values.subscription === 'Active' && today === expirationDate) {
      fetch(`http://localhost:3001/api/customers/${customerId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...values, subscription: 'Inactive' }),
      }).then((res) => res.json());
    }
  }, [accessToken, customerId, values, today, expirationDate]);

  const [deleteMessage, setDeleteMessage] = useState('');

  return (
    <div className={styles['customer-details-container']}>
      <div className={styles['customer-details-container-content']}>
        <Header />
        {user && (
          <>
            {loadingNoError && (
              <h1 className={styles['loading-no-error']}>Loading...</h1>
            )}
            {customers && (
              <>
                <h1 className={styles['title']}>Customer details</h1>
                {hasBirthdayToday(customers)}
                <form className={styles['edit-form']} onSubmit={handleSubmit}>
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
                      {errors.firstName && (
                        <p className={styles['error-text']}>
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className={styles['lastName']}>
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
                      {errors.lastName && (
                        <p className={styles['error-text']}>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles['divide-parts']}>
                    <div className={styles['email_address']}>
                      <label htmlFor="email_address">Email</label>
                      <input
                        type="email"
                        name="email_address"
                        id="email_address"
                        value={values.email_address}
                        className={
                          styles[
                            errors.email_address
                              ? 'input-email-error'
                              : 'input-email-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.email_address && (
                        <p className={styles['error-text']}>
                          {errors.email_address}
                        </p>
                      )}
                    </div>
                    <div className={styles['phone_number']}>
                      <label htmlFor="phone_number">Phone</label>
                      <input
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        value={values.phone_number}
                        className={
                          styles[
                            errors.phone_number
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.phone_number && (
                        <p className={styles['error-text']}>
                          {errors.phone_number}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles['divide-parts']}>
                    <div className={styles['street-name']}>
                      <label htmlFor="street_name">Street name</label>
                      <input
                        type="text"
                        name="street_name"
                        id="street_name"
                        value={values.street_name}
                        className={
                          styles[
                            errors.street_name
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.street_name && (
                        <p className={styles['error-text']}>
                          {errors.street_name}
                        </p>
                      )}
                    </div>
                    <div className={styles['street-number']}>
                      <label htmlFor="street_number">Street number</label>
                      <input
                        type="text"
                        name="street_number"
                        id="street_number"
                        value={values.street_number}
                        className={
                          styles[
                            errors.street_number
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.street_number && (
                        <p className={styles['error-text']}>
                          {errors.street_number}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles['divide-parts']}>
                    <div className={styles['house-or-block-number']}>
                      <label htmlFor="house_number_or_block_of_flats_number">
                        House/block number
                      </label>
                      <input
                        type="text"
                        name="house_number_or_block_of_flats_number"
                        id="house_number_or_block_of_flats_number"
                        value={values.house_number_or_block_of_flats_number}
                        className={
                          styles[
                            errors.house_number_or_block_of_flats_number
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.house_number_or_block_of_flats_number && (
                        <p className={styles['error-text']}>
                          {errors.house_number_or_block_of_flats_number}
                        </p>
                      )}
                    </div>
                    <div className={styles['entrance-number']}>
                      <label htmlFor="entrance_number">Entrance number</label>
                      <input
                        type="text"
                        name="entrance_number"
                        id="entrance_number"
                        value={values.entrance_number}
                        className={
                          styles[
                            errors.entrance_number
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.entrance_number && (
                        <p className={styles['error-text']}>
                          {errors.entrance_number}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles['divide-parts']}>
                    <div className={styles['floor-number']}>
                      <label htmlFor="floor_number">Floor number</label>
                      <input
                        type="text"
                        name="floor_number"
                        id="floor_number"
                        value={values.floor_number}
                        className={
                          styles[
                            errors.floor_number
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.floor_number && (
                        <p className={styles['error-text']}>
                          {errors.floor_number}
                        </p>
                      )}
                    </div>
                    <div className={styles['apartment-number']}>
                      <label htmlFor="apartment_number">Apartment number</label>
                      <input
                        type="text"
                        name="apartment_number"
                        id="apartment_number"
                        value={values.apartment_number}
                        className={
                          styles[
                            errors.apartment_number
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.apartment_number && (
                        <p className={styles['error-text']}>
                          {errors.apartment_number}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles['divide-parts']}>
                    <div className={styles['district-number']}>
                      <label htmlFor="district_number">District number</label>
                      <input
                        type="text"
                        name="district_number"
                        id="district_number"
                        value={values.district_number}
                        className={
                          styles[
                            errors.district_number
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.district_number && (
                        <p className={styles['error-text']}>
                          {errors.district_number}
                        </p>
                      )}
                    </div>
                    <div className={styles['city']}>
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={values.city}
                        className={
                          styles[
                            errors.city
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.city && (
                        <p className={styles['error-text']}>{errors.city}</p>
                      )}
                    </div>
                  </div>
                  <div className={styles['divide-parts']}>
                    <div className={styles['county']}>
                      <label htmlFor="county">County</label>
                      <input
                        type="text"
                        name="county"
                        id="county"
                        value={values.county}
                        className={
                          styles[
                            errors.county
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.county && (
                        <p className={styles['error-text']}>{errors.county}</p>
                      )}
                    </div>
                    <div className={styles['country']}>
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={values.country}
                        className={
                          styles[
                            errors.country
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.country && (
                        <p className={styles['error-text']}>{errors.country}</p>
                      )}
                    </div>
                  </div>
                  <div className={styles['divide-parts']}>
                    <div className={styles['zip-code']}>
                      <label htmlFor="zip_code">Zip code</label>
                      <input
                        type="text"
                        name="zip_code"
                        id="zip_code"
                        value={values.zip_code}
                        className={
                          styles[
                            errors.zip_code
                              ? 'input-text-error'
                              : 'input-text-no-error'
                          ]
                        }
                        onChange={handleInputChange}
                      />
                      {errors.zip_code && (
                        <p className={styles['error-text']}>
                          {errors.zip_code}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles['additional-information']}>
                    <p>Additional information</p>
                    <textarea
                      name="additional_information"
                      id="additional_information"
                      value={values.additional_information}
                      className={
                        styles[
                          errors.additional_information
                            ? 'textarea-error'
                            : 'textarea-no-error'
                        ]
                      }
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.additional_information && (
                      <p className={styles['error-text']}>
                        {errors.additional_information}
                      </p>
                    )}
                  </div>
                  <div className={styles['date-of-birth']}>
                    <p>Date of birth</p>
                    <select
                      name="day"
                      id="day"
                      value={values.birth_day}
                      className={styles['select-day']}
                      onChange={handleInputChange}
                    >
                      {generateDays()}
                    </select>
                    <select
                      name="month"
                      id="month"
                      value={values.birth_month}
                      className={styles['select-month']}
                      onChange={handleInputChange}
                    >
                      {generateMonths()}
                    </select>
                    <select
                      name="year"
                      id="year"
                      value={values.birth_year}
                      className={styles['select-year']}
                      onChange={handleInputChange}
                    >
                      {generateYears()}
                    </select>
                  </div>
                  <div className={styles['gender']}>
                    <p>Gender</p>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={values.gender === 'Male'}
                      className={styles['male']}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={values.gender === 'Female'}
                      className={styles['female']}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className={styles['occupation']}>
                    <p>Occupation</p>
                    <select
                      name="occupation"
                      id="occupation"
                      value={values.occupation}
                      className={styles['select-occupation']}
                      onChange={handleInputChange}
                    >
                      {generateOccupations()}
                    </select>
                  </div>
                  <div className={styles['subscription-status']}>
                    <p>Subscription status</p>
                    <label htmlFor="subscription_active">Active</label>
                    <input
                      type="checkbox"
                      name="subscription"
                      id="subscription_active"
                      value="Active"
                      checked={values.subscription === 'Active'}
                      className={styles['input-checkbox']}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="subscription_inactive">Inactive</label>
                    <input
                      type="checkbox"
                      name="subscription"
                      id="subscription_inactive"
                      value="Inactive"
                      checked={values.subscription === 'Inactive'}
                      className={styles['input-checkbox']}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles['update']}>
                    <button className={styles['update-customer']}>
                      <FontAwesomeIcon icon={solid('edit')} /> Update details
                    </button>
                  </div>
                </form>
                <ModalDeleteCustomerDetails
                  key={values.id}
                  firstName={values.firstName}
                  lastName={values.lastName}
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
      firstName: '',
      lastName: '',
      email_address: '',
      phone_number: '',
      street_name: '',
      street_number: '',
      house_number_or_block_of_flats_number: '',
      entrance_number: '',
      floor_number: '',
      apartment_number: '',
      district_number: '',
      city: '',
      county: '',
      country: '',
      zip_code: '',
      additional_information: '',
      date_of_birth: '',
      gender: '',
      subscription: '',
      occupation: '',
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  const phoneRegex =
    /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;

  if (!values.firstName) {
    validation.isValid = false;
    validation.errors.firstName = 'Please enter your first name';
  }

  if (!values.lastName) {
    validation.isValid = false;
    validation.errors.lastName = 'Please enter your last name';
  }

  if (!values.email_address || !emailRegex.test(values.email_address)) {
    validation.isValid = false;
    validation.errors.email_address = 'Please enter a valid email address';
  }

  if (!values.phone_number || !phoneRegex.test(values.phone_number)) {
    validation.isValid = false;
    validation.errors.phone_number = 'Please enter a valid phone number';
  }

  if (!values.street_name) {
    validation.isValid = false;
    validation.errors.street_name = 'Please enter your street name';
  }

  if (!values.street_number) {
    validation.isValid = false;
    validation.errors.street_number = 'Please enter your street number';
  }

  if (!values.house_number_or_block_of_flats_number) {
    validation.isValid = false;
    validation.errors.house_number_or_block_of_flats_number =
      'Please enter your house/block number';
  }

  if (!values.entrance_number) {
    validation.isValid = false;
    validation.errors.entrance_number = 'Please enter your entrance number';
  }

  if (!values.floor_number) {
    validation.isValid = false;
    validation.errors.floor_number = 'Please enter your floor number';
  }

  if (!values.apartment_number) {
    validation.isValid = false;
    validation.errors.apartment_number = 'Please enter your apartment number';
  }

  if (!values.district_number) {
    validation.isValid = false;
    validation.errors.district_number = 'Please enter your district number';
  }

  if (!values.city) {
    validation.isValid = false;
    validation.errors.city = 'Please enter your city';
  }

  if (!values.county) {
    validation.isValid = false;
    validation.errors.county = 'Please enter your county';
  }

  if (!values.country) {
    validation.isValid = false;
    validation.errors.country = 'Please enter your country';
  }

  if (!values.zip_code) {
    validation.isValid = false;
    validation.errors.zip_code = 'Please enter your zip code';
  }

  if (!values.additional_information) {
    validation.isValid = false;
    validation.errors.additional_information =
      'Please enter additional information';
  }

  return validation;
}
