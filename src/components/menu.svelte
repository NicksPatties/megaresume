<script lang="ts">
  import type { BasicsStore, WorkStore, EducationStore } from '../data/data';
  import { onInput } from '../util/eventListeners';
  import type { Writable } from 'svelte/store';
  import WorkMenu from '../components/workMenu.svelte';
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

  <li>
    <input id="basic-info-menu" type="checkbox" />
    <label for="basic-info-menu">Basic info</label>
    <div class="menu-content">
      <label for="name">Name</label>
      <input id="name" type="text" value={$name} on:input={(e) => onInput(e, name)} />

      <label for="title">Title</label>
      <input id="title" type="text" value={$label} on:input={(e) => onInput(e, label)} />

      <label for="contact">Phone</label>
      <input id="contact" type="text" value={$phone} on:input={(e) => onInput(e, phone)} />

      <label for="location">Email</label>
      <input id="location" type="text" value={$email} on:input={(e) => onInput(e, email)} />
    </div>
  </li>

  <li>
    <input id="work-menu" type="checkbox" />
    <label for="work-menu">Work</label>
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
  </li>

  <li>
    <input id="education-menu" type="checkbox" />
    <label for="education-menu">Education</label>
    <div class="menu-content">
      {#each $education as edu}
        <EducationMenu
          studyType={edu.studyType}
          institution={edu.institution}
          area={edu.area}
          startDate={edu.startDate}
          endDate={edu.endDate}
          score={edu.score}
          courses={edu.courses}
        />
      {/each}
    </div>
  </li>
</div>

<style>
  .open-button {
    z-index: 1;
    left: 12px;
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
  }

  .menu {
    z-index: 10;
    position: fixed;
    top: 0;
    left: -33%;
    height: 100vh;
    overflow-y: scroll;
    width: 33%;
    background: lightgray;
    transition: ease 0.3s;
  }

  .menu.open {
    left: 0;
  }

  .menu-content {
    display: flex;
    flex-direction: column;
  }
</style>
