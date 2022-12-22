<script lang="ts">
  export let id: string;
  export let visible = false;
</script>

<div {id} class:visible class="menu-contents">
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
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    transition: left var(--menu-transition-time) var(--menu-transition-page-curve);
  }

  .menu-contents.visible {
    left: 0;
  }
</style>
