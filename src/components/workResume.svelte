<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let highlights: Writable<Array<string>>;
</script>

<li>{$position}, {$name} <i>{$startDate} - {$endDate}</i></li>
<ul>
  {#each $highlights as highlight}
    <li>{highlight}</li>
  {/each}
</ul>

<style></style>
