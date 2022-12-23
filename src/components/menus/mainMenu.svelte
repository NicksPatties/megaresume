<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import Input from '@src/components/input.svelte';
  import WorkMenu from '@src/components/workMenu.svelte';
  import {
    clearResumeStores,
    loadData,
    saveData,
    saveResumeDataToLocalStorage,
    BasicsStore,
    WorkStore,
    type SaveData
  } from '@src/data/data';
  import { get, type Writable } from 'svelte/store';
  import { arrayMove } from '@src/util/arrayMove';

  export let basics: BasicsStore;
  export let work: Writable<WorkStore[]>;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;

  function loadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file != undefined) {
      console.log(`File uploaded! ${file.name}: ${file.size}`);
      const fr = new FileReader();
      fr.onload = (e) => {
        if (e.target == null) {
          console.error('something went wrong opening the file. try again?');
        } else {
          loadData(e.target.result as string);
          saveResumeDataToLocalStorage();
        }
      };
      fr.readAsText(file);
    }
  }

  function saveDataToJSONFile() {
    const data: SaveData = saveData();
    const blob: Blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${data.basics.name} ${data.basics.label}`;
    a.dispatchEvent(new MouseEvent('click'));
    URL.revokeObjectURL(a.href);
    a.remove();
  }

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

<button
  id="openResume"
  class="big-btn"
  on:click={() => {
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload != null) fileUpload.click();
  }}>Open resume</button
>

<button id="saveResume" class="big-btn" on:click={() => saveDataToJSONFile()}>Save resume</button>

<button id="printResume" class="big-btn" on:click={() => window.print()}>Print resume</button>

<button
  id="clearResume"
  class="big-btn"
  on:click={() => {
    localStorage.removeItem('saveData');
    clearResumeStores();
  }}>[DEBUG] Clear resume data</button
>

<input type="file" id="file-upload" accept=".json" style="display: none;" on:change={loadFile} />

<input type="file" id="file-upload" accept=".json" style="display: none;" on:change={loadFile} />

<h2>Basic Information</h2>

<Input id={'basics_name'} label={'Name'} value={name} />
<Input id={'basics_title'} label={'Title'} value={label} />
<Input id={'basics_phone'} label={'Phone'} value={phone} />
<Input id={'basics_email'} label={'Email'} value={email} />

<h2>Work Experience</h2>
{#each $work as w, i}
  <h3 class="submenu-header">
    Work {i + 1}
    <div class="label-controls">
      {#if i > 0}
        <IconButton
          id="work_{i}_up"
          iconClass="fa-solid fa-arrow-up"
          onclick={() => moveWork(i, true)}
        />
      {/if}
      {#if i < $work.length - 1}
        <IconButton
          id="work_{i}_down"
          iconClass="fa-solid fa-arrow-down"
          onclick={() => moveWork(i, false)}
        />
      {/if}
      <IconButton
        id="work_{i}_hide"
        iconClass={get(w.visible) ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
        onclick={() => hideWork(i)}
      />
      <IconButton
        id="work_{i}_delete"
        iconClass="fa-solid fa-trash-can"
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
