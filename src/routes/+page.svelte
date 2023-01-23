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
