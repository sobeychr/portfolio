import type { FormEvent } from 'react';
import { useEffect, useRef } from 'react';
import { baseRequest, formRequest } from '@utils/request';
import styles from './styles.module.scss';

export const Login = () => {
  const dialogRef = useRef(null);
  const formRef = useRef(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    formRequest({
      form: formRef?.current,
    })
      .then(resp => {
        if (!!resp.loggedIn) {
          dialogRef?.current?.close();
        }
      });
  };

  useEffect(() => {
    const resetLogin = async () => {
      baseRequest({
        method: 'post',
        url: '/api/v1/reset',
      })
        .then(resp => {
          if (!resp.loggedIn) {
            dialogRef?.current?.showModal();
          }
        });
    };

    resetLogin();
  }, []);

  return <dialog className={styles.dialog} ref={dialogRef}>
    <form action='/api/v1/login' method='post' onSubmit={onSubmit} ref={formRef}>
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
