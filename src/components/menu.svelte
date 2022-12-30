<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import MenuNavButton from '@src/components/menuNavButton.svelte';
  import MenuContents from '@src/components/menuContents.svelte';
  import MainMenu from '@src/components/menus/mainMenu.svelte';
  import Instructions from '@src/components/menus/instructions.svelte';
  import Options from '@src/components/menus/options.svelte';
  import type { Writable } from 'svelte/store';
  import type { BasicsStore, WorkStore } from '@src/data/data';
  // import { push, pop } from '@src/util/menuStack';
  import { push, pop, visibleMenu, atMainMenu } from '@src/data/menuStack';

  let open = false;

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
      <IconButton
        id={'back-button'}
        buttonStyle="position: absolute; top: 0; left: 0;"
        iconClass={'fa-solid fa-arrow-left'}
        onclick={() => {
          if (!atMainMenu()) {
            pop();
          } else {
            open = false;
          }
        }}
      />
      <h2 class="menu-title">MegaResume</h2>
    </header>
    <div class="menu-contents-container">
      <!-- Menu contents components go in here -->
      <MenuContents id="menu-contents-0" visible={$visibleMenu === 'menu-contents-0'}>
        <MenuNavButton
          id="instructions-menu-button"
          textContent="Instructions"
          onclick={() => push('menu-contents-1')}
        />
        <MenuNavButton
          id="options-menu-button"
          textContent="Options"
          onclick={() => push('menu-contents-2')}
        />
        <MainMenu {basics} {work} />
      </MenuContents>
      <MenuContents id="menu-contents-1" visible={$visibleMenu === 'menu-contents-1'}>
        <Instructions />
      </MenuContents>
      <MenuContents id="menu-contents-2" visible={$visibleMenu === 'menu-contents-2'}>
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
