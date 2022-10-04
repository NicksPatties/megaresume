<script lang="ts">
  import { onMount } from 'svelte';
  import { getResumeData, ResumeData } from '../data/data';
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';

  let data: ResumeData = new ResumeData();

  onMount(() => {
    data = getResumeData();
  });
</script>

<Menu bind:name={data.name} />
<Resume bind:name={data.name} />
