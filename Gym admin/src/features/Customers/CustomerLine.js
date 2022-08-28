import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { ModalDeleteCustomerLine } from '../../components/Modal/ModalDeleteCustomerLine';

import styles from './CustomerLine.module.css';

export function CustomerLine({ customer }) {
  function hasBirthdayToday() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
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

    if (Number(customer.birth_day) === day && customer.birth_month === month) {
      return (
        <>
          <p className={styles['happy-birthday-message']}>Happy Birthday!</p>
          <FontAwesomeIcon
            icon={solid('gift')}
            className={styles['gift-icon']}
          />
        </>
      );
    }
  }

  function showSubscriptionIcon(customer) {
    if (customer.subscription === 'Active') {
      return (
        <FontAwesomeIcon
          icon={solid('check')}
          className={styles['active-icon']}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={solid('xmark')}
        className={styles['inactive-icon']}
      />
    );
  }

  return (
    <tbody className={styles['tbody-line']}>
      <tr className={styles['tr-line']}>
        <td className={styles['td-line']}>
          <Link
            to={`/customers/edit/${customer.id}`}
            target="_blank"
            className={styles['customer-link']}
          >
            {customer.firstName} {customer.lastName}
          </Link>
        </td>
        <td className={styles['td-line']}>{customer.email_address}</td>
        <td className={styles['td-line']}>{customer.phone_number}</td>
        <td className={styles['td-line']}>
          {customer.birth_day} {customer.birth_month} {customer.birth_year}
          {hasBirthdayToday(customer)}
        </td>
        <td className={styles['td-line']}>
          <p className={styles['active-or-inactive']}>
            {customer.subscription}
          </p>
          {showSubscriptionIcon(customer)}
        </td>
        <td className={styles['td-line']}>{customer.gender}</td>
        <td className={styles['td-line']}>
          <Link to={`/customers/edit/${customer.id}`}>
            {' '}
            <FontAwesomeIcon
              icon={solid('edit')}
              className={styles['edit']}
            />{' '}
          </Link>
        </td>
        <td className={styles['td-line']}>
          <ModalDeleteCustomerLine
            key={customer.id}
            id={customer.id}
            firstName={customer.firstName}
            lastName={customer.lastName}
          />
        </td>
      </tr>
    </tbody>
  );
}
