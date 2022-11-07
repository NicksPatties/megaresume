<script lang="ts">
  import Input from '@src/components/input.svelte';
  import type { BasicsStore, WorkStore, EducationStore } from '@src/data/data';
  import type { Writable } from 'svelte/store';
  import WorkMenu from '@src/components/workMenu.svelte';
  import EducationMenu from './educationMenu.svelte';

  let open = false;

  export let basics: BasicsStore;
  export let work: Writable<WorkStore[]>;
  export let education: Writable<EducationStore[]>;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;
</script>

<button
  class="open-button"
  on:click={() => {
    open = true;
  }}>Open</button
>
<div class="menu {open ? 'open' : ''}">
  <div class="menu-header">
    <button
      class="close-button"
      on:click={() => {
        open = false;
      }}>Close</button
    >
    <h1>MegaResume</h1>
  </div>

  <Input label={'Name'} value={name} />
  <Input label={'Title'} value={label} />
  <Input label={'Phone'} value={phone} />
  <Input label={'Email'} value={email} />

  <h3>Work Experience</h3>
  <div class="menu-content">
    {#each $work as w}
      <WorkMenu
        name={w.name}
        position={w.position}
        startDate={w.startDate}
        endDate={w.endDate}
        summary={w.summary}
        highlights={w.highlights}
      />
    {/each}
  </div>

  <h3>Education</h3>
  <div class="menu-content">
    {#each $education as edu}
      <EducationMenu
        studyType={edu.studyType}
        institution={edu.institution}
        area={edu.area}
        startDate={edu.startDate}
        endDate={edu.endDate}
        score={edu.score}
      />
    {/each}
  </div>
</div>

<style>
  :root {
    --menu-width: 375px;
    --side-padding: 12px;
  }

  .open-button {
    z-index: 1;
    left: var(--side-padding);
    top: 10.25px;
    position: fixed;
  }

  .menu-header {
    display: flex;
    align-items: center;
    height: 42px;
  }

  .close-button {
    position: absolute;
    left: 12px;
    top: 10.25px;
  }

  .menu-header h1 {
    margin: auto;
    position: sticky;
  }

  .menu {
    z-index: 10;
    position: fixed;
    top: 0;
    left: calc((var(--menu-width) + 2 * var(--side-padding)) * -1);
    height: 100vh;
    overflow-y: scroll;
    width: var(--menu-width);
    background: lightgray;
    transition: left ease 0.3s;
    padding: 0 var(--side-padding);
  }

  .menu.open {
    left: 0;
  }

  h3 {
    margin-bottom: 8px;
  }
</style>
