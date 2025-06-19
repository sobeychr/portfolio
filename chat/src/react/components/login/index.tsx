import type { FormEvent } from 'react';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '@context/user';
import { TextInput } from '@components/input/TextInput';
import { baseRequest, formRequest } from '@utils/request';
import styles from './styles.module.scss';

export const Login = () => {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const user = useContext(UserContext);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    formRequest({
      form: formRef?.current,
    })
      .then(resp => {
        const { loggedIn, username } = resp;

        if (!!loggedIn && !!username) {
          dialogRef?.current?.close();
          user.setIsLoggedIn(true);
          user.setUsername(username);
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
          const { loggedIn, username } = resp;

          if (!!loggedIn && !!username) {
            dialogRef?.current?.close();
            user.setIsLoggedIn(true);
            user.setUsername(username);
          } else {
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
        <TextInput autoFocus id='username' />
      </p>
      <p>
        <label>Password:</label>
        <input type='text' className={styles.password} disabled value='disabled for demo' />
      </p>
      <button type='submit'>Login</button>
    </form>
  </dialog>;
};
