import { useRef } from 'react';
import type { FormEvent } from 'react';
import styles from './styles-input.module.scss';

export const ChatInput = () => {
  const textRef = useRef(null);

  const onSubmit = (e: FormEvent) => {
    e?.preventDefault();
  };

  return (<footer className={styles.wrapper}>
    <form action='/api/v1/chats' method='post' onSubmit={onSubmit}>
      <textarea className={styles.input} placeholder='new message...' ref={textRef}></textarea>
      <button type='submit'>Send</button>
    </form>
  </footer>);
};
