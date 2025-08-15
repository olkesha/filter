import { TableData } from './table-data/table-data.jsx';
 
import styles from './table.module.scss';

export const Table = ({ data: users, handleOpenModal }) => {
  return(
    <table className={styles.table}>
      <thead>
        <tr className={styles.row}>
          <TableData as={'th'} children={'Фамилия'} />
          <TableData as={'th'} children={'Имя'} />
          <TableData as={'th'} children={'Отчество'} />
          <TableData as={'th'} children={'Возраст'} />
          <TableData as={'th'} children={'Пол'} />
          <TableData as={'th'} children={'Номер телефона'} />
          <TableData as={'th'} children={'email'} />
          <TableData as={'th'} children={'Страна'} />
          <TableData as={'th'} children={'Город'} />
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return(
            <tr className={styles.row} key={user.id} onClick={() => handleOpenModal(user)}>
              <TableData as={'td'} children={user.firstName} />
              <TableData as={'td'} children={user.lastName} />
              <TableData as={'td'} children={user.maidenName} />
              <TableData as={'td'} children={user.age} />
              <TableData as={'td'} children={user.gender} />
              <TableData as={'td'} children={user.phone} />
              <TableData as={'td'} children={user.email} />
              <TableData as={'td'} children={user.address.country} />
              <TableData as={'td'} children={user.address.city} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}