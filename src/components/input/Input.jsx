
import styles from './input.module.scss';

export const Input = (props) => {
  const {id, name, type, children, ...rest} = props;

  return(
    <label className={styles.label}> {children}
      <input
        className={styles.input}
        // id={id}
        name={name}
        type={type}
        {...rest}
      />
    </label>
  )
}