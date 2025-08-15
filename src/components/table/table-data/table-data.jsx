import styles from './table-data.module.scss';

export const TableData = (props) => {
  const { as: Tag, children } = props;

  return(
    <Tag className={styles.cell}>{children}</Tag>
  )
}