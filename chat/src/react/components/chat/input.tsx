import { useContext, type ChangeEvent, type FormEvent } from 'react';
import { TextAreaInput } from '@components/input/TextareaInput';
import { useChat } from '@hooks/useChat';
import styles from './styles-input.module.scss';
import { UserContext } from '@context/user';

export const ChatInput = () => {
  const userContext = useContext(UserContext);
  const chatHook = useChat();

  const onChange = (e: ChangeEvent) => {
    const input = e?.target?.value;
    if (input.length > 0) {
      chatHook.onTyping(userContext?.user?.username);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e?.preventDefault();
  };

  return (<footer className={styles.wrapper}>
    <p className={styles.typing}>
      {chatHook?.state?.typing?.length || 0} are typing

      <i className={styles.loading}></i>
    </p>
    <form action='/api/v1/chats' method='post' onSubmit={onSubmit}>
      <TextAreaInput
        className={styles.input}
        onChange={onChange}
        placeholder='new message...'
      />
      <button type='submit'>Send</button>
    </form>
  </footer>);
};
