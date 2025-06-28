import { createEffect, For, Show } from 'solid-js';
import { useChatContext } from '@s-context/chat';
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
  const { chat } = useChatContext();
  const { store } = useMessageContext();
  let scrollRef;

  const list = () => store.messages.filter(({ chatUuid }) => chatUuid === chat()?.uuid) || [];

  createEffect(() => {
    list();
    scrollRef?.scrollIntoView?.();
  });

  return (
    <section class={styles.wrapper}>
      <For each={list()}>
        {(entry, index) => {
          const prev = store.messages[index() - 1];
          const prevDate = prev?.date.getDate() || 0;

          return <ChatEntry message={entry} prevDate={prevDate} />;
        }}
      </For>
      <div ref={scrollRef} />
    </section>);
};
