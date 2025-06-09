import { onMount } from 'solid-js';

const CONTAINER_ID = 'widget';
const MANIFEST_URL = '/widgets/manifest.json';

const numLeading = (num: number, leading = 2) => num.toString().padStart(leading, '0');

const SubchildWidget = () => {
  let logger;

  const onAdd = () => {
    onLog(`adding widget`);
    window?.widgets?.solidjs?.onMount?.(CONTAINER_ID);
  };

  const onLog = msg => {
    const da = new Date();
    const timeStr = `${numLeading(da.getMinutes())}:${numLeading(da.getSeconds())}.${numLeading(da.getMilliseconds(), 3)}`;
    logger.insertAdjacentHTML('beforeend', `<li>[${timeStr}] - ${msg}</li>`);
  };

  const onRemove = () => {
    onLog(`removing widget`);
    window?.widgets?.solidjs?.onUnmount?.(CONTAINER_ID);
  };

  onMount(() => {
    fetch(MANIFEST_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Unable to load file');
        }
        onLog(`finished loading manifest file "${MANIFEST_URL}"`);

        return res.json();
      })
      .then(data => {
        const files = data?.files || [];
        onLog(`found ${files.length} files`);

        const tags = data?.tags || [];
        tags.forEach(({ attributes = {}, tag }) => {
          const element = document.createElement(tag);
          Object.keys(attributes).forEach(attr => {
            element[attr] = attributes[attr];
          });
          document.head.appendChild(element);
        });

        onLog(`finished adding tags`);
      })
      .catch(() => {
        onLog(`unable to load manifest file "${MANIFEST_URL}"`);
      });
  });

  return <section class='widget'>
    <header>
      <h2>Sub-Child Widget</h2>
    </header>

    <button onClick={onAdd}>Add widget</button>
    <button onClick={onRemove}>Remove widget</button>

    <ol ref={logger} />

    <div id={CONTAINER_ID} />
  </section>;
};

export default SubchildWidget;
