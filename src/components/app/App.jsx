import { useEffect, useState } from 'react';

import { Context } from '../../context.jsx';

import { Table } from '../table/Table.jsx';
import { Modal } from '../modal/modal.jsx';
import { Sorter } from '../sorter/sorter.jsx';
import { Filter } from '../filter/filter.jsx';

import styles from './app.module.scss';
import { Loading } from '../loading/loading.jsx';

export const App = () => {
  const [users, setUsers] = useState(null);

  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortedUpdatedAt, setSortedUpdatedAt] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredUpdatedAt, setFilteredUpdatedAt] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    setTimeout(() => {
      fetch("https://dummyjson.com/users")
        .then(res => res.json())
        .then(data => {
          setUsers(data.users);
          setFilteredUsers(data.users);
        });
    }, 1500);

  }, []);

  const finalData = sortedUpdatedAt > filteredUpdatedAt ? sortedUsers : filteredUsers;

  const openModal = (user) => {
    setIsOpen(true);
    setSelectedUser(user);
  }

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  }

  return(
    <Context.Provider value={{
      users,
      filteredUsers,
      setFilteredUsers,
      filteredUpdatedAt,
      setFilteredUpdatedAt,
      sortedUsers,
      setSortedUsers,
      sortedUpdatedAt,
      setSortedUpdatedAt
    }}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sort&Filter</h1>
        <Sorter children={'Сортировка'} />
        <Filter children={'Фильтр'} />
        {users ? <Table data={finalData} handleOpenModal={openModal} /> : <Loading />}
      </div>

      {isOpen && <Modal user={selectedUser} handleCloseModal={closeModal} /> }
    </Context.Provider>
  )
}