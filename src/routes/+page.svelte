<script lang="ts">
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';

  let name = '';
</script>

<Menu bind:name />
<Resume bind:name />
