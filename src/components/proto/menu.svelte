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
      <ul class="menu-group" id="inputs-menu-contents">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
      <div class="divider" />
      <ul class="menu-group">
        <li>Option 4</li>
        <li>Option 5</li>
        <li>Option 6</li>
        <li>Option 7</li>
        <div class="divider" />
        <li>Option 8</li>
        <li>Option 9</li>
        <li>Option 10</li>
        <li>Option 11</li>
        <li>Option 12</li>
      </ul>
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
  }

  .menu-contents > :is(h1, h2, h3, h4, h5, h6, p) {
    padding: 0 var(--menu-contents-text-side-padding);
    margin: 0.75em 0em;
  }

  .menu-group {
    margin: 0;
    padding: 0;
  }

  .menu-group > li {
    list-style: none;
    font-size: 1em;
    padding: 0.5em 0 0.5em var(--menu-contents-text-side-padding);
  }

  .menu-group li:hover {
    background-color: red;
  }

  .menu-group li:active {
    background-color: yellow;
  }

  .divider {
    width: 80%;
    height: 1px;
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
