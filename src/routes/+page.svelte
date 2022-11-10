<script lang="ts">
  import { mockResume } from '@src/data/mockResume';
  import Menu from '@src/components/menu.svelte';
  import Resume from '@src/components/resume.svelte';
  import { BasicsStore, WorkStore, loadResumeData } from '@src/data/data';
  import { writable, type Writable } from 'svelte/store';

  let basicsStore: BasicsStore = new BasicsStore();
  let workStores: Writable<WorkStore[]> = writable([new WorkStore()]);

  [basicsStore, workStores] = loadResumeData(mockResume);
</script>

<Menu basics={basicsStore} work={workStores} />
<Resume basics={basicsStore} work={workStores} />
