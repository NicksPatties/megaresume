<script lang="ts">
  import BasicsSection from '@src/components/form/basicsSection.svelte';
  import WorkSection from '@src/components/form/workSection.svelte';
  import EducationSection from '@src/components/form/educationSection.svelte';
  import SkillsSection from '@src/components/form/skillsSection.svelte';

  window.addEventListener('beforeprint', createResumePrintPreview)

  window.addEventListener('afterprint', destroyResumePrintPreview)

  function createResumePrintPreview() {
    console.log('in createResumePrintPreview')
    const resumePreview = document.getElementById('resume')
    if (!resumePreview) {
      console.error("There is no resume for some reason!")
      return
    }
    const previewCopy = resumePreview.cloneNode(true) as HTMLElement
    previewCopy.id = 'print-resume'
    document.body.appendChild(previewCopy)
  }

  function destroyResumePrintPreview() {
    console.log('in destroyResumePrintPreview')
    const attachedPreview = document.getElementById('print-resume')
    if(!attachedPreview) {
      console.error("I can't find the resume print preview!")
      return
    }
    document.body.removeChild(attachedPreview)
  }

  function printResume() {
    window.print()
  }
</script>

<div class="form">
  <section id="import">
    <h1>Import Resume</h1>
    <p class="full-width">MegaResume uses the JSON Resume format to import your resume. <a
        id="what-is-json-resume" href="https://jsonresume.org/schema/">Learn more about JSON Resume.</a></p>
    <input id="import-json-input" type="file" accept=".json" style="display:none">
    <button id="import-json-resume">Import JSON Resume</button>
  </section>

  <BasicsSection/>

  <WorkSection/>

  <EducationSection/>

  <section id="education">
    <h1>Education</h1> 
    <button id="add-education">Add education</button>
  </section>

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
    <button disabled>Save MegaResume Data (Coming soon)</button>
    <p class='full-width'>Export your resume as a JSON Resume to use in another application.</p>
    <button disabled>Save MegaResume Data (Coming soon)</button>

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
    <i class="full-width">version <span id="version-number">0.0.1</span></i>
    <p class="full-width">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quam quae veritatis earum
      illum dolorem cumque quo nam, magnam labore itaque culpa at adipisci voluptates perspiciatis, laborum
      iusto quisquam? Earum.</p>
    <h2>Any questions?</h2>
    <p class="full-width">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, non.</p>
    <ul class="full-width no-dots">
      <li><span>Submit a bug report on Github</span></li>
      <li><span>Follow MegaResume on social media</span></li>
    </ul>
  </section>
</div>