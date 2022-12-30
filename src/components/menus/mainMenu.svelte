<script lang="ts">
  import MenuNavButton from '@src/components/menuNavButton.svelte';
  import { push } from '@src/data/menuStack';
  import MenuContents from '@src/components/menuContents.svelte';
</script>

<MenuContents id="menu-main">
  <MenuNavButton
    id="menu-button-instructions"
    textContent="Instructions"
    onclick={() => push('menu-instructions')}
  />

  <MenuNavButton
    id="menu-button-options"
    textContent="Options"
    onclick={() => push('menu-options')}
  />

  <MenuNavButton id="menu-button-resume" textContent="Resume" onclick={() => push('menu-resume')} />
</MenuContents>
