<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import Input from '@src/components/input.svelte';
  import { get, type Writable } from 'svelte/store';
  import { saveResumeDataToLocalStorage, workStores, type Highlight } from '@src/data/data';
  import { arrayMove } from '@src/util/arrayMove';
  import { onInput } from '@src/util/eventListeners';
  import { getDateValue } from '@src/util/getDateValue';
  import { Tag, addTag, getTag } from '@src/data/tag';

  export let i: number;
  export let visible: Writable<boolean>;
  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let highlights: Writable<Array<Highlight>>;

  const maxDate = getDateValue();

  function deleteWork(i: number, name: string) {
    if (window.confirm(`Are you sure you would like to delete this work experience? ${name}`)) {
      workStores.update((w) => {
        w.splice(i, 1);
        saveResumeDataToLocalStorage();
        return w;
      });
    }
  }

  function hideWork(i: number) {
    workStores.update((w) => {
      const currVisibility = get(w[i].visible);
      w[i].visible.set(!currVisibility);
      saveResumeDataToLocalStorage();
      return w;
    });
  }

  function moveWork(i: number, up: boolean) {
    workStores.update((w) => {
      w = up ? arrayMove(w, i, i - 1) : arrayMove(w, i, i + 1);
      saveResumeDataToLocalStorage();
      return w;
    });
  }

  function reportValidity(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      target.reportValidity();
    }
  }

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

  function onTagKeydown(e: KeyboardEvent, highlightI: number) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const currValue = target ? target.value : '';
    if (e.key == 'Enter' && currValue.length > 0) {
      // if the tag is not in the tags, add the tag into the store
      if (getTag(currValue) == undefined) {
        addTag(new Tag(currValue));
      }
      // add tag to a highlight
      highlights.update((h) => {
        if (h[highlightI].tagNames == undefined) h[highlightI].tagNames = [];
        h[highlightI].tagNames.push(currValue);
        return h;
      });
      target.value = '';
    }
  }

  function onTagDelete(e: Event, highlightI: number, tagI: number) {
    highlights.update((h) => {
      h[highlightI].tagNames.splice(tagI, 1);
      return h;
    });
    saveResumeDataToLocalStorage();
  }
</script>

<h3 class="submenu-header">
  {#if $name}{$name}{:else}Work {i + 1}{/if}
  <div class="label-controls">
    {#if i > 0}
      <IconButton
        size="small"
        id="work_{i}_up"
        iconClass="fa-solid fa-arrow-up"
        onclick={() => moveWork(i, true)}
      />
    {/if}
    {#if i < $workStores.length - 1}
      <IconButton
        size="small"
        id="work_{i}_down"
        iconClass="fa-solid fa-arrow-down"
        onclick={() => moveWork(i, false)}
      />
    {/if}
    <IconButton
      size="small"
      id="work_{i}_hide"
      iconClass={$visible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
      onclick={() => hideWork(i)}
    />
    <IconButton
      size="small"
      id="work_{i}_delete"
      iconClass="fa-regular fa-trash-can"
      onclick={() => deleteWork(i, $name)}
    />
  </div>
</h3>

<Input id={`work_${i}_name`} label={'Name'} value={name} disabled={!$visible} />
<Input id={`work_${i}_position`} label={'Position'} value={position} disabled={!$visible} />
<label for={`work_${i}_startDate`}>Start date</label>
<input
  id={`work_${i}_startDate`}
  type="month"
  disabled={!$visible}
  value={$startDate}
  max={$endDate ? $endDate : maxDate}
  on:input={(e) => onInput(e, startDate)}
  on:blur={(e) => reportValidity(e)}
/>
<label for={`work_${i}_endDate`}>End date</label>
<input
  id={`work_${i}_endDate`}
  type="month"
  disabled={!$visible}
  value={$endDate}
  min={$startDate ? $startDate : maxDate}
  max={maxDate}
  on:input={(e) => onInput(e, endDate)}
  on:blur={(e) => reportValidity(e)}
/>

{#each $highlights as highlight, k}
  <label for="work_{i}_highlight_{k}">
    New Highlight {k + 1}
    <div class="label-controls">
      {#if k > 0}
        <IconButton
          size="small"
          id="work_{i}_highlight_{k}_up"
          iconClass="fa-solid fa-arrow-up"
          onclick={() => moveHighlight(k, true)}
        />
      {/if}
      {#if k < $highlights.length - 1}
        <IconButton
          size="small"
          id="work_{i}_highlight_{k}_down"
          iconClass="fa-solid fa-arrow-down"
          onclick={() => moveHighlight(k, false)}
        />
      {/if}
      <IconButton
        size="small"
        id="work_{i}_highlight_{k}_hide"
        iconClass={highlight.visible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
        onclick={() => hideHighlight(k)}
      />
      <IconButton
        size="small"
        id="work_{i}_highlight_{k}_delete"
        iconClass="fa-regular fa-trash-can"
        onclick={() => deleteHighlight(k)}
      />
    </div>
  </label>
  <textarea
    id={`work_${i}_highlight_${k}`}
    placeholder={'A cool highlight'}
    disabled={!$visible || !highlight.visible}
    on:input={(e) => {
      if (e != null) {
        onNewHighlightInput(e, highlights, k, saveResumeDataToLocalStorage);
      }
    }}>{highlight.content}</textarea
  >
  <label for={`work_${i}_highlight_${k}_tags_input`}
    >Add tags<span class="hint">(press Enter to submit tag)</span></label
  >
  <input
    class="input-add-tags"
    id={`work_${i}_highlight_${k}_tags_input`}
    type="text"
    list="existing-tags"
    on:keydown={(e) => onTagKeydown(e, k)}
  />
  <p>
    {#each highlight.tagNames as name, ti}
      <span class="highlight-tag">
        {name}
        <IconButton
          size="small"
          id="work-{i}-highlight-{k}-delete-tag-{name}"
          iconClass="fa-regular fa-circle-xmark"
          onclick={(e) => onTagDelete(e, k, ti)}
        />
      </span>
    {/each}
  </p>
{/each}
<button
  id={`work_${i}_newHighlight`}
  class="big-btn"
  on:click={() => {
    highlights.update((h) => {
      h.push({ visible: true, content: '', tagNames: [] });
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

  .input-add-tags {
    margin-bottom: 0;
  }

  .highlight-tag {
    margin-top: 5px;
    display: inline-block;
    background: #ddd;
    padding: 0 5px;
    border-radius: 5px;
    margin-right: 5px;
  }
</style>
