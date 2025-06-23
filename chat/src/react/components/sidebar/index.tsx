import { useCallback, useContext, useEffect, useRef } from 'react';
import { ChatContext } from '@context/chat';
import { CHAT_COOKIE, DURATION_WEEK } from '@utils/configs';
import { getDocumentCookie, setDocumentCookie } from '@utils/cookie';
import styles from './styles.module.scss';

const Link = ({ color, icon, id, name, onClick }) => {
  const style = {
    '--color': color,
    '--icon-image': `url(/icons/${icon}.svg)`,
  };

  return <a className={styles.link} href={`#${name}`} onClick={onClick(id)} style={style}>
    <span className={styles['link-name']}>{name}</span>
  </a>;
};

export const Sidebar = () => {
  const chatContext = useContext(ChatContext);
  const chatLength = chatContext.chatList.length;
  const navRef = useRef(null);

  const onClick = useCallback((id: string) => (e: Event) => {
    e?.preventDefault();

    chatContext.setChatById(id);
    setDocumentCookie(CHAT_COOKIE, id, { maxAge: DURATION_WEEK });
  }, [chatLength]);

  const links = chatContext.chatList.map(entry => <Link {...entry} key={entry.uuid} id={entry.uuid} onClick={onClick} />);

  useEffect(() => {
    if (chatLength > 0) {
      const lastChat = getDocumentCookie(CHAT_COOKIE) as string | undefined;
      if (!!lastChat) {
        chatContext.setChatById(lastChat);
      } else {
        navRef?.current?.firstChild?.click?.();
      }
    }
  }, [chatLength]);

  return <aside className={styles.wrapper}>
    <nav ref={navRef}>
      {links.map(child => child)}
    </nav>
  </aside>;
};
