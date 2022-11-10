<script lang="ts">
  import type { Highlight } from '@src/data/data';
  import type { Writable } from 'svelte/store';

  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let highlights: Writable<Array<Highlight>>;
</script>

<li>{$position}, {$name} <i>{$startDate} - {$endDate}</i></li>
<ul>
  {#each $highlights as highlight}
    {#if highlight.visible}
      <li>{highlight.content}</li>
    {/if}
  {/each}
</ul>
