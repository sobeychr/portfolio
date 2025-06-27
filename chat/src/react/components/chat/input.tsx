import { type ChangeEvent, type FormEvent, type KeyboardEvent, useContext, useRef } from 'react';
import { TextareaInput } from '@r-components/input/TextareaInput';
import { ChatContext } from '@r-context/chat';
import { MessageContext } from '@r-context/message';
import { UserContext } from '@r-context/user';
import styles from '@styles/components/chat/input.module.scss';

export const ChatInput = () => {
  const chatContext = useContext(ChatContext);
  const messageContext = useContext(MessageContext);
  const userContext = useContext(UserContext);
  const inputRef = useRef(null);

  const username = userContext?.user?.username;

  // const typingList = (messageContext?.typing || []).filter(name => name !== username);
  const typingList = (messageContext?.typing || []);
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

  const onKeyUp = (e: KeyboardEvent) => {
    const { altKey = false, ctrlKey = false, shiftKey = false, keyCode = 0 } = e || {};
    const isSubmit = altKey || ctrlKey || shiftKey;
    if (keyCode === 13 && isSubmit) {
      onSubmit();
    }
  };

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    const content = (inputRef?.current?.value || '').trim();

    if (content.length > 0) {
      messageContext.sendMessage({
        chatUuid: chatContext?.chat?.uuid,
        content,
        timestamp: Date.now(),
        username,
      });
    }

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
        id='content'
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder='new message...'
        ref={inputRef}
      />
      <button type='submit'>Send</button>
    </form>
  </footer>);
};
