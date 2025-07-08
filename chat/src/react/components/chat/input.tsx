import { type ChangeEvent, type FormEvent, type KeyboardEvent, useContext, useRef } from 'react';
import { TextareaInput } from '@r-components/input/TextareaInput';
import { MessageContext } from '@r-context/message';
import styles from '@styles/components/chat/input.module.scss';

export const ChatInput = () => {
  const { onTyping, offTyping, sendMessage, typingCount } = useContext(MessageContext);
  const inputRef = useRef(null);

  const isTyping = typingCount > 0;

  const typingClasses = [
    styles.typing,
    isTyping ? styles['is-typing'] : '',
  ];
  const typingString = typingCount === 1 ? '1 other is typing' : `${typingCount} others are typing`;

  const onChange = (e: ChangeEvent) => {
    const input = e?.target?.value;
    if (input.length === 0) {
      offTyping();
    } else {
      onTyping();
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    const { altKey = false, ctrlKey = false, shiftKey = false, key = 0 } = e || {};
    const isSubmit = altKey || ctrlKey || shiftKey;
    if (key === 'Enter' && isSubmit) {
      onSubmit();
    }
  };

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    const content = (inputRef?.current?.value || '').trim();

    if (content.length > 0) {
      sendMessage(content);
    }

    inputRef.current.value = '';
    offTyping();
  };

  return (<footer className={styles.wrapper}>
    <p className={typingClasses.join(' ')}>
      {typingString}
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
