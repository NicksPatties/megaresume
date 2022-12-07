<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const openButton = document.getElementById('open-button');
    const backButton = document.getElementById('back-button');
    const menu = document.getElementById('menu');
    if (openButton != null) {
      openButton.onclick = () => {
        if (menu != null) menu.style.display = '';
      };
    }

    if (backButton != null) {
      backButton.onclick = () => {
        if (menu != null) menu.style.display = 'none';
      };
    }
  });
</script>

<div id="menu-component">
  <button id="open-button">Open</button>
  <div id="menu" class="menu">
    <header id="menu-header">
      <button id="back-button">Close</button>
      <h2 class="menu-title">Menu Test</h2>
    </header>
    <div class="menu-contents" id="text-menu-contents">
      <h1>What if I the text right now?</h1>
      <p>
        Putting text inside of the menu may be a cool thing when you're adding a some documentation
        into the whatever the funk I dunno. It doesn't need to be inside a menu group at all so
        that's nice.
      </p>
      <h2>Making the blungy</h2>
      <p>
        You can just do the whatever and that's fine. Lorem ipsum is kinda boring so it's fun to
        make dumb shit myself!
      </p>
      <h3>Next step</h3>
      <p>Do the thing</p>
      <h4>Next step</h4>
      <p>Do the thing</p>
      <h5>Next step</h5>
      <p>Do the thing</p>
      <h6>I am baby</h6>
      <p>Yes you are</p>
      <div class="divider" />
      <!-- form elements can exist outside of another class, which may be easier -->
      <fieldset>
        <legend>Text box inputs</legend>
        <label for="input-text">Text input</label>
        <input id="input-text" type="text" placeholder="Type your text here" />
        <label for="email-input">Email input</label>
        <input id="email-input" type="email" placeholder="sample@email.com" />
        <label for="url-input">Url input</label>
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
        <label for="text-list-input">Text list input</label>
        <input id="text-list-input" type="text" list="text-list" />
        <datalist id="text-list">
          <option value="one">Option 1</option>
          <option value="two">Option 2</option>
          <option value="three">Option 3</option>
        </datalist>
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
      <div class="divider" />
      <footer>
        <p><i>Made with 💨 by NicksPatties</i></p>
      </footer>
    </div>
    <!-- end menu-contents -->
  </div>
  <!-- end menu -->
</div>

<style>
  * {
    box-sizing: object-fit;
    /* background: none; */
  }

  :root {
    --mobile-width: 400px;
    --menu-height: 100vh;
    --header-height: 42px;
    --menu-box-shadow-width: 12px;
    --divider-color: gray;
    --menu-contents-text-side-padding: 6%;
  }

  /**
    Menu component styles
  **/
  .menu {
    background-color: white;
    box-shadow: var(--divider-color) 0 0 var(--menu-box-shadow-width);
    position: fixed;
    top: 0;
    left: 0;
    width: var(--mobile-width);
    height: var(--menu-height);
    font-size: 18px;
    font-family: sans-serif;
    user-select: none;
  }

  /**
    Menu header content
  **/
  #open-button {
    position: fixed;
    z-index: 0;
    top: 10px;
    left: 10px;
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

  /**
    Menu contents... content
  **/
  .menu-contents {
    overflow-y: scroll;
    height: calc(var(--menu-height) - var(--header-height));
    display: flex;
    flex-direction: column;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  label {
    margin: 0.75em 0;
    padding: 0 var(--menu-contents-text-side-padding);
  }

  /* input fields */
  input,
  select,
  textarea {
    padding: 1px 2px;
    font-family: serif;
    font-size: 0.9em;
    min-height: 2em;
    margin: 0 var(--menu-contents-text-side-padding);
  }

  textarea {
    resize: none;
    min-height: 5em;
  }

  input[type='date'] {
    min-height: 2em;
  }

  select {
    box-sizing: initial;
    min-height: 2em;
    padding: 1px 2px;
    border-width: 2px;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
    margin: 0;
  }

  legend {
    float: left; /* remove legend from border of fieldset */
    margin: 0.75em 0;
    font-weight: bold;
    padding: 0 var(--menu-contents-text-side-padding);
  }

  .inline-input {
    display: flex;
    justify-content: space-between;
    margin: 0.75em 0;
    padding: 0 var(--menu-contents-text-side-padding);
  }

  .inline-input label {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .inline-input input {
    min-height: 1em;
    margin: 0;
  }

  .divider {
    width: 80%;
    padding-top: 1px;
    background: linear-gradient(90deg, white, #bababa, #bababa, white);
    margin: 1em auto;
  }

  footer p {
    font-size: 0.75em;
    margin: 0.75em 0em;
    text-align: center;
  }

  @media only screen and (max-width: 400px) {
    /* should use var but whatever */
    .menu {
      box-shadow: none;
      width: 100%;
    }
  }
</style>
