<script lang="ts">
  import type { Highlight, WorkStore } from '@src/data/data';
  import { derived, get, type Writable } from 'svelte/store';
  import { tagsStore } from '@src/data/tag';
  import { isHighlightVisible, dateInputToDecoratedString } from '@src/util/resumeUtils';

  export let workStore: WorkStore;
</script>

<li>
  <span class:placeholder={false}>{get(workStore.position)}</span>,
  <span class:placeholder={false}>{get(workStore.name)}</span>
  <i
    ><span class:placeholder={false}>{get(workStore.startDate)}</span> -
    <span class:placeholder={false}>{get(workStore.endDate)}</span></i
  >
</li>
<ul>
  {#if get(workStore.highlights).length > 0}
    {#each get(workStore.highlights) as highlight}
      {#if isHighlightVisible(highlight, $tagsStore)}
        <li>{highlight.content}</li>
      {/if}
    {/each}
  {:else}
    <li class="placeholder">Highlights</li>
  {/if}
</ul>

<style>
  .placeholder {
    color: gray;
  }
</style>
