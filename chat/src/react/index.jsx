import { createRoot } from 'react-dom/client';
import { Main } from '@core/Main';

(function (win, doc) {
  const roots = new Map();

  const mount = (nodeId, params = {}) => {
    const node = doc.getElementById(nodeId);

    if (!node) {
      console.error(`[onMount()] Unable to mount DOM element #${nodeId}`);
    } else {
      const prevRoot = roots.get(nodeId);
      if (prevRoot) {
        prevRoot.render(<Main {...params} />);
      } else {
        const root = createRoot(node);
        root.render(<Main {...params} />);
        roots.set(nodeId, root);
      }
    }
  };

  const unmount = (nodeId) => {
    const prevRoot = roots.get(nodeId);

    if (!prevRoot) {
      console.error(`[onUnmount()] Unable to unmount DOM element #${nodeId}`);
    } else {
      prevRoot.unmount();
      roots.delete(nodeId);
    }
  };

  if (!win.__CHAT) win.__CHAT = {
    mount,
    unmount,
  };
})(window, document);
