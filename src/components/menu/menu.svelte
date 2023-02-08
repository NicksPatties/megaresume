<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import MainMenu from '@src/components/menu/menus/mainMenu.svelte';
  import Instructions from '@src/components/menu/menus/instructions.svelte';
  import Options from '@src/components/menu/menus/options.svelte';
  import ResumeMenu from '@src/components/menu/menus/resumeMenu.svelte';
  import WorkMenu from '@src/components/menu/menus/workMenu.svelte';
  import BasicsMenu from '@src/components/menu/menus/basicsMenu.svelte';
  import HighlightsMenu from '@src/components/menu/menus/highlightsMenu.svelte';
  import { pop, atMainMenu } from '@src/data/menuStack';
  import TagsMenu from './menus/tagsMenu.svelte';

  let open = false;
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
      <MainMenu />
      <Instructions />
      <Options />
      <ResumeMenu />
      <WorkMenu />
      <BasicsMenu />
      <TagsMenu />
      <HighlightsMenu />
    </div>
  </div>
</div>

<style>
  :root {
    --menu-width: var(--mobile-width);
  }

  .menu {
    background-color: white;
    box-shadow: none;
    position: fixed;
    top: 0;
    left: calc(-1 * var(--menu-width));
    width: var(--menu-width);
    height: var(--menu-height);
    font-family: sans-serif;
    user-select: none;
    transition: left var(--menu-transition-time) var(--menu-transition-page-curve);
    z-index: 20;
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
    :root {
      --menu-width: 100%;
    }
  }
</style>
