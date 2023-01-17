<script lang="ts">
  import type { WorkStore } from '@src/data/data';
  import { derived, get } from 'svelte/store';
  import { tagsStore } from '@src/data/tag';
  import { isHighlightVisible, dateInputToDecoratedString } from '@src/util/resumeUtils';

  export let workStore: WorkStore;
  let name = derived(workStore.name, ($n) => ($n == '' ? 'Name' : $n));
  let position = derived(workStore.position, ($p) => ($p == '' ? 'Position' : $p));
  let startDate = derived(workStore.startDate, ($sd) =>
    dateInputToDecoratedString($sd, 'Start date')
  );
  let endDate = derived(workStore.endDate, ($ed) => dateInputToDecoratedString($ed, 'End date'));
</script>

<li>
  <span class:placeholder={$position == 'Position'}>{$position}</span>,
  <span class:placeholder={$name == 'Name'}>{$name}</span>
  <i>
    <span class:placeholder={$startDate == 'Start date'}>{$startDate}</span> -
    <span class:placeholder={$endDate == 'End date'}>{$endDate}</span>
  </i>
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
