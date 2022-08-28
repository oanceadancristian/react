import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../features/Auth/AuthContext';

import styles from './ModalDeleteCustomerLine.module.css';

export function ModalDeleteCustomerLine({ id, firstName, lastName }) {
  const { accessToken, logout } = useAuthContext();

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
    await fetch(`http://localhost:3001/customers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          toggleModal();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(function () {
            window.location.reload();
          }, 5000);
        } else if (res.status === 401) {
          setTimeout(function goBack() {
            logout();
            navigate('/login');
          }, 5000);
        }
        return res.json();
      })
      .catch(() => {
        toggleModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.reload();
      });
  }

  return (
    <>
      <div className={styles['button']}>
        <FontAwesomeIcon
          icon={solid('trash')}
          className={styles['delete-icon']}
          onClick={toggleModal}
        />
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
