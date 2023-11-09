<script lang="ts">
  import Menu from '@src/components/menu/menu.svelte';
  import Resume from '@src/components/resume/resume.svelte';
  import { loadLocalStorageData } from '@src/data/data';
  import { onMount } from 'svelte';

  onMount(() => {
    loadLocalStorageData();
  });
</script>

<Menu />
<Resume />
<div class="alpha">Alpha</div>

<style>
  .alpha {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 30px;
    top: 0;
    right: 0;
    background-color: yellow;
  }
</style>