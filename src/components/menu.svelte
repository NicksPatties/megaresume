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

<div id="menu-component">
  <button id="open-button" class="open-button" on:click={() => (open = true)}>Open</button>
  <div id="menu" class="menu {open ? 'open' : ''}">
    <header id="menu-header">
      <button id="back-button" on:click={() => (open = false)}>Close</button>
      <h2 class="menu-title">MegaResume</h2>
    </header>
    <div class="menu-contents-container">
      <!-- Menu contents components go in here -->
      <div id="menu-contents-0" class="menu-contents visible">
        <AddEntryButton
          id={'openResume'}
          text={'Open resume'}
          click={() => {
            const fileUpload = document.getElementById('file-upload');
            if (fileUpload != null) fileUpload.click();
            return null;
          }}
        />

        <AddEntryButton
          id={'saveResume'}
          text={'Save resume'}
          click={() => {
            saveDataToJSONFile();
            return null;
          }}
        />

        <AddEntryButton
          id={'printResume'}
          text={'Print resume'}
          click={() => {
            window.print();
            return null;
          }}
        />

        <AddEntryButton
          id={'clearResume'}
          text={'[DEBUG] Clear resume data'}
          click={() => {
            localStorage.removeItem('saveData');
            clearResumeStores();
            return null;
          }}
        />

        <input
          type="file"
          id="file-upload"
          accept=".json"
          style="display: none;"
          on:change={loadFile}
        />

        <h2>Basic Information</h2>

        <Input id={'basics_name'} label={'Name'} value={name} />
        <Input id={'basics_title'} label={'Title'} value={label} />
        <Input id={'basics_phone'} label={'Phone'} value={phone} />
        <Input id={'basics_email'} label={'Email'} value={email} />

        <h2>Work Experience</h2>
        <div class="menu-content">
          {#each $work as w, i}
            <h3 class="submenu-header">
              Work {i + 1}
              <div class="label-controls">
                {#if i > 0}
                  <button id="work_{i}_up" on:click={() => moveWork(i, true)}>Up</button>
                {/if}
                {#if i < $work.length - 1}
                  <button id="work_{i}_down" on:click={() => moveWork(i, false)}>Down</button>
                {/if}
                <button id="work_{i}_hide" on:click={() => hideWork(i)}>
                  {#if get(w.visible)}Hide{:else}Show{/if}
                </button>
                <button id="work_{i}_delete" on:click={() => deleteWork(i, get(w.name))}
                  >Delete</button
                >
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
          <AddEntryButton
            id={'newWork'}
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
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  :root {
    --mobile-width: 400px;
    --menu-height: 100vh;
    --header-height: 42px;
    --menu-box-shadow-width: 12px;
    --divider-color: gray;
    --menu-contents-text-side-padding: 6%;
    --menu-transition-time: 0.35s;
    --menu-transition-page-curve: cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  :root {
    --menu-width: 375px;
    --side-padding: 12px;
  }

  #open-button {
    position: fixed;
    z-index: 0;
    top: 10px;
    left: 10px;
  }

  .menu {
    background-color: white;
    box-shadow: none;
    position: fixed;
    top: 0;
    left: calc(-1 * var(--mobile-width));
    width: var(--mobile-width);
    height: var(--menu-height);
    font-size: 18px;
    font-family: sans-serif;
    user-select: none;
    transition: left var(--menu-transition-time) var(--menu-transition-page-curve);
    z-index: 10;
  }

  .menu.open {
    left: 0;
    box-shadow: var(--divider-color) 0 0 var(--menu-box-shadow-width);
  }

  .menu header {
    display: flex;
    justify-content: center;
    height: var(--header-height);
    box-shadow: var(--divider-color) 0 0 9px;
    clip-path: inset(0 0 -9px 0);
  }

  #back-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .menu-title {
    margin: auto 0;
    text-align: center;
  }

  .menu-contents-container {
    padding: 1em;
    position: relative;
    height: calc(var(--menu-height) - var(--header-height));
    overflow-x: hidden;
  }

  .menu-contents {
    padding: 1em;
    position: absolute;
    top: 0;
    left: calc(-1 * var(--mobile-width));
    width: var(--mobile-width);
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    transition: left var(--menu-transition-time) var(--menu-transition-page-curve);
  }

  .menu-contents.visible {
    left: 0;
  }

  @media only screen and (max-width: 400px) {
    /* should use var but whatever */
    .menu {
      width: 100%;
    }

    .menu.open {
      box-shadow: none;
    }
  }
</style>
