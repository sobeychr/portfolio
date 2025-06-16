import { LoaderWidget } from '@widgets/loader';
import styles from './styles.module.scss';

const TextEntry = ({ text, title }) => <article class={styles.entry}>
  <header>{title}</header>
  <p>{text}</p>
</article>;

const TextWidget = () => {
  const onComplete = resp => {
    const content = resp.content || [];

    const entries = content.map(entry => {
      return <TextEntry text={entry.text} title={entry.title} />;
    });

    return entries;
  };

  return <LoaderWidget
    onComplete={onComplete}
    title='Text'
    url='/api/v1/text'
  />;
};

export { TextWidget };
