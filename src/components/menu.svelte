<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import MainMenu from '@src/components/menus/mainMenu.svelte';
  import AddEntryButton from '@src/components/addEntryButton.svelte';
  import Instructions from '@src/components/menus/instructions.svelte';
  import type { Writable } from 'svelte/store';
  import type { BasicsStore, WorkStore } from '@src/data/data';

  let open = false;
  let menuStack = ['menu-contents-drag-n-drop'];
  let menuStackLength = menuStack.length;
  const visibleClass = 'visible';

  export let basics: BasicsStore;
  export let work: Writable<WorkStore[]>;

  const push = (id: string) => {
    const lastElementId = menuStack[menuStack.length - 1];
    // check if element id is already on the stack
    if (lastElementId == id) {
      console.warn(`${id} is already at end of stack`);
      return;
    }
    const elem = document.getElementById(id);
    if (elem == null) {
      console.error(`Element with id ${id} does not exist! Ignoring push.`);
      return;
    }
    const lastElem = document.getElementById(lastElementId);
    if (lastElem != null) {
      lastElem.classList.remove(visibleClass);
      lastElem.classList.add('pushed'); // moves the element to the left
    }
    elem.classList.add(visibleClass);
    menuStack.push(id);
    menuStackLength = menuStack.length;
  };

  const pop = () => {
    // if it's too short, don't do anything
    if (menuStack.length <= 1) {
      console.error(`menuStack is too short to pop! Ignoring`);
      return;
    }

    const lastElementId = menuStack[menuStack.length - 1];
    const lastElem = document.getElementById(lastElementId);
    const popped = menuStack.pop();
    if (lastElem == null) {
      console.warn(`Couldn't find element with id ${popped}. Removed element from stack.`);
      return;
    }
    lastElem.classList.remove(visibleClass);
    const currLastElement = document.getElementById(menuStack[menuStack.length - 1]);
    if (currLastElement != null) {
      currLastElement.classList.add(visibleClass);
      currLastElement.classList.remove('pushed'); // has been pushed, but coming from left;
    }
    menuStackLength = menuStack.length;
  };
</script>

<div id="menu-component">
  <button id="open-button" class="open-button" on:click={() => (open = true)}>Open</button>
  <div id="menu" class="menu {open ? 'open' : ''}">
    <header id="menu-header">
      {#if menuStackLength > 1}
        <button id="back-button" on:click={pop}>Back</button>
      {:else}
        <button id="back-button" on:click={() => (open = false)}>Close</button>
      {/if}
      <h2 class="menu-title">MegaResume</h2>
    </header>
    <div class="menu-contents-container">
      <!-- Menu contents components go in here -->
      <MenuContents id="menu-contents-0" visible={true}>
        <MainMenu {basics} {work} />
        <AddEntryButton
          id={'next-menu-button'}
          text={'Go to submenu'}
          click={() => {
            push('menu-contents-1');
            return null;
          }}
        />
      </MenuContents>
      <MenuContents id="menu-contents-1" visible={false}>
        <Instructions />
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
