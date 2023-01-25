<script lang="ts">
  import MenuContents from '@src/components/menu/menuContents.svelte';
  import WorkMenuEntry from '@src/components/menu/workMenuEntry.svelte';
  import { workStore, createBlankWork } from '@src/data/data';
</script>

<MenuContents id="menu-resume-work">
  <h2>Work Experience</h2>
  {#each $workStore as w, i}
    <WorkMenuEntry
      {i}
      visible={w.visible}
      name={w.name}
      position={w.position}
      startDate={w.startDate}
      endDate={w.endDate}
      highlights={w.highlights}
    />
  {/each}
  <button
    id="newWork"
    class="big-btn"
    on:click={() => {
      workStore.update((w) => {
        w.push(createBlankWork());
        return w;
      });
    }}>Add new work entry</button
  >
</MenuContents>
