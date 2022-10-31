<script lang="ts">
  import { onMount } from 'svelte';
  import { mockResume } from '../data/mockResume';
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';
  import { BasicsStore } from '../data/data';

  let realData = JSON.parse(mockResume);
  let basicsStore = new BasicsStore(
    realData.basics.name,
    realData.basics.label,
    realData.basics.image,
    realData.basics.phone,
    realData.basics.email,
    realData.basics.summary
  );

  onMount(() => {
    // TODO load real data from memory
  });
</script>

<Menu basics={basicsStore} />
<Resume resume={realData} basics={basicsStore} />
