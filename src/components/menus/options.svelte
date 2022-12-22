<script lang="ts">
  import { onMount } from 'svelte';

  let closed = false;
  let dropdownHeight: string;
  let click = () => {
    closed = !closed;
  };

  onMount(() => {
    const elem = document.getElementById('text-input-dropdown');
    if (elem) {
      dropdownHeight = `${elem.getBoundingClientRect().height}px`;
    }
  });
</script>

<h1>options menu</h1>
<fieldset>
  <legend>Text box inputs</legend>
  <label for="input-text">Text input <button on:click={click}>Toggle</button></label>
  <div id="text-input-dropdown" class="dropdown" style:height={closed ? '0px' : dropdownHeight}>
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
  </div>
</fieldset>

<fieldset>
  <!-- May not actually use a legend for this since I want to hide the contents of the rest of the field set...-->
  <legend>Inline input items</legend>
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
</fieldset>

<fieldset>
  <legend>Button inputs</legend>
  <!-- Honestly would probably just use a button and hide this input -->
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
</fieldset>
<div class="divider" />

<style>
  .dropdown {
    transition: height 0.5s ease-in-out;
    overflow-y: hidden;
  }
</style>
