import { useContext, useEffect, useMemo, useRef } from 'react';
import type { CMessage } from '@classes/CMessage';
import { ChatContext } from '@r-context/chat';
import { MessageContext } from '@r-context/message';
import styles from '@styles/components/chat/list.module.scss';

type ChatEntryParam = {
  prevDate: number;
  message: CMessage;
};

const ChatDate = ({ date }) => <div className={styles['date-split']}>{date.toISOString().split('T')?.[0]}</div>;

const ChatEntry = ({ message, prevDate }: ChatEntryParam) => {
  const currentDate = message.date.getDate();
  const isSame = prevDate === currentDate;

  return (<>
    {!isSame && <ChatDate date={message.date} />}
    <article className={styles.entry}>
      <header className={styles['entry-header']}>
        <span className={styles['entry-time']} data-title={message.dateStr}>{message.timeStr}</span>
        <span className={styles['entry-name']}>{message.username}</span>
      </header>
      <p className={styles['entry-content']}>
        {message.content}
      </p>
    </article></>);
};

export const ChatList = () => {
  const chatContext = useContext(ChatContext);
  const { getMessages, loadMessages } = useContext(MessageContext);
  const scrollRef = useRef(null);

  const currentChat = chatContext?.chat?.uuid;
  const list = getMessages();

  const messages = useMemo(() => {
    return list.map((entry, index) => {
      const prev = list[index - 1];
      const prevDate = prev?.date.getDate() || 0;

      return <ChatEntry key={entry.key} message={entry} prevDate={prevDate} />;
    });
  }, [currentChat, list.length]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView?.();

    loadMessages();
  }, [currentChat, list.length]);

  return (
    <section className={styles.wrapper}>
      {messages}
      <div ref={scrollRef} />
    </section>);
};
