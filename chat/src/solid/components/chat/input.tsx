import { TextareaInput } from '@s-components/input/TextareaInput';
import { useMessageContext } from '@s-context/message';
import styles from '@styles/components/chat/input.module.scss';

export const ChatInput = () => {
  const { typingCount, offTyping, onTyping, sendMessage } = useMessageContext();

  let inputRef;

  const typingClasses = () => ({
    [styles.typing]: true,
    [styles['is-typing']]: typingCount() > 0,
  });
  const typingString = () => typingCount() === 1 ? '1 other is typing' : `${typingCount()} others are typing`;

  const onKeyUp = (e: Event & KeyboardEvent) => {
    const input = e?.target?.value;
    if (input.length === 0) {
      offTyping();
    } else {
      onTyping();
    }

    const { altKey = false, ctrlKey = false, shiftKey = false, key = 0 } = e || {};
    const isSubmit = altKey || ctrlKey || shiftKey;
    if (key === 'Enter' && isSubmit) {
      onSubmit();
    }
  };

  const onSubmit = (e?: Event) => {
    e?.preventDefault();
    const content = (inputRef?.value || '').trim();

    if (content.length > 0) {
      sendMessage(content);
    }

    inputRef.value = '';
    offTyping();
  };

  return (<footer class={styles.wrapper}>
    <p classList={typingClasses()}>
      {typingString()}
      <i class={styles.loading}></i>
      <i class={styles.loading}></i>
      <i class={styles.loading}></i>
    </p>
    <form action='/api/v1/chats' method='post' onSubmit={onSubmit}>
      <TextareaInput
        class={styles.input}
        id='content'
        onKeyUp={onKeyUp}
        placeholder='new message...'
        ref={inputRef}
      />
      <button type='submit'>Send</button>
    </form>
  </footer>);
};
