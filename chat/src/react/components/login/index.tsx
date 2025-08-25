import type { FormEvent } from 'react';
import { useContext, useEffect, useRef } from 'react';
import { TextInput } from '@r-components/input/TextInput';
import { UserContext } from '@r-context/user';
import { AUTH_POST,AUTH_REFRESH } from '@utils/configs';
import { getDocumentCookie } from '@utils/cookie';
import { baseRequest, formRequest } from '@utils/request';
import styles from '@styles/components/login/styles.module.scss';

export const Login = () => {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const userContext = useContext(UserContext);

  const onCancel = (e: KeyboardEvent) => {
    if (e?.key === 'Escape') {
      e?.preventDefault();
      inputRef?.current?.focus();
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    formRequest({
      form: formRef?.current,
    })
      .then((resp: LoginUserParam) => {
        const { loggedIn, username } = resp;

        if (!!loggedIn && !!username) {
          dialogRef?.current?.close();
          userContext.loginUser(resp);
        }
      });
  };

  useEffect(() => {
    document.addEventListener('keydown', onCancel);

    const refreshToken = getDocumentCookie(AUTH_REFRESH);

    const resetLogin = () => {
      baseRequest({
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        method: 'post',
        url: '/api/v1/reset',
      })
        .then((resp: LoginUserParam) => {
          const { loggedIn, username } = resp;

          if (!!loggedIn && !!username) {
            dialogRef?.current?.close();
            userContext.loginUser(resp);
          } else {
            dialogRef?.current?.showModal();
          }
        })
        .catch(() => {
          dialogRef?.current?.showModal();
        });
    };

    if (!!refreshToken) {
      resetLogin();
    } else {
      dialogRef?.current?.showModal();
    }

    return () => {
      document.addEventListener('keydown', onCancel);
    };
  }, []);

  return <dialog className={styles.dialog} ref={dialogRef}>
    <form action='/api/v1/login' method='post' onSubmit={onSubmit} ref={formRef}>
      <p>
        <label htmlFor={AUTH_POST}>Username:</label>
        <TextInput autoFocus id={AUTH_POST} ref={inputRef} />
      </p>
      <p>
        <label>Password:</label>
        <input type='text' className={styles.password} disabled value='disabled for demo' />
      </p>
      <button type='submit'>Login</button>
    </form>
  </dialog>;
};
