<script lang="ts">
  import type { RealResumeData } from '../data/data';
  import type { Writable } from 'svelte/store';

  let open = false;

  export let resume: RealResumeData;
  export let name: Writable<string>;
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

  <p>Prototype for data import</p>
  <!-- Basic information -->
  <li>
    <input id="basic-info-menu" type="checkbox" />
    <label for="basic-info-menu">Basic info</label>
    <div class="menu-content">
      <label for="name">Name</label>
      <input id="name" type="text" value={$name} on:input={(e) => name.set(e.target.value)} />

      <label for="title">Title</label>
      <input id="title" type="text" value={resume.basics.label} />

      <label for="contact">Phone</label>
      <input id="contact" type="text" value={resume.basics.phone} />

      <label for="location">Email</label>
      <input id="location" type="text" value={resume.basics.email} />
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
