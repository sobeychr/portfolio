import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { ChatContext } from '@context/chat';
import { CHAT_COOKIE, DURATION_WEEK } from '@utils/configs';
import { getDocumentCookie, setDocumentCookie } from '@utils/cookie';
import styles from './styles.module.scss';

const LINKS = [
  { color: '#f00', icon: 'bank', id: 1, name: 'Chat 1' },
  { color: '#0f0', icon: 'building', id: 2, name: 'Chat 2' },
  { color: '#4040ff', icon: 'car-side', id: 3, name: 'Chat 3' },
  { color: '#ff0', icon: 'home', id: 4, name: 'Chat 4' },
  { color: '#f0f', icon: 'plane-alt', id: 5, name: 'Chat 5' },
  { color: '#0ff', icon: 'rocket-lunch', id: 6, name: 'Chat 6' },
  { color: '#f00', icon: 'truck-side', id: 7, name: 'Chat 7' },
];

const Link = ({ color, icon, id, name, onClick }) => {
  const style = {
    '--color': color,
    '--icon-image': `url(/icons/${icon}.svg)`,
  };

  return <a className={styles.link} href={`#${name}`} onClick={onClick(id)} style={style}>
    <span>{name}</span>
  </a>;
};

export const Sidebar = () => {
  const chatContext = useContext(ChatContext);
  const navRef = useRef(null);

  const onClick = useCallback((id: number) => (e: Event) => {
    e?.preventDefault();
    chatContext.setSelectedChat(id);
    setDocumentCookie(CHAT_COOKIE, id, { maxAge: DURATION_WEEK });
  }, []);

  const links = useMemo(() => (
    LINKS.map((entry, index) => <Link {...entry} key={entry.id || index} onClick={onClick} />)
  ), []);

  useEffect(() => {
    const lastChat = getDocumentCookie(CHAT_COOKIE) as number | undefined;
    if (!!lastChat) {
      chatContext.setSelectedChat(lastChat);
    } else {
      const nav = navRef?.current as HTMLElement;
      if (nav) {
        nav.firstChild?.click?.();
      }
    }
  }, []);

  return <aside className={styles.wrapper}>
    <nav ref={navRef}>
      {links.map(child => child)}
    </nav>
  </aside>;
};
