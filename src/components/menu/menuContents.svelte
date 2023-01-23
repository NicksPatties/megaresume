<script lang="ts">
  /**
   * The id of the menu. Push this onto the menu stack to make this menu visible.
   */
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
    position: absolute;
    top: 0;
    left: calc(-1 * var(--menu-width));
    width: var(--menu-width);
    overflow: hidden;
    transition: left var(--menu-transition-time) var(--menu-transition-page-curve);
  }

  .menu-contents.visible {
    left: 0;
  }
</style>
