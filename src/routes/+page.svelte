<script lang="ts">
  import Form from '@src/components/form/form.svelte';
  import Resume from '@src/components/resume/resume.svelte';
  import { base } from '$app/paths';
  import { loadLocalStorageData } from '@src/data/data';
  import { onMount } from 'svelte';

  function openMenu() {
    let appDiv = document.getElementById('app-div');
    if (appDiv) appDiv.classList.add('menu-open');
    let navElement = document.querySelector('#app-div nav');
    if (navElement) {
      const firstNav = navElement.querySelector('a')
      if (firstNav) firstNav.focus()
    }
  }

  function closeMenu() {
    let appDiv = document.getElementById('app-div');
    if (appDiv) appDiv.classList.remove('menu-open');
  }

  function openPreview() {
    let appDiv = document.getElementById('app-div');
    if (appDiv) appDiv.classList.add('preview-open');
  }

  function closePreview() {
    let appDiv = document.getElementById('app-div');
    if (appDiv) appDiv.classList.remove('preview-open');
  }

  onMount(() => {
    loadLocalStorageData();

    const themeInputs = document.querySelectorAll('input[type="radio"][name="resume-theme"');

    // update theme??
    console.log(themeInputs);
    themeInputs.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        const target = e.target as HTMLInputElement;
        if (target) {
          const name = target.value;
          const theme = document.getElementById('current-theme');
          if (theme) {
            theme.setAttribute('href', `${base}/themes/${name}.css`);
          }
        }
      });
    });

    /**
     * Nav menu bar event listeners 
    */

    document.querySelectorAll('nav.menu a').forEach((elem) => {
      elem.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.querySelectorAll('#open-menu-button').forEach((elem) => {
      elem.addEventListener('click', () => {
        openMenu();
      });
    });

    document.querySelectorAll('#open-preview-button').forEach((elem) => {
      elem.addEventListener('click', () => {
        openPreview();
      });
    });

    document.querySelectorAll('#close-preview-button').forEach((elem) => {
      elem.addEventListener('click', () => {
        closePreview();
      });
    });

    document.addEventListener('resize', () => {
      if (window.innerWidth > 30) {
        closeMenu();
      }
      if (window.innerWidth > 1300) {
        closePreview();
      }
    });
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
        <li>Import Resume</li>
      </a>
      <a href="#basics">
        <li>About Me</li>
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
      <a href="#export">
        <li>Export Resume</li>
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
      <button id="open-preview-button">
        <i class="fa-solid fa-file-lines"></i>
      </button>
    </nav>
    <div class="panel-content">
      <Form />
    </div>
  </main>
  <div id="preview" class="panel">
    <nav class="panel-nav">
      <button id="close-preview-button"><i class="fa-solid fa-arrow-left"></i></button>
      <h1>Resume Preview</h1>
    </nav>
    <div class="resume-container">
      <Resume />
    </div>
  </div>
</div>
<Resume print={true}/>
