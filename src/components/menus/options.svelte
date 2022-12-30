<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import CollapsableDropdown from '@src/components/collapsableDropdown.svelte';
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

  <CollapsableDropdown name={'Text box inputs'}>
    <label for="input-text">Text input</label>
    <input id="input-text" type="text" placeholder="Type your text here" />
    <label for="email-input">
      Email input <span class="hint">(i.e. sample@email.com)</span>
    </label>
    <input id="email-input" type="email" placeholder="sample@email.com" />
    <label for="url-input">
      Url input <span class="hint">(kinda like https://google.com)</span>
    </label>
    <input id="url-input" type="url" />
    <label for="phone-input">Phone number input</label>
    <input id="phone-input" type="tel" />
    <label for="date-input">Date input</label>
    <input id="date-input" type="date" />
    <label for="month-input">Month input</label>
    <input id="month-input" type="month" />
    <label for="textarea-input">Textarea input</label>
    <textarea id="textarea-input" rows="4" />
    <label for="select-input">Select input</label>
    <select id="select-input" value="0">
      <option value="0" disabled>Pick one of the following</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <label for="text-list-input">
      Text list input <span class="hint">(Select from the list or type your own) </span>
    </label>
    <input id="text-list-input" type="text" list="text-list" />
    <datalist id="text-list">
      <option value="one">Option 1</option>
      <option value="two">Option 2</option>
      <option value="three">Option 3</option>
    </datalist>
  </CollapsableDropdown>

  <CollapsableDropdown name={'Inline input items'}>
    <div class="inline-input">
      <label for="checkbox-input">Checkbox</label>
      <input id="checkbox-input" type="checkbox" />
    </div>
    <div class="inline-input">
      <label for="radio-input-group-1">Radio 1</label>
      <input id="radio-input-group-1" type="radio" value="1" name="radio" />
    </div>
    <div class="inline-input">
      <label for="radio-input-group-2">Radio 2</label>
      <input id="radio-input-group-2" type="radio" value="2" name="radio" />
    </div>
  </CollapsableDropdown>

  <CollapsableDropdown name={'Button inputs'}>
    <div class="inline-input">
      <label for="file-input">File input</label>
      <input id="file-input" type="file" />
    </div>
    <div class="inline-input">
      <label for="color-input">Color input</label>
      <input id="color-input" type="color" />
    </div>
    <div class="inline-input">
      <label for="button-input">Button input</label>
      <input id="button-input" type="button" value="Click me!" />
    </div>
  </CollapsableDropdown>

  <div class="divider" />
</MenuContents>
