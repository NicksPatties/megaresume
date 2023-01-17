<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import Input from '@src/components/input.svelte';
  import { derived, get, type Writable } from 'svelte/store';
  import {
    saveResumeDataToLocalStorage,
    WorkStore,
    workStores,
    type Highlight
  } from '@src/data/data';
  import { arrayMove } from '@src/util/arrayMove';
  import { onInput } from '@src/util/eventListeners';
  import { getDateValue } from '@src/util/getDateValue';
  import { Tag, addTag, getTag } from '@src/data/tag';

  /**
   * The index of the workStore. Required for operations on a specific workStore.
   */
  export let i: number;
  export let workStore: WorkStore;
  let visible = derived(workStore.visible, ($v) => $v);
  let name = derived(workStore.name, ($n) => $n);
  let startDate = derived(workStore.startDate, ($sd) => $sd);
  let endDate = derived(workStore.endDate, ($ed) => $ed);
  let highlights = derived(workStore.highlights, ($h) => $h);

  const maxDate = getDateValue();

  /**
   * Delete the current work entry from the workEntries store
   * @param k
   * @param name
   */
  function deleteWork(k: number, name: string) {
    if (window.confirm(`Are you sure you would like to delete this work experience? ${name}`)) {
      workStores.update((w) => {
        w.splice(k, 1);
        saveResumeDataToLocalStorage();
        return w;
      });
    }
  }

  function hideWork(k: number) {
    workStores.update((w) => {
      const currVisibility = get(w[k].visible);
      w[k].visible.set(!currVisibility);
      saveResumeDataToLocalStorage();
      return w;
    });
  }

  function moveWork(k: number, up: boolean) {
    workStores.update((w) => {
      w = up ? arrayMove(w, k, k - 1) : arrayMove(w, k, k + 1);
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

  function addHighlight() {
    workStores.update((ws) => {
      const currWorkStore = ws[i];
      currWorkStore.highlights.update((h) => {
        h.push({ visible: true, content: '', tagNames: [] });
        return h;
      });
      ws[i] = currWorkStore;
      return ws;
    });
  }

  function deleteHighlight(k: number) {
    if (window.confirm('Are you sure you would like to delete this highlight?')) {
      workStores.update((ws) => {
        const currWorkStore = ws[i];
        currWorkStore.highlights.update((h) => {
          h.splice(k, 1);
          saveResumeDataToLocalStorage();
          return h;
        });
        ws[i] = currWorkStore;
        return ws;
      });
    }
  }

  function hideHighlight(k: number) {
    workStores.update((ws) => {
      const currWorkStore = ws[i];
      currWorkStore.highlights.update((highlights) => {
        const currVisibility = highlights[k].visible;
        highlights[k].visible = !currVisibility;
        saveResumeDataToLocalStorage();
        return highlights;
      });
      ws[i] = currWorkStore;
      return ws;
    });
  }

  function moveHighlight(k: number, up: boolean) {
    workStores.update((ws) => {
      const currStore = ws[i];
      currStore.highlights.update((h) => {
        h = up ? arrayMove(h, k, k - 1) : arrayMove(h, k, k + 1);
        saveResumeDataToLocalStorage();
        return h;
      });
      ws[i] = currStore;
      return ws;
    });
  }

  /**
   *
   * @param e
   * @param s
   * @param k the index of the highlight that is being edited
   * @param saveData
   */
  function onHighlightInput(e: Event, k: number) {
    const target = e.target as HTMLInputElement;
    if (target) {
      workStores.update((ws) => {
        const currWorkStore = ws[i];
        currWorkStore.highlights.update((h) => {
          const currHighlight = h[k];
          currHighlight.content = target.value;
          h[k] = currHighlight;
          saveResumeDataToLocalStorage();
          return h;
        });
        return ws;
      });
    }
  }

  function onTagKeydown(e: KeyboardEvent, k: number) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const currValue = target ? target.value : '';
    if (e.key == 'Enter' && currValue.length > 0) {
      // if the tag is not in the tags, add the tag into the store
      if (getTag(currValue) == undefined) {
        addTag(new Tag(currValue));
      }

      workStores.update((ws) => {
        const currWorkStore = ws[i];
        currWorkStore.highlights.update((h) => {
          if (h[k].tagNames == undefined) h[k].tagNames = [];
          h[k].tagNames.push(currValue);
          return h;
        });
        ws[i] = currWorkStore;
        return ws;
      });

      target.value = '';
    }
  }

  function onTagDelete(e: Event, highlightI: number, tagI: number) {
    // highlights.update((h) => {
    //   h[highlightI].tagNames.splice(tagI, 1);
    //   return h;
    // });
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

<Input id={`work_${i}_name`} label={'Name'} value={workStore.name} disabled={!$visible} />
<Input
  id={`work_${i}_position`}
  label={'Position'}
  value={workStore.position}
  disabled={!$visible}
/>
<label for={`work_${i}_startDate`}>Start date</label>
<input
  id={`work_${i}_startDate`}
  type="month"
  disabled={!$visible}
  value={$startDate}
  max={$endDate ? $endDate : maxDate}
  on:input={(e) => onInput(e, workStore.startDate)}
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
  on:input={(e) => onInput(e, workStore.endDate)}
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
      onHighlightInput(e, k);
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
<button id={`work_${i}_newHighlight`} class="big-btn" on:click={() => addHighlight()}>
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
