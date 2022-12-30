<script lang="ts">
  import Menu from '@src/components/menu.svelte';
  import Resume from '@src/components/resume.svelte';
  import { loadLocalStorageData } from '@src/data/data';
  import { onMount } from 'svelte';

  onMount(() => {
    loadLocalStorageData();
  });
</script>

<Menu />
<Resume />
