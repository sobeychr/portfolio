import { For } from 'solid-js';
import { useChatContext } from '@s-context/chat';
import { CHAT_COOKIE, DURATION_WEEK } from '@utils/configs';
import { setDocumentCookie } from '@utils/cookie';
import styles from '@styles/components/sidebar/styles.module.scss';

const Link = ({ color, icon, name, onClick }) => {
  const style = {
    '--color': color,
    '--icon-image': `url(/icons/${icon}.svg)`,
  };

  return <a class={styles.link} href={`#${name}`} onClick={onClick} style={style}>
    <span class={styles['link-name']}>{name}</span>
  </a>;
};

export const Sidebar = () => {
  const { chatList, setChatById } = useChatContext();

  const onClick = (id: string, e: Event) => {
    e?.preventDefault();

    setChatById(id);
    setDocumentCookie(CHAT_COOKIE, id, { maxAge: DURATION_WEEK });
  };

  return <aside class={styles.wrapper}>
    <nav>
      <For each={chatList()}>
        {entry => <Link {...entry} id={entry.uuid} onClick={[onClick, entry.uuid]} />}
      </For>
    </nav>
  </aside>;
};
