<script lang="ts">
  import Input from '@src/components/input.svelte';
  import { get, type Writable } from 'svelte/store';
  import { saveResumeDataToLocalStorage, type Highlight } from '@src/data/data';
  import { arrayMove } from '@src/util/arrayMove';

  export let i: number;
  export let visible: Writable<boolean>;
  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let highlights: Writable<Array<Highlight>>;

  function deleteHighlight(i: number) {
    if (window.confirm('Are you sure you would like to delete this highlight?')) {
      highlights.update((h) => {
        h.splice(i, 1);
        saveResumeDataToLocalStorage();
        return h;
      });
    }
  }

  function hideHighlight(i: number) {
    highlights.update((highlights) => {
      const currVisibility = highlights[i].visible;
      highlights[i].visible = !currVisibility;
      saveResumeDataToLocalStorage();
      return highlights;
    });
  }

  function moveHighlight(i: number, up: boolean) {
    highlights.update((h) => {
      h = up ? arrayMove(h, i, i - 1) : arrayMove(h, i, i + 1);
      saveResumeDataToLocalStorage();
      return h;
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

<Input id={`work_${i}_name`} label={'Name'} value={name} disabled={!$visible} />
<Input id={`work_${i}_position`} label={'Position'} value={position} disabled={!$visible} />
<Input id={`work_${i}_startDate`} label={'Start Date'} value={startDate} disabled={!$visible} />
<Input id={`work_${i}_endDate`} label={'End Date'} value={endDate} disabled={!$visible} />

{#each $highlights as highlight, k}
  <label for="work_{i}_highlight_{k}">
    New Highlight {k + 1}
    <div class="label-controls">
      {#if k > 0}
        <button id="work_{i}_highlight_{k}_up" on:click={() => moveHighlight(k, true)}>Up</button>
      {/if}
      {#if k < $highlights.length - 1}
        <button id="work_{i}_highlight_{k}_down" on:click={() => moveHighlight(k, false)}
          >Down</button
        >
      {/if}
      <button
        id="work_{i}_highlight_{k}_hide"
        on:click={() => {
          hideHighlight(k);
        }}
        >{#if highlight.visible}Hide{:else}Show{/if}</button
      >
      <button
        id="work_{i}_highlight_{k}_delete"
        on:click={() => {
          deleteHighlight(k);
        }}>Delete</button
      >
    </div>
  </label>
  <textarea
    id={`work_${i}_highlight_${k}`}
    placeholder={'A cool highlight'}
    content={highlight.content}
    disabled={!$visible || !highlight.visible}
    on:input={(e) => {
      if (e != null) {
        onNewHighlightInput(e, highlights, k, saveResumeDataToLocalStorage);
      }
    }}
  />
{/each}
<button
  id={`work_${i}_newHighlight`}
  class="big-btn"
  on:click={() => {
    highlights.update((h) => {
      h.push({ visible: true, content: '' });
      return h;
    });
  }}
>
  Add new highlight
</button>

<style>
  label {
    display: flex;
    justify-content: space-between;
  }
</style>
