import { useMessageContext } from '@s-context/message';
import { TextareaInput } from '@s-components/input/TextareaInput';
import styles from '@styles/components/chat/input.module.scss';
import { useChatContext } from '@s-context/chat';
import { useUserContext } from '@s-context/user';

export const ChatInput = () => {
  const { chat } = useChatContext();
  const { offTyping, onTyping, sendMessage, store } = useMessageContext();
  const { user } = useUserContext();

  let inputRef;

  // const isTyping = () => store.typing.filter(name => name !== username).length > 0;
  const isTyping = () => store.typing.length > 0;

  const typingClasses = () => ({
    [styles.typing]: true,
    [styles['is-typing']]: isTyping(),
  });

  const onKeyUp = (e: Event & KeyboardEvent) => {
    const input = e?.target?.value;
    if (input.length === 0) {
      offTyping(user().username);
    } else {
      onTyping(user().username);
    }

    const { altKey = false, ctrlKey = false, shiftKey = false, keyCode = 0 } = e || {};
    const isSubmit = altKey || ctrlKey || shiftKey;
    if (keyCode === 13 && isSubmit) {
      onSubmit();
    }
  };

  const onSubmit = (e?: Event) => {
    e?.preventDefault();
    const content = (inputRef?.value || '').trim();

    if (content.length > 0) {
      sendMessage({
        chatUuid: chat()?.uuid,
        content,
        timestamp: Date.now(),
        username: user().username,
      });
    }

    inputRef.value = '';
    offTyping(user().username);
  };

  return (<footer class={styles.wrapper}>
    <p classList={typingClasses()}>
      alpha
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
