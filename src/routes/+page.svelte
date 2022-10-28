<script lang="ts">
  import { onMount } from 'svelte';
  import { Basics, resumeJSONToData } from '../data/data';
  import { mockResume } from '../data/mockResume';
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';
  import { basicsStore } from '../data/store';

  let realData = resumeJSONToData(mockResume);
  let coolBasics = new Basics();
  coolBasics.name = 'cool';
  basicsStore.set(coolBasics);

  onMount(() => {
    // TODO load real data from memory
  });
</script>

<Menu resume={realData} basics={basicsStore} />
<Resume resume={realData} basics={basicsStore} />
