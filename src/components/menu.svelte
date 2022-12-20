<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import MainMenu from './menus/mainMenu.svelte';
  import type { Writable } from 'svelte/store';
  import type { BasicsStore, WorkStore } from '@src/data/data';

  let open = false;

  export let basics: BasicsStore;
  export let work: Writable<WorkStore[]>;
</script>

<div id="menu-component">
  <button id="open-button" class="open-button" on:click={() => (open = true)}>Open</button>
  <div id="menu" class="menu {open ? 'open' : ''}">
    <header id="menu-header">
      <button id="back-button" on:click={() => (open = false)}>Close</button>
      <h2 class="menu-title">MegaResume</h2>
    </header>
    <div class="menu-contents-container">
      <!-- Menu contents components go in here -->
      <MenuContents id="menu-contents-0" visible={true}>
        <MainMenu basics={basics} work={work}/>
      </MenuContents>
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  :root {
    --mobile-width: 400px;
    --menu-height: 100vh;
    --header-height: 42px;
    --menu-box-shadow-width: 12px;
    --divider-color: gray;
    --menu-contents-text-side-padding: 6%;
    --menu-transition-time: 0.35s;
    --menu-transition-page-curve: cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  :root {
    --menu-width: 375px;
    --side-padding: 12px;
  }

  #open-button {
    position: fixed;
    z-index: 0;
    top: 10px;
    left: 10px;
  }

  .menu {
    background-color: white;
    box-shadow: none;
    position: fixed;
    top: 0;
    left: calc(-1 * var(--mobile-width));
    width: var(--mobile-width);
    height: var(--menu-height);
    font-size: 18px;
    font-family: sans-serif;
    user-select: none;
    transition: left var(--menu-transition-time) var(--menu-transition-page-curve);
    z-index: 10;
  }

  .menu.open {
    left: 0;
    box-shadow: var(--divider-color) 0 0 var(--menu-box-shadow-width);
  }

  .menu header {
    display: flex;
    justify-content: center;
    height: var(--header-height);
    box-shadow: var(--divider-color) 0 0 9px;
    clip-path: inset(0 0 -9px 0);
  }

  #back-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .menu-title {
    margin: auto 0;
    text-align: center;
  }

  .menu-contents-container {
    padding: 1em;
    position: relative;
    height: calc(var(--menu-height) - var(--header-height));
    overflow-x: hidden;
  }

  @media only screen and (max-width: 400px) {
    /* should use var but whatever */
    .menu {
      width: 100%;
    }

    .menu.open {
      box-shadow: none;
    }
  }
</style>
