<script lang="ts">
  import type { Highlight } from '@src/data/data';
  import type { Writable } from 'svelte/store';
  import { tagsStore } from '@src/data/tag';
  import { isHighlightVisible } from '@src/util/resumeUtils';

  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let highlights: Writable<Array<Highlight>>;
</script>

<li>{$position}, {$name} <i>{$startDate} - {$endDate}</i></li>
<ul>
  {#each $highlights as highlight}
    {#if isHighlightVisible(highlight, $tagsStore)}
      <li>{highlight.content}</li>
    {/if}
  {/each}
</ul>
