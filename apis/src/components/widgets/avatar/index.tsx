import { createSignal, For } from 'solid-js';
import { DelayController } from '@controllers/DelayController';
import styles from './styles.module.scss';

const AvatarEntry = ({ name, src }) => <p class={styles.entry}>
  <img alt={name} src={src} />
  <span>{name}</span>
</p>;

const AvatarWidget = () => {
  const [images, setImages] = createSignal([]);

  let delayRef;
  let logRef;
  let urlRef;

  const onSubmit = (e: Event) => {
    e.preventDefault();

    const delay = parseInt(delayRef?.value || '', 10) || 0;
    const url = new URL(urlRef?.value, window.location.origin);
    url.searchParams.append(DelayController.DELAY_GET, delay.toString());

    const start = new Date();
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        const prefixes = resp.content?.prefix || {};
        const avatars = resp.content?.avatars || [];

        const entries = avatars.map(entry => {
          const pref = prefixes[entry.image];
          const src = pref.replace('${name}', entry.name);

          return <AvatarEntry name={entry.name} src={src} />;
        });
        setImages(entries);
      })
      .catch(err => {
        console.error('[error]', err);
      })
      .finally(() => {
        const end = new Date();

        const startParsed = start.toTimeString().split(' ')?.[0];
        logRef.innerHTML = `requested ${startParsed}, delay ${end.getTime() - start.getTime()}ms`;
      });
  };

  return <section>
    <h2>Avatar widget</h2>

    <form onSubmit={onSubmit}>
      <p>
        <label for='url'>URL</label>
        <input type='text' id='url' value='/api/v1/avatar' readonly ref={urlRef} />
      </p>

      <p>
        <label for='delay'>Delay in ms <code>0 &lt;= delay &lt;= 2500</code></label>
        <input type='number' id='delay' min='0' max='2500' step='1' value='0' maxlength='4' size='4' ref={delayRef} />
      </p>

      <button type='submit'>Load</button>
    </form>

    <p ref={logRef} />

    <div class={styles.container}>
      <For each={images()}>
        {Entry => <Entry />}
      </For>
    </div>
  </section>;
};

export { AvatarWidget };
