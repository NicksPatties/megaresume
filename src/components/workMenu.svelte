<script lang="ts">
  import Input from '@src/components/input.svelte';
  import Textarea from '@src/components/textarea.svelte';
  import AddEntryButton from '@src/components/addEntryButton.svelte';
  import type { Writable } from 'svelte/store';
  import { onArrayInput } from '@src/util/eventListeners';

  export let name: Writable<string>;
  export let position: Writable<string>;
  // export let url: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let summary: Writable<string>;
  export let highlights: Writable<Array<string>>;

  function removeHighlight(i: number) {
    highlights.update((h) => {
      h.splice(i, 1);
      return h;
    });
  }

  function hideHighlight(i: number) {
    console.log(`hide highlight at i=${i}, but doesn't do anything yet...`);
  }
</script>

<Input label={'Name'} value={name} />
<Input label={'Position'} value={position} />
<Input label={'Start Date'} value={startDate} />
<Input label={'End Date'} value={endDate} />
<Input label={'Summary'} value={summary} />

{#each $highlights as highlight, i}
  <label for="highlight[{i}]">
    Highlight {i + 1}
    <div class="label-controls">
      <button
        on:click={() => {
          hideHighlight(i);
        }}>Hide</button
      >
      <button
        on:click={() => {
          removeHighlight(i);
        }}>Delete</button
      >
    </div>
  </label>
  <Textarea
    id={`highlight[${i}]`}
    placeholder={'A cool highlight'}
    content={highlight}
    oninput={(e) => {
      if (e != null) {
        onArrayInput(e, highlights, i);
      }
    }}
  />
{/each}
<AddEntryButton
  text={'Add new highlight'}
  click={() => {
    highlights.update((h) => {
      h.push('');
      return h;
    });
    return null;
  }}
/>

<style>
  label {
    display: flex;
    justify-content: space-between;
  }
</style>
