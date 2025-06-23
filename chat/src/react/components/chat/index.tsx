import { useContext } from 'react';
import { ChatContext } from '@context/chat';
import { clampLoop } from '@utils/number';
import styles from './styles.module.scss';

export const Chat = () => {
  const chatContext = useContext(ChatContext);
  const chat = chatContext.chat;

  const index = clampLoop(chatContext.chatIndex + 1, 1, chatContext.chatList.length - 1);
  const classes = [
    styles.header,
    styles[`chat-${index}`],
  ];

  const style = {
    '--icon-image': !chat?.icon ? '' : `url(/icons/${chat.icon}.svg)`,
  };

  return <header className={classes.join(' ')} style={style}>
    {chat?.name}
  </header>;
};
