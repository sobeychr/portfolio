import { onCleanup, onMount } from 'solid-js';
import { TextInput } from '@s-components/input/TextInput';
import { useUserContext } from '@s-context/user';
import { AUTH_COOKIE, AUTH_POST } from '@utils/configs';
import { getDocumentCookie } from '@utils/cookie';
import { baseRequest, formRequest } from '@utils/request';
import styles from '@styles/components/login/styles.module.scss';

export const Login = () => {
  const { loginUser } = useUserContext();

  let dialogRef;
  let formRef;
  let inputRef;

  const onCancel = (e: KeyboardEvent) => {
    if (e?.key === 'Escape') {
      e?.preventDefault();
      inputRef.focus();
    }
  };

  const onSubmit = (e: Event) => {
    e?.preventDefault();

    formRequest({
      form: formRef,
    })
      .then(resp => {
        const { loggedIn, username } = resp;

        if (!!loggedIn && !!username) {
          dialogRef?.close();
          loginUser(username);
        }
      });
  };

  onMount(() => {
    document.addEventListener('keydown', onCancel);

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
            dialogRef?.close();
            loginUser(username);
          } else {
            dialogRef?.showModal();
          }
        })
        .catch(() => {
          dialogRef?.showModal();
        });
    };

    if (!!token) {
      resetLogin();
    } else {
      dialogRef?.showModal();
    }
  });

  onCleanup(() => {
    document.removeEventListener('keydown', onCancel);
  });

  return <dialog class={styles.dialog} ref={dialogRef}>
    <form action='/api/v1/login' method='post' onSubmit={onSubmit} ref={formRef}>
      <p>
        <label for={AUTH_POST}>Username:</label>
        <TextInput autoFocus id={AUTH_POST} ref={inputRef} />
      </p>
      <p>
        <label>Password:</label>
        <input type='text' class={styles.password} disabled value='disabled for demo' />
      </p>
      <button type='submit'>Login</button>
    </form>
  </dialog>;
};
