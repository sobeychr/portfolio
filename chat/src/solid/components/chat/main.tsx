import { useChatContext } from '@s-context/chat';
import { clampLoop } from '@utils/number';
import { ChatInput } from './input';
import { ChatList } from './list';
import styles from '@styles/components/chat/main.module.scss';

export const ChatMain = () => {
  const { chat, chatList } = useChatContext();

  const index = () => clampLoop(chat().index + 1, 1, chatList().length - 1) || 1;
  const classes = () => [
    styles['header-name'],
    styles[`chat-${index()}`],
  ];

  const style = () => ({
    '--icon-image': !chat()?.icon ? '' : `url(/icons/${chat().icon}.svg)`,
  });

  return (
    <main class={styles.main}>
      <header class={styles.header} style={style()}>
        <span class={classes().join(' ')}>
          {chat()?.name}
        </span>
      </header>
      <ChatList />
      <ChatInput />
    </main>
  );
};
