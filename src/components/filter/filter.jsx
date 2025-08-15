import { useState, useContext } from 'react';

import { Input } from '../input/Input.jsx'
import { Context } from '../../context.jsx';

import styles from './filter.module.scss';

export const Filter = ({ children }) => {
  const {users, setFilteredUsers, setFilteredUpdatedAt} = useContext(Context);

  const [filters, setFilters] = useState({
    'search-by-name': '',
    'search-by-age': '',
    'search-by-gender': '',
    'search-by-phone': ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    const newFilters = {
      ...filters,
      [name]: value.toLowerCase()
    };
    setFilters(newFilters);

    const filtered = users.filter(user => {
      const matchName = user.firstName.toLowerCase().includes(newFilters['search-by-name']);
      const matchAge = user.age.toString().includes(newFilters['search-by-age']);
      const matchGender = user.gender.toLowerCase().startsWith(newFilters['search-by-gender']);
      const matchPhone = user.phone.toLowerCase().includes(newFilters['search-by-phone']);
      
      return matchName && matchAge && matchGender && matchPhone;
    });

    setFilteredUsers(filtered);
    setFilteredUpdatedAt(Date.now());
  };

  return(
    <div className={styles.container}>
      <h3>{children}</h3>
      <div className={styles.wrapper}>
        <Input
          name={'search-by-name'}
          type={'text'}
          placeholder='Введите ФИО'
          onChange={handleFilterChange}
        />
        <Input
          name={'search-by-age'}
          type={'text'}
          placeholder='Введите возраст'
          onChange={handleFilterChange}
        />
        <Input
          name={'search-by-gender'}
          type={'text'}
          placeholder='Введите пол'
          onChange={handleFilterChange}
        />
        <Input
          name={'search-by-phone'}
          type={'text'}
          placeholder='Введите номер телефона'
          onChange={handleFilterChange}
        />
      </div>
    </div>
  )
}