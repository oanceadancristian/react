import clsx from 'clsx';
import { useState } from 'react';
import styles from './Counter.module.css';

export function Counter() {
  const [count, setCount] = useState(0);

  // let cls;
  // if (count < 0) {
  //   cls = styles.negative;
  // } else if (count > 0) {
  //   cls = styles.positive;
  // }

  // JSX
  return (
    <>
      <h1>Counter</h1>
      <output
        className={clsx({
          [styles.positive]: count > 0,
          [styles.negative]: count < 0,
        })}
      >
        {count}
      </output>
      <p>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </p>
    </>
  );
}
