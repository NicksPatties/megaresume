<script lang="ts">
  import { update } from '../data/data';

  let open = false;

  export let name: string;
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

  <!-- slot 2 menu contents -->
  <li>
    <input id="basic-info-menu" type="checkbox" />
    <label for="basic-info-menu">Basic info</label>
    <div class="basic-info-content">
      <label for="name">Name</label>
      <input id="name" type="text" bind:value={name} on:keyup={() => update(name)} />
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
</style>
