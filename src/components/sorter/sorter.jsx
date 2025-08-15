import { useEffect, useState, useContext } from 'react';

import { Context } from '../../context.jsx';
import { Radio } from '../radio/radio.jsx';

import styles from './sorter.module.scss';

export const Sorter = ({ children }) => {
  
  const {setSortedUsers, filteredUsers, setSortedUpdatedAt} = useContext(Context);

  const [selectedField, setSelectedField] = useState('firstName');
  const [direction, setDirection] = useState('without');
  const [gender, setGender] = useState('all');
  
  useEffect(() => {
    let sorted = [...filteredUsers];

    if (gender !== 'all') {
      sorted = sorted.filter(user => user.gender === gender);
    }

    if (direction !== 'without') {
      sorted.sort((a, b) => {
        if (typeof a[selectedField] === 'string') {
          return direction === 'up' ? a[selectedField].localeCompare(b[selectedField]) : b[selectedField].localeCompare(a[selectedField]);
        } else if (typeof a[selectedField] === 'number') {
          return direction === 'up' ? a[selectedField] - b[selectedField] : b[selectedField] - a[selectedField];
        }
        return 0;
      });
    }

    setSortedUsers(sorted);
    setSortedUpdatedAt(Date.now());
  }, [direction, selectedField, gender, filteredUsers])

  return(
    <div className={styles.container}>
      <h3>{children}</h3>
      <div className={styles.wrapper}>
        <div className={styles.value}>
          <Radio
            type="radio"
            name="sort"
            currentValue={selectedField}
            children="Сортировка по:"
            values={['firstName', 'age', 'phone']}
            titles={['Имя', 'Возраст', 'Телефон']}
            onChange={(e) => setSelectedField(e.target.value)}
          />
          <Radio
            type="radio"
            name="gender"
            currentValue={gender}
            children="Пол:"
            values={['all', 'male', 'female']}
            titles={['Все', 'Мужской', 'Женский']}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className={styles.grade}>
          <select onChange={(e) => setDirection(e.target.value)}>
            <option value="" disabled>-Выберите направление-</option>
            <option value="without" defaultValue={true}>Без сортировки</option>
            <option value="up">По возрастанию</option>
            <option value="down">По убыванию</option>
          </select>
        </div>
      </div>
    </div>
  )
}