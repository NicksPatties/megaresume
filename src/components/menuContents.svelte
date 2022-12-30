<script lang="ts">
  export let id: string;
  import { visibleMenu } from '@src/data/menuStack';
</script>

<div {id} class:visible={$visibleMenu == id} class="menu-contents">
  <slot />
</div>

<style>
  .menu-contents {
    box-sizing: border-box;
    background: white;
    min-height: calc(100vh - var(--header-height));
    padding: 1em;
    position: absolute;
    top: 0;
    left: calc(-1 * var(--mobile-width));
    width: var(--mobile-width);
    overflow: hidden;
    transition: left var(--menu-transition-time) var(--menu-transition-page-curve);
  }

  .menu-contents.visible {
    left: 0;
  }
</style>
