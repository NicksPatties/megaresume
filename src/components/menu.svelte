<script lang="ts">
  import type { BasicsStore, WorkStore } from '../data/data';
  import { onInput, onArrayInput } from '../util/eventListeners';
  import { get } from 'svelte/store';

  let open = false;

  export let basics: BasicsStore;
  export let work: WorkStore;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;

  const workName = work.name;
  const workPosition = work.position;
  const workUrl = work.url;
  const workStartDate = work.startDate;
  const workEndDate = work.endDate;
  const workSummary = work.summary;
  const workHighlights = work.highlights;
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

  <!-- Basic information -->
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
      <label for="name">Name</label>
      <input id="name" type="text" value={$workName} on:input={(e) => onInput(e, workName)} />

      <label for="title">Position</label>
      <input
        id="title"
        type="text"
        value={$workPosition}
        on:input={(e) => onInput(e, workPosition)}
      />

      <label for="contact">Start Date</label>
      <input
        id="contact"
        type="text"
        value={$workStartDate}
        on:input={(e) => onInput(e, workStartDate)}
      />

      <label for="location">End Date</label>
      <input
        id="location"
        type="text"
        value={$workEndDate}
        on:input={(e) => onInput(e, workEndDate)}
      />

      <label for="location">Summary</label>
      <input
        id="location"
        type="text"
        value={$workSummary}
        on:input={(e) => onInput(e, workSummary)}
      />

      <label for="location">Highlights</label>
      {#each $workHighlights as highlight, i}
        <input
          id="highlight[{i}]"
          type="text"
          value={highlight}
          on:input={(e) => {
            onArrayInput(e, workHighlights, i);
          }}
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
