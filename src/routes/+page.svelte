<script lang="ts">
  import Form from '@src/components/form/form.svelte';
  import Resume from '@src/components/resume/resume.svelte';
  import { base } from '$app/paths';
  import { loadLocalStorageData, projectsStore } from '@src/data/data';
  import { onMount } from 'svelte';
  import { workStore } from '@src/data/data';

  function openMenu() {
    let appDiv = document.getElementById('app-div');
    if (appDiv) appDiv.classList.add('menu-open');
    let navElement = document.querySelector('#app-div nav');
    if (navElement) {
      const firstNav = navElement.querySelector('a');
      if (firstNav) firstNav.focus();
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

  function onMenuClick() {
    closeMenu();
    closePreview();
  }

  onMount(() => {
    loadLocalStorageData();

    const themeInputs = document.querySelectorAll('input[type="radio"][name="resume-theme"');
    // put information in the size bar

    // update theme??
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
      <a on:click={onMenuClick} href="#import">
        <li>Import Resume</li>
      </a>
      <a on:click={onMenuClick} href="#basics">
        <li>About Me</li>
      </a>
      <a on:click={onMenuClick} href="#work">
        <li>Work Experience</li>
      </a>
      {#each $workStore as w, i}
        <a on:click={onMenuClick} href="#work-{i}">
          <li class="indent">{w.name}</li>
        </a>
      {/each}
      <a on:click={onMenuClick} href="#projects">
        <li>Projects</li>
      </a>
      {#each $projectsStore as p, i}
        <a on:click={onMenuClick} href="#projects-{i}">
          <li class="indent">{p.name}</li>
        </a>
      {/each}
      <a on:click={onMenuClick} href="#education">
        <li>Education</li>
      </a>
      <a on:click={onMenuClick} href="#skills">
        <li>Skills</li>
      </a>
      <a on:click={onMenuClick} href="#themes">
        <li>Themes</li>
      </a>
      <a on:click={onMenuClick} href="#export">
        <li>Export Resume</li>
      </a>
      <div class="separator"></div>
    </ul>
    <footer>
      <ul class="bottom-menu">
        <a on:click={onMenuClick} href="#settings">
          <li>Settings</li>
        </a>
        <a on:click={onMenuClick} href="#about">
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
<Resume print={true} />
