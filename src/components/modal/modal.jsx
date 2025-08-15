import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

const modalRoot = document.querySelector('#modals');

export const Modal = ({ user, handleCloseModal }) => {

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') {
        handleCloseModal();
      }
    })

    return(() => {
      document.removeEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
          handleCloseModal();
        }
      });
    })
  })

  return createPortal(
    <>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleCloseModal}>
          ✖
        </button>
        <div className={styles.modalContent}>
          <img src={user.image} alt={user.firstName} />
          <ul className={styles.list}>
            <li className={styles.listItem}>Имя: {`${user.firstName} ${user.lastName} ${user.maidenName}`}</li>
            <li className={styles.listItem}>Возраст: {user.age}</li>
            <li className={styles.listItem}>Адрес: {user.address.address}</li>
            <li className={styles.listItem}>Рост: {user.height} см</li>
            <li className={styles.listItem}>Вес: {user.weight} кг</li>
            <li className={styles.listItem}>Email: {user.email}</li>
            <li className={styles.listItem}>Телефон: {user.phone}</li>
          </ul>
        </div>
      </div>
      <div className={styles.modalOverlay} onClick={handleCloseModal}></div>
    </>,
    modalRoot
  );
};
