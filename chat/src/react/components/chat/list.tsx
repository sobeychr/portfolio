import { useContext } from 'react';
import type { CMessage } from '@classes/CMessage';
import { ChatContext } from '@context/chat';
import { MessageContext } from '@context/message';
import styles from './styles-list.module.scss';

type ChatEntryParam = {
  message: CMessage;
};

const ChatEntry = ({ message }: ChatEntryParam) => {
  return <article className={styles.entry}>
    <header className={styles['entry-header']}>
      <span className={styles['entry-time']} data-title={message.dateStr}>{message.timeStr}</span>
      <span className={styles['entry-name']}>{message.username}</span>
    </header>
    <p className={styles['entry-content']}>
      {message.content}
    </p>
  </article>;
};

export const ChatList = () => {
  const chatContext = useContext(ChatContext);
  const messageContext = useContext(MessageContext);

  const currentChat = chatContext?.chat?.uuid;
  const messages = (messageContext?.messages || []).filter(({ chatUuid }) => chatUuid === currentChat);

  return (
    <section className={styles.wrapper}>
      {messages.map(entry => <ChatEntry key={entry.key} message={entry} />)}
    </section>);
};
