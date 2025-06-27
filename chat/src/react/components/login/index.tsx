import type { FormEvent } from 'react';
import { useContext, useEffect, useRef } from 'react';
import { TextInput } from '@r-components/input/TextInput';
import { UserContext } from '@r-context/user';
import { AUTH_COOKIE, AUTH_POST } from '@utils/configs';
import { getDocumentCookie } from '@utils/cookie';
import { baseRequest, formRequest } from '@utils/request';
import styles from '@styles/components/login/styles.module.scss';

export const Login = () => {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const userContext = useContext(UserContext);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    formRequest({
      form: formRef?.current,
    })
      .then(resp => {
        const { loggedIn, username } = resp;

        if (!!loggedIn && !!username) {
          dialogRef?.current?.close();
          userContext.loginUser(username);
        }
      });
  };

  useEffect(() => {
    const token = getDocumentCookie(AUTH_COOKIE);

    const resetLogin = async () => {
      baseRequest({
        method: 'post',
        postData: { token },
        url: '/api/v1/reset',
      })
        .then(resp => {
          const { loggedIn, username } = resp;

          if (!!loggedIn && !!username) {
            dialogRef?.current?.close();
            userContext.loginUser(username);
          } else {
            dialogRef?.current?.showModal();
          }
        })
        .catch(() => {
          dialogRef?.current?.showModal();
        });
    };

    if (!!token) {
      resetLogin();
    } else {
      dialogRef?.current?.showModal();
    }
  }, []);

  return <dialog className={styles.dialog} ref={dialogRef}>
    <form action='/api/v1/login' method='post' onSubmit={onSubmit} ref={formRef}>
      <p>
        <label htmlFor={AUTH_POST}>Username:</label>
        <TextInput autoFocus id={AUTH_POST} />
      </p>
      <p>
        <label>Password:</label>
        <input type='text' className={styles.password} disabled value='disabled for demo' />
      </p>
      <button type='submit'>Login</button>
    </form>
  </dialog>;
};
