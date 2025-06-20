import { useMemo } from 'react';
import styles from './styles.module.scss';

const LINKS = [
  { color: '#f00', icon: 'bank', name: 'Chat 0' },
  { color: '#0f0', icon: 'building', name: 'Chat 1' },
  { color: '#4040ff', icon: 'car-side', name: 'Chat 2' },
  { color: '#ff0', icon: 'home', name: 'Chat 3' },
  { color: '#f0f', icon: 'plane-alt', name: 'Chat 4' },
  { color: '#0ff', icon: 'rocket-lunch', name: 'Chat 5' },
  { color: '#f00', icon: 'truck-side', name: 'Chat 6' },
];

const Link = ({ color, icon, index, name }) => {
  const style = {
    '--color': color,
    '--icon-image': `url(/icons/${icon}.svg)`,
  };

  return <a className={styles.link} href={`#chat-${index}`} style={style}>
    <span>{name}</span>
  </a>;
};

export const Sidebar = () => {

  const links = useMemo(() => (
    LINKS.map((entry, index) => <Link {...entry} key={index} index={index} />)
  ), []);

  return <aside className={styles.wrapper}>
    <nav>
      {links.map(child => child)}
    </nav>
  </aside>;
};
