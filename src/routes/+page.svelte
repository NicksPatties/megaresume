<script lang="ts">
  import Form from '@src/components/form/form.svelte';
  import Resume from '@src/components/resume/resume.svelte';
  import { base } from '$app/paths';
  import { loadLocalStorageData } from '@src/data/data';
  import { onMount } from 'svelte';

  onMount(() => {
    loadLocalStorageData();

    const themeInputs = document.querySelectorAll('input[type="radio"][name="resume-theme"')

    // update theme??
    console.log(themeInputs)
    themeInputs.forEach(elem => {
      elem.addEventListener('click', (e) => {
        const target = e.target as HTMLInputElement
        if (target) {
          const name = target.value
          const theme = document.getElementById('current-theme')
          if (theme) {
            theme.setAttribute('href', `${base}/themes/${name}.css`)
          }
        }
      })
    })
  });
</script>

<!-- Add an app component in here? -->
<div id="app-div" class="grid-container">
  <nav class="menu">
    <header>
      <h1><i class="fa-solid fa-file-lines"></i> MegaResume</h1>
    </header>
    <ul>
      <a href="#import">
        <li>
          Import Resume
        </li>
      </a>
      <a href="#basics">
        <li>
          About Me
        </li>
      </a>
      <a href="#work">
        <li>Work Experience</li>
      </a>
      <a href="#education">
        <li>Education</li>
      </a>
      <a href="#skills">
        <li>Skills</li>
      </a>
      <a href="#themes">
        <li>Themes</li>
      </a>
      <div class="separator"></div>
    </ul>
    <footer>
      <ul class="bottom-menu">
        <a href="#settings">
          <li>Settings</li>
        </a>
        <a href="#about">
          <li>About</li>
        </a>
      </ul>
    </footer>
  </nav>
  <main class="panel">
    <nav class="panel-nav">
      <button id="open-menu-button"><i class="fa-solid fa-bars"></i></button>
      <span></span>
      <button id='open-preview-button'>
        <i class="fa-solid fa-file-lines"></i>
      </button>
    </nav>
    <div class="panel-content">
    <Form/>
    </div>
  </main>
  <div id="preview" class="panel">
    <nav class="panel-nav">
      <button id="close-preview-button"><i class="fa-solid fa-arrow-left"></i></button>
      <h1>Resume Preview</h1>
    </nav>
    <div class="resume-container">
      <!-- <div id='resume' class='resume'>
        <h1 id='preview-basics-name'>Hello</h1>
      </div> -->
      <Resume/>
    </div>
  </div>
</div>