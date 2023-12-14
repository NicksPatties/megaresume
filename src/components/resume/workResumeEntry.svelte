<script lang="ts">
  import type { Highlight } from '@src/data/data';
  import { tagsStore } from '@src/data/tag';
  import { isHighlightVisible } from '@src/util/resumeUtils';

  export let i: number;
  export let name: string;
  export let position: string;
  export let startYear: string;
  export let endYear: string;
  export let highlights: Highlight[];
  export let current: boolean;
</script>

<p>
  <b
    ><span id={`resume_work_${i}_name`} class:placeholder={name.length == 0}>
      {name || 'Name'}
    </span></b
  >
  <span id={`resume_work_${i}_position`} class:placeholder={position.length == 0}
    >{position || 'Position'}</span
  >
</p>

<p>
  <i><span id={`resume_work_${i}_startDate`}>{startYear ? startYear : 'Start year'}</span></i>
  -
  <i
    ><span id={`resume_work_${i}_endDate`}
      >{current ? 'Present' : endYear ? endYear : 'End year'}</span
    ></i
  >
</p>

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
