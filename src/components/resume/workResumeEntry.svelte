<script lang="ts">
  import type { Highlight } from '@src/data/data';
  import { tagsStore } from '@src/data/tag';
  import { isHighlightVisible } from '@src/util/resumeUtils';

  export let i: number;
  export let name: string;
  export let position: string;
  export let startDate: string;
  export let endDate: string;
  export let highlights: Highlight[];
</script>

<li>
  <span id={`resume_work_${i}_position`} class:placeholder={position.length == 0}
    >{position || 'Position'}</span
  >,
  <span id={`resume_work_${i}_name`} class:placeholder={name.length == 0}>{name || 'Name'}</span>
  <i>
    <span id={`resume_work_${i}_startDate`} class:placeholder={startDate == 'Start date'}
      >{startDate}</span
    >
    -
    <span id={`resume_work_${i}_endDate`} class:placeholder={endDate == 'End date'}>{endDate}</span>
  </i>
</li>
<ul>
  {#if highlights.length > 0}
    {#each highlights as highlight, k}
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

  @media only screen and (max-width: 400px) {
    ul {
      padding-inline-start: 0.75rem;
    }
  }
</style>
