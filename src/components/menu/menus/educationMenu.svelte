<script lang="ts">
  import MenuContents from '@src/components/menu/menuContents.svelte';
  import EducationMenuEntry from '@src/components/menu/educationMenuEntry.svelte';
  import { educationStore } from '@src/data/data';
</script>

<MenuContents id="menu-resume-education">
  <h2>Education</h2>

  {#each $educationStore as edu, i}
    <EducationMenuEntry
      {i}
      visible={edu.visible}
      name={edu.name}
      type={edu.type}
      degree={edu.degree}
      startDate={edu.startDate}
      endDate={edu.endDate}
    />
  {/each}

  <button
    id="newEducation"
    class="big-btn"
    on:click={() => {
      educationStore.update((edu) => {
        edu.push({
          visible: true,
          name: '',
          type: '',
          degree: '',
          startDate: '',
          endDate: ''
        });
        return edu;
      });
    }}>Add new education entry</button
  >
</MenuContents>
