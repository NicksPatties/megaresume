<script lang="ts">
  import Input from '@src/components/input.svelte';
  import Textarea from '@src/components/textarea.svelte';
  import AddEntryButton from '@src/components/addEntryButton.svelte';
  import { get, type Writable } from 'svelte/store';
  import { saveResumeDataToLocalStorage, type Highlight } from '@src/data/data';

  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let summary: Writable<string>;
  export let highlights: Writable<Array<Highlight>>;

  function removeHighlight(i: number) {
    highlights.update((h) => {
      h.splice(i, 1);
      return h;
    });
  }

  function hideHighlight(i: number) {
    highlights.update((highlights) => {
      const currVisibility = highlights[i].visible;
      highlights[i].visible = !currVisibility;
      saveResumeDataToLocalStorage();
      return highlights;
    });
  }

  function onNewHighlightInput(
    e: Event,
    s: Writable<Highlight[]>,
    i: number,
    saveData: () => void
  ) {
    const target = e.target as HTMLInputElement;
    if (target) {
      const array = get(s);
      array[i].content = target.value;
      s.set(array);
      saveData();
    }
  }
</script>

<Input label={'Name'} value={name} />
<Input label={'Position'} value={position} />
<Input label={'Start Date'} value={startDate} />
<Input label={'End Date'} value={endDate} />
<Input label={'Summary'} value={summary} />

{#each $highlights as highlight, i}
  <label for="highlight[{i}]">
    New Highlight {i + 1}
    <div class="label-controls">
      <button
        on:click={() => {
          hideHighlight(i);
        }}
        >{#if highlight.visible}Hide{:else}Show{/if}</button
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
    content={highlight.content}
    disabled={!highlight.visible}
    oninput={(e) => {
      if (e != null) {
        onNewHighlightInput(e, highlights, i, saveResumeDataToLocalStorage);
      }
    }}
  />
{/each}
<AddEntryButton
  text={'Add new highlight'}
  click={() => {
    highlights.update((h) => {
      h.push({ visible: true, content: '' });
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
