<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import MenuNavButton from '../menuNavButton.svelte';
  import { push } from '@src/data/menuStack';
</script>

<MenuContents id="menu-resume">
  <MenuNavButton
    id="menu-resume-basics-button"
    textContent="Basic information"
    onclick={() => push('menu-resume-basics')}
  />
  <MenuNavButton
    id="menu-resume-work-button"
    textContent="Work experience"
    onclick={() => push('menu-resume-work')}
  />
</MenuContents>
