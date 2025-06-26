import { type ChangeEvent, type FormEvent,useContext } from 'react';
import { TextAreaInput } from '@components/input/TextareaInput';
import { UserContext } from '@context/user';
import { useChat } from '@hooks/useChat';
import styles from './styles-input.module.scss';

export const ChatInput = () => {
  const userContext = useContext(UserContext);
  const chatHook = useChat();

  const typingList = (chatHook?.state?.typing || []).filter(name => name !== userContext.user.username);
  const isTyping = typingList.length > 0;

  const typingClasses = [
    styles.typing,
    isTyping ? styles['is-typing'] : '',
  ];
  const typingString = typingList.length === 1 ? 'other is typing' : 'others are typing';

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
    <p className={typingClasses.join(' ')}>
      {typingList?.length} {typingString}
      <i className={styles.loading}></i>
      <i className={styles.loading}></i>
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
