<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import MenuContents from '@src/components/menuContents.svelte';
  import MainMenu from '@src/components/menus/mainMenu.svelte';
  import Instructions from '@src/components/menus/instructions.svelte';
  import Options from '@src/components/menus/options.svelte';
  import type { Writable } from 'svelte/store';
  import type { BasicsStore, WorkStore } from '@src/data/data';
  import { push, pop } from '@src/util/menuStack';

  let open = false;
  const firstMenu = 'menu-contents-0';
  let menuStack = [firstMenu];
  $: {
    menuStackLength = menuStack.length;
    visibleMenu = menuStack[menuStack.length - 1];
  }
  let menuStackLength = menuStack.length;
  let visibleMenu = firstMenu;

  export let basics: BasicsStore;
  export let work: Writable<WorkStore[]>;
</script>

<div id="menu-component">
  <IconButton
    id={'open-button'}
    buttonStyle="position: fixed; z-index: 0; top: 0; left: 0;"
    iconClass="fa-solid fa-bars"
    onclick={() => (open = true)}
  />
  <div id="menu" class="menu {open ? 'open' : ''}">
    <header id="menu-header">
      {#if menuStackLength > 1}
        <button id="back-button" on:click={() => (menuStack = pop(menuStack))}>Back</button>
      {:else}
        <button id="back-button" on:click={() => (open = false)}>Close</button>
      {/if}
      <h2 class="menu-title">MegaResume</h2>
    </header>
    <div class="menu-contents-container">
      <!-- Menu contents components go in here -->
      <MenuContents id="menu-contents-0" visible={visibleMenu === 'menu-contents-0'}>
        <button
          id="instructions-menu-button"
          class="big-btn"
          on:click={() => (menuStack = push('menu-contents-1', menuStack))}
        >
          Instructions
        </button>
        <button
          id="options-menu-button"
          class="big-btn"
          on:click={() => (menuStack = push('menu-contents-2', menuStack))}
        >
          Options
        </button>
        <MainMenu {basics} {work} />
      </MenuContents>
      <MenuContents id="menu-contents-1" visible={visibleMenu === 'menu-contents-1'}>
        <Instructions />
      </MenuContents>
      <MenuContents id="menu-contents-2" visible={visibleMenu === 'menu-contents-2'}>
        <Options />
      </MenuContents>
    </div>
  </div>
</div>

<style>
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
    box-sizing: border-box;
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
