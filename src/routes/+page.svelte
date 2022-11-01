<script lang="ts">
  import { onMount } from 'svelte';
  import { mockResume } from '../data/mockResume';
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';
  import { BasicsStore, WorkStore, type Work } from '../data/data';
  import { writable } from 'svelte/store';

  let realData = JSON.parse(mockResume);
  let basicsStore = new BasicsStore(
    realData.basics.name,
    realData.basics.label,
    realData.basics.image,
    realData.basics.phone,
    realData.basics.email,
    realData.basics.summary
  );

  const workStoresArray: Array<WorkStore> = [];
  realData.work.forEach((elem: Work) => {
    workStoresArray.push(
      new WorkStore(
        elem.name,
        elem.position,
        elem.url,
        elem.startDate,
        elem.endDate,
        elem.summary,
        elem.highlights
      )
    );
  });

  const workStores = writable(workStoresArray);

  onMount(() => {
    // TODO load real data from memory
  });
</script>

<Menu basics={basicsStore} work={workStores} />
<Resume resume={realData} basics={basicsStore} work={workStores} />
