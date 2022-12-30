<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import CollapsableDropdown from '../collapsableDropdown.svelte';
</script>

<MenuContents id="menu-options">
  <h1>options menu</h1>

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
    <label for="button-input">Button input</label>
    <input id="button-input" type="button" value="Click me!" />
  </CollapsableDropdown>

  <div class="divider" />
</MenuContents>
