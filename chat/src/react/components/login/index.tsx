import type { FormEvent } from 'react';
import { useEffect, useRef } from 'react';
import { formRequest } from '@utils/request';
import styles from './styles.module.scss';

export const Login = () => {
  const dialogRef = useRef(null);
  const formRef = useRef(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const request = await formRequest(formRef?.current as HTMLFormElement);
    console.log('req', request);
  };

  useEffect(() => {
    dialogRef?.current?.showModal();
  }, []);

  return <dialog className={styles.dialog} ref={dialogRef}>
    <form action='/api/v1/auth' method='post' onSubmit={onSubmit} ref={formRef}>
      <p>
        <label htmlFor='username'>Username:</label>
        <input type='text' autoFocus id='username' name='username' />
      </p>
      <p>
        <label>Password:</label>
        <input type='text' className={styles.password} disabled value='disabled for demo' />
      </p>
      <button type='submit'>Login</button>
    </form>
  </dialog>;
};
