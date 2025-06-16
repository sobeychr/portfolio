import { LoaderWidget } from '@widgets/loader';
import styles from './styles.module.scss';

const AvatarEntry = ({ name, src }) => <p class={styles.entry}>
  <img alt={name} src={src} />
  <span>{name}</span>
</p>;

const AvatarWidget = () => {
  const onComplete = resp => {
    const prefixes = resp.content?.prefix || {};
    const avatars = resp.content?.avatars || [];

    const entries = avatars.map(entry => {
      const pref = prefixes[entry.image];
      const src = pref.replace('${name}', entry.name);

      return <AvatarEntry name={entry.name} src={src} />;
    });

    return entries;
  };

  return <LoaderWidget
    onComplete={onComplete}
    title='Avatar'
    url='/api/v1/avatar'
  />;
};

export { AvatarWidget };
