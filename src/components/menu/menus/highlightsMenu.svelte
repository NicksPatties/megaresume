<script lang="ts">
  import MenuContents from '@src/components/menu/menuContents.svelte';
  import HighlightsSubMenu from '@src/components/menu/highlightsSubMenu.svelte';
  import { workI } from '@src/data/data';
</script>

<MenuContents id="menu-highlights">
  <h2>Edit Highlights</h2>
  <HighlightsSubMenu i={$workI} />
</MenuContents>workI
