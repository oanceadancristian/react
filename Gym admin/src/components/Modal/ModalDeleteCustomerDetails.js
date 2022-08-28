import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../features/Auth/AuthContext';

import styles from './ModalDeleteCustomerDetails.module.css';

export function ModalDeleteCustomerDetails({
  firstName,
  lastName,
  setDeleteMessage,
}) {
  const { accessToken, logout } = useAuthContext();

  const { customerId } = useParams();

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }

  if (modal) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }

  async function deleteCustomer() {
    await fetch(`http://localhost:3001/customers/${customerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setDeleteMessage(
            'The customer details have been successfully deleted!'
          );
          toggleModal();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(function goBack() {
            navigate('/customers');
          }, 5000);
        } else if (res.status === 401) {
          setDeleteMessage('Session timed out! Please login again!');
          setTimeout(function goBack() {
            logout();
            navigate('/login');
          }, 5000);
        }
        return res.json();
      })
      .catch(() => {
        setDeleteMessage('An error has occurred! Pleasy try again later!');
        toggleModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(function goBack() {
          navigate('/customers');
        }, 5000);
      });
  }

  return (
    <>
      <div className={styles['delete']}>
        <button className={styles['delete-customer']} onClick={toggleModal}>
          <FontAwesomeIcon icon={solid('trash')} /> Delete customer
        </button>
      </div>

      {modal && (
        <div className={styles['modal']}>
          <div className={styles['overlay']} onClick={toggleModal}></div>
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <button className={styles['close-button']} onClick={toggleModal}>
                &#10006;
              </button>
            </div>
            <div className={styles['modal-body']}>
              <p className={styles['modal-question']}>Are you sure?</p>
              <p className={styles['modal-name']}>
                Do you really want to delete {firstName} {lastName}?
              </p>
            </div>
            <div className={styles['modal-footer']}>
              <div className={styles['do-not-confirm-delete-button']}>
                <button className={styles['no-button']} onClick={toggleModal}>
                  No
                </button>
              </div>
              <div className={styles['confirm-delete-button']}>
                <button
                  className={styles['yes-button']}
                  onClick={deleteCustomer}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
