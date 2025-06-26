import { useContext } from 'react';
import { ChatContext } from '@context/chat';
import { clampLoop } from '@utils/number';
import { ChatInput } from './input';
import { ChatList } from './list';
import styles from './styles-main.module.scss';

export const ChatMain = () => {
  const chatContext = useContext(ChatContext);
  const chatCurrent = chatContext.chat;

  const index = clampLoop(chatCurrent.index + 1, 1, chatContext.chatList.length - 1);
  const classes = [
    styles['header-name'],
    styles[`chat-${index}`],
  ];

  const style = {
    '--icon-image': !chatCurrent?.icon ? '' : `url(/icons/${chatCurrent.icon}.svg)`,
  };

  return (
    <main className={styles.main}>
      <header className={styles.header} style={style}>
        <span className={classes.join(' ')}>
          {chatCurrent?.name}
        </span>
        <span className={styles['user-count']}>
        </span>
      </header>
      <ChatList />
      <ChatInput />
    </main>
  );
};
