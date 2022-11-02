<script lang="ts">
  import { onMount } from 'svelte';
  import { mockResume } from '../data/mockResume';
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';
  import { BasicsStore, WorkStore, type Work, EducationStore, type Education } from '../data/data';
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

  const educationStoreArray: Array<EducationStore> = [];
  realData.education.forEach((elem: Education) => {
    educationStoreArray.push(
      new EducationStore(
        elem.studyType,
        elem.institution,
        elem.area,
        elem.url,
        elem.startDate,
        elem.endDate,
        elem.score,
        elem.courses
      )
    );
  });
  const educationStores = writable(educationStoreArray);

  onMount(() => {
    // TODO load real data from memory
  });
</script>

<Menu basics={basicsStore} work={workStores} education={educationStores} />
<Resume basics={basicsStore} work={workStores} education={educationStores} />
