import { useContext, useMemo } from 'react';
import type { CMessage } from '@classes/CMessage';
import { ChatContext } from '@context/chat';
import { MessageContext } from '@context/message';
import styles from './styles-list.module.scss';

type ChatEntryParam = {
  message: CMessage;
};

const ChatDate = ({ date }) => {
  return <div className={styles['date-split']}>{date.toISOString().split('T')?.[0]}</div>;
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
  const list = (messageContext?.messages || []).filter(({ chatUuid }) => chatUuid === currentChat);

  const messages = useMemo(() => {
    return list.map((entry, index) => {
      const prev = list[index - 1];
      const prevDate = prev?.date.getDate() || 0;
      const currentDate = entry.date.getDate();
      const isSame = prevDate === currentDate;

      return (<>
        {isSame ? '' : <ChatDate key={prevDate} date={entry.date} />}
        <ChatEntry key={entry.key} message={entry} />
      </>);
    });
  }, [currentChat, list.length]);

  return (
    <section className={styles.wrapper}>
      {messages}
    </section>);
};
