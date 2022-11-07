<script lang="ts">
  import Input from '@src/components/input.svelte';
  import type { Writable } from 'svelte/store';
  import { onArrayInput } from '@src/util/eventListeners';

  export let name: Writable<string>;
  export let position: Writable<string>;
  // export let url: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let summary: Writable<string>;
  export let highlights: Writable<Array<string>>;
</script>

<Input label={'Name'} value={name} />
<Input label={'Position'} value={position} />
<Input label={'Start Date'} value={startDate} />
<Input label={'End Date'} value={endDate} />
<Input label={'Summary'} value={summary} />

<label for="location">Highlights</label>
{#each $highlights as highlight, i}
  <textarea
    id="highlight[{i}]"
    placeholder="A cool highlight"
    rows="3"
    on:input={(e) => {
      onArrayInput(e, highlights, i);
    }}>{highlight}</textarea
  >
{/each}

<style>
  label {
    display: block;
  }

  textarea {
    margin-top: 8px;
    font-family: serif;
    font-size: 16px;
    resize: none;
    width: 100%;
  }
</style>
