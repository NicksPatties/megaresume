<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import WorkMenuEntry from '@src/components/workMenuEntry.svelte';
  import { workStores, WorkStore } from '@src/data/data';
</script>

<MenuContents id="menu-resume-work">
  <h2>Work Experience</h2>
  {#each $workStores as w, i}
    <WorkMenuEntry
      {i}
      workStore={w}
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
      workStores.update((w) => {
        w.push(new WorkStore());
        return w;
      });
    }}>Add new work entry</button
  >
</MenuContents>
