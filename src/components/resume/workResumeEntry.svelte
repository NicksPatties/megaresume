<script lang="ts">
  import type { Highlight } from '@src/data/data';
  import { derived, type Writable } from 'svelte/store';
  import { tagsStore } from '@src/data/tag';
  import { isHighlightVisible } from '@src/util/resumeUtils';

  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let highlights: Writable<Array<Highlight>>;

  let pos = derived(position, ($position) => ($position ? $position : 'Position'));
  let n = derived(name, ($name) => ($name ? $name : 'Name of employer'));
  let sd = derived(startDate, ($startDate) => dateInputToDecoratedString($startDate, 'Start date'));
  let ed = derived(endDate, ($endDate) => dateInputToDecoratedString($endDate, 'End date'));

  function dateInputToDecoratedString(date: string, placeholder: string): string {
    const sdmillis = Date.parse(date);
    if (isNaN(sdmillis)) {
      return placeholder;
    }
    let opts: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    };
    let d = new Date(date);
    return Intl.DateTimeFormat('en-US', opts).format(d);
  }
</script>

<li>
  <span class:placeholder={$position.length == 0}>{$pos}</span>,
  <span class:placeholder={$name.length == 0}>{$n}</span>
  <i
    ><span class:placeholder={$sd == 'Start date'}>{$sd}</span> -
    <span class:placeholder={$ed == 'End date'}>{$ed}</span></i
  >
</li>
<ul>
  {#each $highlights as highlight}
    {#if isHighlightVisible(highlight, $tagsStore)}
      <li>{highlight.content}</li>
    {/if}
  {/each}
</ul>

<style>
  .placeholder {
    color: gray;
  }
</style>
