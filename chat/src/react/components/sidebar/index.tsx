import { useMemo } from 'react';
import styles from './styles.module.scss';

const LINKS = [
  { color: '#f00', icon: 'bank' },
  { color: '#0f0', icon: 'building' },
  { color: '#4040ff', icon: 'car-side' },
  { color: '#ff0', icon: 'home' },
  { color: '#f0f', icon: 'plane-alt' },
  { color: '#0ff', icon: 'rocket-lunch' },
  { color: '#f00', icon: 'truck-side' },
];

const Link = ({ color, icon, index }) => {
  const style = {
    '--color': color,
    '--icon-image': `url(/icons/${icon}.svg)`,
  };

  return <a className={styles.link} href={`#chat-${index}`} style={style}>
    Chat &#35;{index}
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
