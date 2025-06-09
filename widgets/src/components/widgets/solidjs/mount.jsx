import { render } from 'solid-js/web';

import SolidJsWidget from '.';

(function (win) {
  const roots = new Map();

  const onMount = (nodeId) => {
    const node = document.getElementById(nodeId);

    if (!node) {
      console.error(`[onMount()] unable to mount DOM element #${nodeId}`);
    } else {
      if (!roots.has(nodeId)) {
        console.warn(`[onMount()] unable to mount twice DOM element #${nodeId}`);
      } else {
        const disposer = render(() => <SolidJsWidget />, node);
        roots.set(nodeId, disposer);
      }
    }
  };

  const onUnmount = (nodeId) => {
    if (!roots.has(nodeId)) {
      console.error(`[onUnmount()] unable to unmount DOM element #${nodeId}`);
    } else {
      const prevDisposer = roots.get(nodeId);
      prevDisposer();
      roots.delete(nodeId);
    }
  };

  if (!win.widgets) win.widgets = {};
  if (!win.widgets.solidjs) win.widgets.solidjs = {};
  win.widgets.solidjs.onMount = onMount;
  win.widgets.solidjs.onUnmount = onUnmount;
})(window);
