<script lang="ts">
  import WorkSection from '@src/components/form/workSection.svelte';
  import EducationSection from '@src/components/form/educationSection.svelte';
    import SkillsSection from './skillsSection.svelte';
</script>

<div class="form">
  <section id="import">
    <h1>Import Resume</h1>
    <p class="full-width">MegaResume uses the JSON Resume format to import your resume. <a
        id="what-is-json-resume" href="https://jsonresume.org/schema/">Learn more about JSON Resume.</a></p>
    <input id="import-json-input" type="file" accept=".json" style="display:none">
    <button id="import-json-resume">Import JSON Resume</button>
  </section>

  <section id="basics">
    <h1>About Me</h1>
    <label class="has-text-input half-width">
      <span>Full name</span>
      <input type="text" id="basics-name" />
    </label>
    <label class="has-text-input half-width">
      <span>Job title</span>
      <input type="text" id="basics-label" />
    </label>
    <label class="has-text-input half-width">
      <span>Email</span>
      <input type="email" id="basics-email" />
    </label>
    <label class="has-text-input half-width">
      <span>Phone</span>
      <input type="text" id="basics-phone" />
    </label>
    <label class="has-text-input">
      <span>Location</span>
      <input type="text" id="basics-location" />
    </label>
    <label class="has-text-input ">
      <span>Summary</span>
      <input type="text" id="basics-summary" />
    </label>
  </section>

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