<script lang="ts">
  import type { WorkStore } from '@src/data/data';
  import { derived, get } from 'svelte/store';
  import { tagsStore } from '@src/data/tag';
  import { isHighlightVisible, dateInputToDecoratedString } from '@src/util/resumeUtils';

  export let workStore: WorkStore;
  export let i: number;
  let name = derived(workStore.name, ($n) => ($n == '' ? 'Name' : $n));
  let position = derived(workStore.position, ($p) => ($p == '' ? 'Position' : $p));
  let startDate = derived(workStore.startDate, ($sd) =>
    dateInputToDecoratedString($sd, 'Start date')
  );
  let endDate = derived(workStore.endDate, ($ed) => dateInputToDecoratedString($ed, 'End date'));
</script>

<li>
  <span id={`resume_work_${i}_position`} class:placeholder={$position == 'Position'}
    >{$position}</span
  >,
  <span id={`resume_work_${i}_name`} class:placeholder={$name == 'Name'}>{$name}</span>
  <i>
    <span id={`resume_work_${i}_startDate`} class:placeholder={$startDate == 'Start date'}
      >{$startDate}</span
    >
    -
    <span id={`resume_work_${i}_endDate`} class:placeholder={$endDate == 'End date'}
      >{$endDate}</span
    >
  </i>
</li>
<ul>
  {#if get(workStore.highlights).length > 0}
    {#each get(workStore.highlights) as highlight, k}
      {#if isHighlightVisible(highlight, $tagsStore)}
        <li id={`resume_work_${i}_highlight_${k}`}>{highlight.content}</li>
      {/if}
    {/each}
  {:else}
    <li id={`resume_work_${i}_highlight_placeholder`} class="placeholder">Highlights</li>
  {/if}
</ul>

<style>
  .placeholder {
    color: gray;
  }
</style>
