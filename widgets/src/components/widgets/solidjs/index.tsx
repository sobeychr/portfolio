import { createEffect, createSignal, onMount } from 'solid-js';
import styles from './styles.module.scss';

const getRandom = () => Math.floor(Math.random() * 100);

const SolidJsWidget = () => {
  let container;

  const [number, setNumber] = createSignal(getRandom());

  const onAdd = () => setNumber(getRandom());

  const onWipe = () => {
    container.innerHTML = '';
    onAdd();
  };

  createEffect(() => {
    const newLine = `<li>${number()}</li>`;
    container.insertAdjacentHTML('afterbegin', newLine);
  });

  onMount(() => {
    console.log('Mounting SolidJs widget');
  });

  return <section class={styles.wrapper}>
    <header>
      <h2>Solid JS Widget</h2>
    </header>

    <button class={styles.button} onClick={onAdd}>Add number</button>
    <button class={styles.button} onClick={onWipe}>Wipe</button>

    <p>Curent number: {number()}</p>
    <p>prev numbers</p>
    <ul ref={container} />
  </section>;
};

export default SolidJsWidget;
