/** @jsxImportSource solid-js */
import { onMount } from 'solid-js';

export const App = () => {
  onMount(() => {
    console.log('solid mounted');
  });

  return <h1>solid</h1>;
};
