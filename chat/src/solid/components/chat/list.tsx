import { useChatContext } from '@s-context/chat';
import styles from '@styles/components/chat/list.module.scss';
import { For } from 'solid-js';

export const ChatList = () => {
  const { chatList } = useChatContext();

  return (
    <section class={styles.wrapper}>
      <For each={chatList()}>
        {(entry, index) => {
          /*
          const prev = chatList()[index() - 1];
          const prevDate = prev?.date.getDate() || 0;


          return 'tt';
          */
        }}
      </For>
    </section>);
};
