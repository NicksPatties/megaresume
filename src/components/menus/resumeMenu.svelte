<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import Input from '@src/components/input.svelte';
  import IconButton from '@src/components/iconButton.svelte';
  import WorkMenu from '@src/components/workMenu.svelte';
  import {
    basicsStore,
    workStores,
    loadLocalStorageData,
    saveResumeDataToLocalStorage,
    BasicsStore,
    WorkStore
  } from '@src/data/data';
  import { arrayMove } from '@src/util/arrayMove';
  import { get, type Writable } from 'svelte/store';
  import { onMount } from 'svelte';

  let basics: BasicsStore = basicsStore;
  let work: Writable<WorkStore[]> = workStores;

  onMount(() => {
    loadLocalStorageData();
  });

  function deleteWork(i: number, name: string) {
    if (window.confirm(`Are you sure you would like to delete this work experience? ${name}`)) {
      work.update((w) => {
        w.splice(i, 1);
        saveResumeDataToLocalStorage();
        return w;
      });
    }
  }

  function hideWork(i: number) {
    work.update((w) => {
      const currVisibility = get(w[i].visible);
      w[i].visible.set(!currVisibility);
      saveResumeDataToLocalStorage();
      return w;
    });
  }

  function moveWork(i: number, up: boolean) {
    work.update((w) => {
      w = up ? arrayMove(w, i, i - 1) : arrayMove(w, i, i + 1);
      saveResumeDataToLocalStorage();
      return w;
    });
  }
</script>

<MenuContents id="menu-resume">
  <h2>Basic Information</h2>
  <Input id={'basics_name'} label={'Name'} value={basics.name} />
  <Input id={'basics_title'} label={'Title'} value={basics.label} />
  <Input id={'basics_phone'} label={'Phone'} value={basics.phone} />
  <Input id={'basics_email'} label={'Email'} value={basics.email} />

  <h2>Work Experience</h2>
  {#each $work as w, i}
    <h3 class="submenu-header">
      Work {i + 1}
      <div class="label-controls">
        {#if i > 0}
          <IconButton
            size="small"
            id="work_{i}_up"
            iconClass="fa-solid fa-arrow-up"
            onclick={() => moveWork(i, true)}
          />
        {/if}
        {#if i < $work.length - 1}
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
          iconClass={get(w.visible) ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
          onclick={() => hideWork(i)}
        />
        <IconButton
          size="small"
          id="work_{i}_delete"
          iconClass="fa-regular fa-trash-can"
          onclick={() => deleteWork(i, get(w.name))}
        />
      </div>
    </h3>
    <WorkMenu
      {i}
      visible={w.visible}
      name={w.name}
      position={w.position}
      startDate={w.startDate}
      endDate={w.endDate}
      highlights={w.highlights}
    />
  {/each}
  <button
    id="newWork"
    class="big-btn"
    on:click={() => {
      work.update((w) => {
        w.push(new WorkStore());
        return w;
      });
    }}>Add new work entry</button
  >
</MenuContents>
