<script lang="ts">
  import MenuContents from '@src/components/menu/menuContents.svelte';
</script>

<MenuContents id={'menu-instructions'}>
  <h1 id="welcome">Welcome!</h1>

  <p>
    This application is designed to do cool stuff and make you happy. Would you like to
    automatically create a resume by filling in a few fields? This application is for you!
  </p>

  <h2 id="what-is-this-guide">What is this guide?</h2>

  <p>This guide will help you create your resume from start to finish.</p>

  <h2 id="adding-your-details">Adding your details</h2>

  <h3 id="basic-details">Basic details</h3>

  <p>Just type the details into each of the fields that are in the menu. Neato!</p>

  <h3 id="work-details">Work details</h3>

  <p>
    This is a little more complicated, but if you type your details into the resume, then you should
    be a-ok!
  </p>

  <p>You can also add more than one work thing at a time!</p>

  <h4 id="highlights">Highlights</h4>

  <p>Highlights are cool. You can toggle their visibility by pressing the correct button.</p>

  <h2 id="saving-and-opening-your-resume">Saving and opening your resume</h2>

  <p>
    Your data stays on your browser, so there's no need to worry about it leaking out over the
    Internet. Thank goodness! Any time you type into the fields, they are updated in the Resume view
    to the right, and you'll
  </p>

  <p>
    You can also choose to save your data in a file and then load it into the app at a later time!
  </p>

  <h3 id="opening-your-resume">Opening your resume</h3>

  <p>
    Load a previously saved resume by clicking the <span class="button-like">Open Resume</span>
    button. Find your resume in the following propmts and open it. The file format is
    <code>.json</code>
  </p>

  <h3 id="saving-your-resume">Saving your resume</h3>

  <p>
    If you'd like to save your resume to another file, click the <span class="button-like"
      >Save Resume</span
    > button. Then you will be prompted to select a file location and name for your file.
  </p>

  <h2>That's about it!</h2>

  <p>
    If you'd like to try out more of MegaResume, head back to the <button
      id="main-menu-link"
      class="link-like"
      on:click={() => console.log('clicked!')}>main menu!</button
    >
  </p>
</MenuContents>
