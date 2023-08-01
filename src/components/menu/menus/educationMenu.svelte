<script lang="ts">
  import MenuContents from '@src/components/menu/menuContents.svelte';
  import EducationMenuEntry from '@src/components/menu/educationMenuEntry.svelte';

  let education = [{ name: '' }, { name: '' }];
</script>

<MenuContents id="menu-resume-education">
  <h2>Education</h2>

  {#each education as edu, i}
    <EducationMenuEntry {i} name={edu.name} />
  {/each}
</MenuContents>
