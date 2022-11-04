<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { onInput, onArrayInput } from '../util/eventListeners';

  export let name: Writable<string>;
  export let position: Writable<string>;
  // export let url: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let summary: Writable<string>;
  export let highlights: Writable<Array<string>>;
</script>

<label for="name">Name</label>
<input id="name" type="text" value={$name} on:input={(e) => onInput(e, name)} />

<label for="title">Position</label>
<input id="title" type="text" value={$position} on:input={(e) => onInput(e, position)} />

<label for="contact">Start Date</label>
<input id="contact" type="text" value={$startDate} on:input={(e) => onInput(e, startDate)} />

<label for="location">End Date</label>
<input id="location" type="text" value={$endDate} on:input={(e) => onInput(e, endDate)} />

<label for="location">Summary</label>
<input id="location" type="text" value={$summary} on:input={(e) => onInput(e, summary)} />

<label for="location">Highlights</label>
{#each $highlights as highlight, i}
  <input
    id="highlight[{i}]"
    type="text"
    value={highlight}
    on:input={(e) => {
      onArrayInput(e, highlights, i);
    }}
  />
{/each}

<style></style>
