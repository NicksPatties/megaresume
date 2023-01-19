<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import {
    saveResumeDataToLocalStorage,
    type Work,
    workStore,
    type Highlight
  } from '@src/data/data';
  import { arrayMove } from '@src/util/arrayMove';
  import { getDateValue } from '@src/util/getDateValue';
  import { get } from 'svelte/store';
  import HighlightsSubMenu from './highlightsSubMenu.svelte';

  /**
   * The index of the work item. Required for operations on a specific work item.
   */
  export let i: number;
  export let visible: boolean;
  export let name: string;
  export let position: string;
  export let startDate: string;
  export let endDate: string;
  export let highlights: Highlight[];

  const maxDate = getDateValue();

  function updateWorkProperty(propname: keyof Work, value: string) {
    workStore.update((workArray) => {
      // I hate this method, and I wish I could just easily assign a property by array index
      // but hey, this is easier to do
      if (propname == 'name') workArray[i].name = value;
      else if (propname == 'position') workArray[i].position = value;
      else if (propname == 'startDate') workArray[i].startDate = value;
      else if (propname == 'endDate') workArray[i].endDate = value;
      return workArray;
    });
  }

  /**
   * Delete the current work entry from the workEntries store
   * @param k
   * @param name
   */
  function deleteWork() {
    const name = get(workStore)[i].name;
    if (window.confirm(`Are you sure you would like to delete this work experience? ${name}`)) {
      workStore.update((w) => {
        w.splice(i, 1);
        saveResumeDataToLocalStorage();
        return w;
      });
    }
  }

  function hideWork() {
    workStore.update((workArray) => {
      workArray[i].visible = !workArray[i].visible;
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function moveWork(up: boolean) {
    workStore.update((workArray) => {
      workArray = up ? arrayMove(workArray, i, i - 1) : arrayMove(workArray, i, i + 1);
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function reportValidity(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      target.reportValidity();
    }
  }
</script>

<h3 id="work_{i}_header" class="submenu-header">
  {#if name}{name}{:else}Work {i + 1}{/if}
  <div class="label-controls">
    {#if i > 0}
      <IconButton
        size="small"
        id="work_{i}_up"
        iconClass="fa-solid fa-arrow-up"
        onclick={() => moveWork(true)}
      />
    {/if}
    {#if i < $workStore.length - 1}
      <IconButton
        size="small"
        id="work_{i}_down"
        iconClass="fa-solid fa-arrow-down"
        onclick={() => moveWork(false)}
      />
    {/if}
    <IconButton
      size="small"
      id="work_{i}_hide"
      iconClass={visible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
      onclick={() => hideWork()}
    />
    <IconButton
      size="small"
      id="work_{i}_delete"
      iconClass="fa-regular fa-trash-can"
      onclick={() => deleteWork()}
    />
  </div>
</h3>

<label for={`work_${i}_name`}>Name</label>
<input
  id={`work_${i}_name`}
  type="text"
  disabled={!visible}
  value={name}
  on:input={(e) => updateWorkProperty('name', e.target.value)}
/>
<label for={`work_${i}_position`}>Position</label>
<input
  id={`work_${i}_position`}
  type="text"
  disabled={!visible}
  value={position}
  on:input={(e) => updateWorkProperty('position', e.target.value)}
/>
<label for={`work_${i}_startDate`}>Start date</label>
<input
  id={`work_${i}_startDate`}
  type="month"
  disabled={!visible}
  value={startDate}
  max={endDate ? endDate : maxDate}
  on:input={(e) => updateWorkProperty('startDate', e.target.value)}
  on:blur={(e) => reportValidity(e)}
/>
<label for={`work_${i}_endDate`}>End date</label>
<input
  id={`work_${i}_endDate`}
  type="month"
  disabled={!visible}
  value={endDate}
  min={startDate ? startDate : maxDate}
  max={maxDate}
  on:input={(e) => updateWorkProperty('endDate', e.target.value)}
  on:blur={(e) => reportValidity(e)}
/>
<HighlightsSubMenu {highlights} {i} />
