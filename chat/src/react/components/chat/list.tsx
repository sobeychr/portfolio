import { useContext } from 'react';
import type { CMessage } from '@classes/CMessage';
import { ChatContext } from '@context/chat';
import { MessageContext } from '@context/message';
import styles from './styles-list.module.scss';

type ChatEntryParam = {
  message: CMessage;
};

const ChatEntry = ({ message }: ChatEntryParam) => {
  return <article>
    <header>
      {message.username}
    </header>
    <p>
      {message.content}
    </p>
    <footer>
      {message.timestamp}
    </footer>
  </article>;
};

export const ChatList = () => {
  const chatContext = useContext(ChatContext);
  const messageContext = useContext(MessageContext);

  const currentChat = chatContext?.chat?.uuid;
  const messages = (messageContext?.messages || []).filter(({ chatUuid }) => chatUuid === currentChat);

  return (
    <section className={styles.wrapper}>
      {messages.map(entry => {
        const key = `${entry.chatUuid}-${entry.timestamp}`;
        return <ChatEntry key={key} message={entry} />;
      })}
    </section>);
};
