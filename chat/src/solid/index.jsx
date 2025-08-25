import { hydrate, render } from 'solid-js/web';
import { App } from '@s-core/App';

(function (win, doc) {
  const roots = new Map();

  const mount = (nodeId, params = {}) => {
    const node = doc.getElementById(nodeId);

    if (!node) {
      console.error(`[onMount()] Unable to mount DOM element #${nodeId}`);
    } else {
      const prevRoot = roots.get(nodeId);
      if (prevRoot) {
        hydrate(
          () => <App {...params} />,
          node,
        );
      } else {
        const disposer = render(
          () => <App {...params} />,
          node,
        );
        roots.set(nodeId, disposer);
      }
    }
  };

  const unmount = (nodeId) => {
    const prevRoot = roots.get(nodeId);

    if (!prevRoot) {
      console.error(`[onUnmount()] Unable to unmount DOM element #${nodeId}`);
    } else {
      prevRoot();
      roots.delete(nodeId);
    }
  };

  if (!win.__CHAT) win.__CHAT = {
    mount,
    unmount,
  };
})(window, document);
