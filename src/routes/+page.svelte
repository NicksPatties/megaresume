<script lang="ts">
  import { mockResume } from '../data/mockResume';
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';
  import { BasicsStore, WorkStore, EducationStore, loadResumeData } from '../data/data';
  import { writable, type Writable } from 'svelte/store';

  let basicsStore: BasicsStore = new BasicsStore();
  let workStores: Writable<WorkStore[]> = writable([new WorkStore()]);
  let educationStores: Writable<EducationStore[]> = writable([new EducationStore()]);

  [basicsStore, workStores, educationStores] = loadResumeData(mockResume);
</script>

<Menu basics={basicsStore} work={workStores} education={educationStores} />
<Resume basics={basicsStore} work={workStores} education={educationStores} />
