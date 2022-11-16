<script lang="ts">
  import Input from '@src/components/input.svelte';
  import AddEntryButton from '@src/components/addEntryButton.svelte';
  import {
    type BasicsStore,
    WorkStore,
    loadData,
    saveResumeDataToLocalStorage,
    clearResumeStores,
    saveData,
    type SaveData
  } from '@src/data/data';
  import { type Writable, get } from 'svelte/store';
  import WorkMenu from '@src/components/workMenu.svelte';
  import { arrayMove } from '@src/util/arrayMove';

  let open = false;

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

  function removeWork(i: number, name: string) {
    if (window.confirm(`Are you sure you would like to remove this work experience? ${name}`)) {
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
  class="open-button"
  on:click={() => {
    open = true;
  }}>Open</button
>
<div class="menu {open ? 'open' : ''}">
  <div class="menu-header">
    <button
      class="close-button"
      on:click={() => {
        open = false;
      }}>Close</button
    >
    <h1>Mega Resume</h1>
  </div>

  <AddEntryButton
    text={'Open resume'}
    click={() => {
      const fileUpload = document.getElementById('file-upload');
      if (fileUpload != null) fileUpload.click();
      return null;
    }}
  />

  <AddEntryButton
    text={'Save resume'}
    click={() => {
      saveDataToJSONFile();
      return null;
    }}
  />

  <AddEntryButton
    text={'Print resume'}
    click={() => {
      window.print();
      return null;
    }}
  />

  <AddEntryButton
    text={'[DEBUG] Clear resume data'}
    click={() => {
      localStorage.removeItem('saveData');
      clearResumeStores();
      return null;
    }}
  />

  <input type="file" id="file-upload" accept=".json" style="display: none;" on:change={loadFile} />

  <h2>Basic Information</h2>

  <Input label={'Name'} value={name} />
  <Input label={'Title'} value={label} />
  <Input label={'Phone'} value={phone} />
  <Input label={'Email'} value={email} />

  <h2>Work Experience</h2>
  <div class="menu-content">
    {#each $work as w, i}
      <h3 class="submenu-header">
        Work {i + 1}
        <div class="label-controls">
          {#if i > 0}
            <button on:click={() => moveWork(i, true)}>Up</button>
          {/if}
          {#if i < $work.length - 1}
            <button on:click={() => moveWork(i, false)}>Down</button>
          {/if}
          <button on:click={() => hideWork(i)}
            >{#if get(w.visible)}Hide{:else}Show{/if}</button
          >
          <button on:click={() => removeWork(i, get(w.name))}>Delete</button>
        </div>
      </h3>
      <WorkMenu
        visible={w.visible}
        name={w.name}
        position={w.position}
        startDate={w.startDate}
        endDate={w.endDate}
        highlights={w.highlights}
      />
    {/each}
    <AddEntryButton
      text={'Add new work entry'}
      click={() => {
        work.update((w) => {
          w.push(new WorkStore());
          return w;
        });
        return null;
      }}
    />
  </div>
</div>

<style>
  :root {
    --menu-width: 375px;
    --side-padding: 12px;
  }

  .open-button {
    z-index: 1;
    left: var(--side-padding);
    top: 10.25px;
    position: fixed;
  }

  .menu-header {
    display: flex;
    align-items: center;
    height: 42px;
  }

  .close-button {
    position: absolute;
    left: 12px;
    top: 10.25px;
  }

  .menu-header h1 {
    margin: auto;
    position: sticky;
  }

  .menu {
    z-index: 10;
    position: fixed;
    top: 0;
    left: calc((var(--menu-width) + 2 * var(--side-padding)) * -1);
    height: 100vh;
    overflow-y: scroll;
    width: var(--menu-width);
    background: lightgray;
    transition: left ease 0.3s;
    padding: 0 var(--side-padding);
  }

  .menu.open {
    left: 0;
  }

  .submenu-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  h2 {
    margin-bottom: 12px;
  }

  h3 {
    margin-bottom: 8px;
  }
</style>
