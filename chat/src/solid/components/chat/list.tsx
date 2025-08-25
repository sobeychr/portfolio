import { createEffect, For, Show } from 'solid-js';
import type { CMessage } from '@classes/CMessage';
import { useMessageContext } from '@s-context/message';
import styles from '@styles/components/chat/list.module.scss';

type ChatEntryParam = {
  prevDate: number;
  message: CMessage;
};

const ChatDate = ({ date }) => <div class={styles['date-split']}>{date.toISOString().split('T')?.[0]}</div>;

const ChatEntry = ({ message, prevDate }: ChatEntryParam) => {
  const currentDate = message.date.getDate();
  const isSame = prevDate === currentDate;

  return (<>
    <Show when={!isSame}>
      <ChatDate date={message.date} />
    </Show>
    <article class={styles.entry}>
      <header class={styles['entry-header']}>
        <span class={styles['entry-time']} data-title={message.dateStr}>{message.timeStr}</span>
        <span class={styles['entry-name']}>{message.username}</span>
      </header>
      <p class={styles['entry-content']}>
        {message.content}
      </p>
    </article></>);
};

export const ChatList = () => {
  const { getMessages, loadMessages } = useMessageContext();
  let scrollRef;

  createEffect(() => {
    scrollRef?.scrollIntoView?.();

    loadMessages();
  });

  return (
    <section class={styles.wrapper}>
      <For each={getMessages()}>
        {(entry, index) => {
          const prev = getMessages()[index() - 1];
          const prevDate = prev?.date.getDate() || 0;

          return <ChatEntry message={entry} prevDate={prevDate} />;
        }}
      </For>
      <div ref={scrollRef} />
    </section>);
};
