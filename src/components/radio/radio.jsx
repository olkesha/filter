
import clsx from 'clsx';

import styles from './radio.module.scss';

export const Radio = (props) => {
  const { name, type, children, values = [], titles = [], currentValue, onChange, ...rest } = props;

  return(
    <div className={styles.container}>
      <h4>{children}</h4>
      {values.map((value, index) => {
        const inputId = `${name}-${value}`;
        return (
          <label key={value} className={styles.label} htmlFor={inputId}>
            <input
              id={inputId}
              className={clsx(styles.input, styles.visuallyHidden)}
              name={name}
              type={type}
              checked={currentValue === value}
              value={value}
              onChange={onChange}
              {...rest}
            />
            <span className={styles.pseudoCheckbox}></span>
            {titles[index]}
          </label>
        );
      })}
    </div>
  )
}