import { type ChangeEvent, type FormEvent, useContext, useRef } from 'react';
import { TextareaInput } from '@components/input/TextareaInput';
import { ChatContext } from '@context/chat';
import { MessageContext } from '@context/message';
import { UserContext } from '@context/user';
import styles from './styles-input.module.scss';

export const ChatInput = () => {
  const chatContext = useContext(ChatContext);
  const messageContext = useContext(MessageContext);
  const userContext = useContext(UserContext);
  const inputRef = useRef(null);

  const username = userContext?.user?.username;

  // const typingList = (messageContext?.state?.typing || []).filter(name => name !== username);
  const typingList = (messageContext?.state?.typing || []);
  const isTyping = typingList.length > 0;

  const typingClasses = [
    styles.typing,
    isTyping ? styles['is-typing'] : '',
  ];
  const typingString = typingList.length === 1 ? 'other is typing' : 'others are typing';

  const onChange = (e: ChangeEvent) => {
    const input = e?.target?.value;
    if (input.length === 0) {
      messageContext.offTyping(username);
    } else {
      messageContext.onTyping(username);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e?.preventDefault();

    const content = inputRef?.current?.value || '';
    messageContext.sendMessage({
      chatUuid: chatContext?.chat?.uuid,
      content,
      timestamp: Date.now(),
      username,
    });

    inputRef.current.value = '';
    messageContext.offTyping(username);
  };

  return (<footer className={styles.wrapper}>
    <p className={typingClasses.join(' ')}>
      {typingList?.length} {typingString}
      <i className={styles.loading}></i>
      <i className={styles.loading}></i>
      <i className={styles.loading}></i>
    </p>
    <form action='/api/v1/chats' method='post' onSubmit={onSubmit}>
      <TextareaInput
        className={styles.input}
        onChange={onChange}
        placeholder='new message...'
        ref={inputRef}
      />
      <button type='submit'>Send</button>
    </form>
  </footer>);
};
