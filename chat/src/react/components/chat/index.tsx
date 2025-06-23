import { useContext } from 'react';
import { ChatContext } from '@context/chat';
import { clampLoop } from '@utils/number';
import { useChat } from '@components/hooks/useChat';
import styles from './styles.module.scss';

export const Chat = () => {
  const chatContext = useContext(ChatContext);
  const chatCurrent = chatContext.chat;
  const { onNewUser } = useChat();

  const index = clampLoop(chatContext.chatIndex + 1, 1, chatContext.chatList.length - 1);
  const classes = [
    styles.header,
    styles[`chat-${index}`],
  ];

  const style = {
    '--icon-image': !chatCurrent?.icon ? '' : `url(/icons/${chatCurrent.icon}.svg)`,
  };

  const onClick = onNewUser;

  return <header className={classes.join(' ')} style={style} onClick={onClick}>
    {chatCurrent?.name}
  </header>;
};
