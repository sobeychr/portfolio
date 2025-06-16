import { createSignal } from 'solid-js';
import { dateToTimeString } from '@utils/date';
import styles from './styles.module.scss';

const URL_API = '/api/v1/cache';

const CacheWidget = () => {
  const [cache, setCache] = createSignal('');
  const [log, setLog] = createSignal('');

  const onDelete = () => {
    const request = new URL(URL_API, window.location.origin);

    const start = new Date();
    fetch(request,
      { method: 'delete' }
    )
      .catch(err => {
        console.error('[error]', err);
      })
      .finally(() => {
        const end = new Date();
        const startParsed = dateToTimeString(start);
        setLog(`deleted ${startParsed}, delay ${end.getTime() - start.getTime()}ms`);
      });
  };

  const onLoad = () => {
    const request = new URL(URL_API, window.location.origin);

    const start = new Date();
    fetch(request)
      .then(resp => resp.json())
      .then(resp => {
        const content = resp?.content || {};

        const avatarExp = content?.avatars?.randomAvatar?.expire;
        const avatarDate = avatarExp && new Date(avatarExp * 1000);

        const textExp = content?.texts?.randomText?.expire;
        const textDate = textExp && new Date(textExp * 1000);

        const strs = [
          `Avatars: ${avatarDate && dateToTimeString(avatarDate)}`,
          `Texts: ${textDate && dateToTimeString(textDate)}`,
        ];
        setCache(strs.join('\n'));
      })
      .catch(err => {
        console.error('[error]', err);
      })
      .finally(() => {
        const end = new Date();
        const startParsed = dateToTimeString(start);
        setLog(`loaded ${startParsed}, delay ${end.getTime() - start.getTime()}ms`);
      });
  };

  const onSubmit = (e: Event) => e.preventDefault();

  return <section class={styles.container}>
    <h2>Cache widget</h2>

    <form onSubmit={onSubmit}>
      <button type='button' onClick={onLoad}>Load caches</button>
      <button type='button' onClick={onDelete}>Delete caches</button>
    </form>

    <p>{log()}</p>

    <code>{cache()}</code>
  </section>;
};

export { CacheWidget };
