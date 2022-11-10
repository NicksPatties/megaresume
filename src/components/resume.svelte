<script lang="ts">
  import type { BasicsStore, WorkStore } from '@src/data/data';
  import { onInput } from '@src/util/eventListeners';
  import type { Writable } from 'svelte/store';
  import WorkResume from './workResume.svelte';
  import { onMount } from 'svelte';

  export let basics: BasicsStore;
  export let work: Writable<WorkStore[]>;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;

  let scaleControl = 1;

  function scaleResume() {
    const resumeHeight = 1056; // 11in
    const margin = 42;
    const fittedResumeHeight = window.innerHeight - margin * 2;
    const scale = fittedResumeHeight / resumeHeight;
    const resumeNode: HTMLElement | null = document.querySelector('.resume-container');
    if (resumeNode != undefined) resumeNode.style.transform = `scale(${scale * scaleControl})`;
  }

  onMount(() => {
    scaleResume();
    onresize = scaleResume;
    // zoom controls
    const zoomIn = document.getElementById('zoom-in');
    if (zoomIn != undefined)
      zoomIn.onclick = () => {
        scaleControl += 0.1;
        scaleResume();
      };
    const zoomOut = document.getElementById('zoom-out');
    if (zoomOut != undefined)
      zoomOut.onclick = () => {
        scaleControl -= 0.1;
        scaleResume();
      };
  });
</script>

<div class="resume-container">
  <div class="resume">
    <!-- This is where the theme information will be placed in the future -->
    <div class="basics">
      <input
        id="basic_information-name"
        class="name"
        type="text"
        placeholder="Firstname Lastname"
        value={$name}
        on:input={(e) => onInput(e, name)}
      />
      <input
        id="label"
        class="subname"
        type="text"
        placeholder="Job Title"
        value={$label}
        on:input={(e) => onInput(e, label)}
      />
      <input
        id="phone"
        class="subname"
        type="text"
        placeholder="+15555555555"
        value={$phone}
        on:input={(e) => onInput(e, phone)}
      />
      <input
        id="email"
        class="subname"
        type="text"
        placeholder="placeholder@email.com"
        value={$email}
        on:input={(e) => onInput(e, email)}
      />
    </div>
    <div class="experience">
      <h3>Work Experience</h3>
      <ul>
        {#each $work as w}
          <WorkResume
            name={w.name}
            position={w.position}
            startDate={w.startDate}
            endDate={w.endDate}
            highlights={w.highlights}
          />
        {/each}
      </ul>
    </div>
  </div>
  <div class="resume-overflow-warning">
    <!-- This is where the theme information will be placed in the future -->
    <div class="basics">
      <input
        id="basic_information-name"
        class="name"
        type="text"
        placeholder="Firstname Lastname"
        value={$name}
        on:input={(e) => onInput(e, name)}
      />
      <input
        id="label"
        class="subname"
        type="text"
        placeholder="Job Title"
        value={$label}
        on:input={(e) => onInput(e, label)}
      />
      <input
        id="phone"
        class="subname"
        type="text"
        placeholder="+15555555555"
        value={$phone}
        on:input={(e) => onInput(e, phone)}
      />
      <input
        id="email"
        class="subname"
        type="text"
        placeholder="placeholder@email.com"
        value={$email}
        on:input={(e) => onInput(e, email)}
      />
    </div>
    <div class="experience">
      <h3>Work Experience</h3>
      <ul>
        {#each $work as w}
          <WorkResume
            name={w.name}
            position={w.position}
            startDate={w.startDate}
            endDate={w.endDate}
            highlights={w.highlights}
          />
        {/each}
      </ul>
    </div>
  </div>
</div>
<div class="controls-container">
  <button id="zoom-in">+</button>
  <button id="zoom-out">-</button>
</div>

<style>
  :root {
    --A4height: 1056px; /* 11in */
    --A4width: 816px; /* 8.5in */
    --pointFiveIn: 48px;
  }

  .resume-container {
    transform-origin: center top;
    height: var(--A4height);
    width: var(--A4width);
    background: white;
    box-shadow: 0px 0px 9px black;
    transform: scale(1);
    margin: 42px auto;
  }

  .resume {
    position: absolute;
    overflow: hidden;
    top: 0;
    z-index: 5;
    margin: var(--pointFiveIn);
    width: calc(var(--A4width) - 2 * var(--pointFiveIn));
    height: calc(var(--A4height) - 2 * var(--pointFiveIn));
    background: white;
  }

  /* Theme classes and such */

  .resume-overflow-warning {
    position: absolute;
    top: 0;
    width: calc(var(--A4width) - 2 * var(--pointFiveIn));
    z-index: 0;
    margin: var(--pointFiveIn);
    color: red;
  }

  .resume-container input {
    border: none;
    font-family: 'Times New Roman', Times, serif;
  }

  .basics {
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-bottom: 0.25in;
  }

  .name {
    font-size: 24px;
  }

  .subname {
    font-size: 18px;
  }

  ul {
    font-size: 18px;
  }

  .controls-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 20px;
    right: 20px;
  }

  .controls-container button {
    margin-top: 8px;
  }
</style>
