<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import {
    clearResumeStores,
    loadData,
    saveData,
    saveResumeDataToLocalStorage,
    type SaveData
  } from '@src/data/data';

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
</script>

<MenuContents id="menu-options">
  <h1>options menu</h1>

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
</MenuContents>
