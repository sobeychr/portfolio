import { createSignal, For } from 'solid-js';
import { DelayController } from '@controllers/DelayController';
import { dateToTimeString } from '@utils/date';
import styles from './styles.module.scss';

const LoaderWidget = ({ onComplete, title, url }) => {
  const [entries, setEntries] = createSignal([]);
  const [isLoading, setIsLoading] = createSignal(false);
  const [log, setLog] = createSignal('');

  let delayRef;

  const onSubmit = (e: Event) => {
    e.preventDefault();

    if (isLoading()) {
      return false;
    }

    const delay = parseInt(delayRef?.value || '', 10) || 0;
    const request = new URL(url, window.location.origin);
    request.searchParams.append(DelayController.DELAY_GET, delay.toString());

    const start = new Date();
    setEntries([]);
    setIsLoading(true);
    setLog('loading...');

    fetch(request)
      .then(resp => resp.json())
      .then(resp => {
        const data = onComplete(resp);
        setEntries(data);
      })
      .catch(err => {
        console.error('[error]', err);
      })
      .finally(() => {
        const end = new Date();
        const startParsed = dateToTimeString(start);
        setIsLoading(false);
        setLog(`requested ${startParsed}, delay ${end.getTime() - start.getTime()}ms`);
      });
  };

  return <section>
    <h2>{title} widget</h2>

    <form onSubmit={onSubmit}>
      <p>
        <label for='url'>URL</label>
        <input type='text' id='url' value={url} readonly />
      </p>

      <p>
        <label for='delay'>Delay in ms <code>0 &lt;= delay &lt;= 2500</code></label>
        <input type='number' id='delay' min='0' max='2500' step='1' value='0' maxlength='4' size='4' ref={delayRef} />
      </p>

      <button type='submit' disabled={isLoading()}>Load</button>
    </form>

    <p>{log()}</p>

    <div class={styles.container}>
      <For each={entries()}>
        {Entry => <Entry class={styles.entry} />}
      </For>
    </div>
  </section>;
};

export { LoaderWidget };
