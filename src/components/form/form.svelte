<script lang="ts">
  import BasicsSection from '@src/components/form/basicsSection.svelte';
  import WorkSection from '@src/components/form/workSection.svelte';
  import ProjectsSection from '@src/components/form/projectsSection.svelte';
  import EducationSection from '@src/components/form/educationSection.svelte';
  import SkillsSection from '@src/components/form/skillsSection.svelte';
  import ImportSection from './importSection.svelte';
  import { type SaveData, saveData } from '@src/data/data';

   /**
   * Saves the contents of the resume in a MegaResume Json file
   */
   function saveDataToJsonFile() {
    const data: SaveData = saveData();
    const blob: Blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${data.basics.name} ${data.basics.label}`;
    a.dispatchEvent(new MouseEvent('click'));
    URL.revokeObjectURL(a.href);
    a.remove();
  }
  
  function printResume() {
    window.print()
  }
</script>

<div class="form">
  <ImportSection/>

  <BasicsSection/>

  <WorkSection/>

  <ProjectsSection/>

  <EducationSection/>

  <SkillsSection/>

  <section id="themes">
    <h1>Themes</h1>
    <label class="has-checkbox-input">
      <input type="radio" name="resume-theme" value="default" checked />
      <span>Default</span>
    </label>
    <label class="has-checkbox-input">
      <input type="radio" name="resume-theme" value="monospace" />
      <span>Monospace</span>
    </label>
  </section>

  <section id="export">
    <h1>Export Resume</h1>
    <p class='full-width'>Prepare a printed copy or a saved PDF of your resume to submit to your job application.</p>
    <button on:click={printResume}>Print or Save PDF</button>
    <p class='full-width'>Save your MegaResume data to move to another device.</p>
    <button on:click={saveDataToJsonFile}>Save as MegaResume Data</button>
    <p class='full-width'>Export your resume as a JSON Resume to use in another application.</p>
    <button disabled>Save as JSON Resume</button>

  </section>

  <section id="settings">
    <h1>Settings</h1>
    <label class="has-checkbox-input">
      <input type="checkbox" />
      <span>Invert resume colors</span>
    </label>
    <button class="danger">Clear Data</button>
  </section>

  <section id="about" class="align-center">
    <h1>About MegaResume</h1>
    <i class="full-width">Version <span id="version-number">0.0.1</span></i>
    <i class="full-width">Created by <a href="https://github.com/NicksPatties">NicksPatties</a></i>
    <ul class="full-width no-dots">
      <li>Found something wrong? <a href="https://github.com/NicksPatties/megaresume/issues/new">Submit a bug report here.</a></li>
    </ul>
  </section>
</div>
