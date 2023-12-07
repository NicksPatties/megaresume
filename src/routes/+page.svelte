<script lang="ts">
  import { base } from '$app/paths';
  import Resume from '@src/components/resume/resume.svelte';
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

        <template id="new-highlight">
          <label data-section-start data-highlight id='' class="has-text-input">
            <span>Accomplishment</span>
            <textarea id="text" rows="3" placeholder="This is an accomplishment..."></textarea>
          </label>
          <label class="has-text-input">
            <span>Related skills</span>
            <input id='skills-search' type="search" placeholder="Search skills...">
            <select id='skills-select' multiple={true}>
            </select>
          </label>
          <button id="remove">Remove accomplishment</button>
        </template>

        <template id="new-work">
          <!-- The ids in this section will have their ids prepended with work-i where i is the index -->
          <h2 data-section-start id="header">Work Name</h2>
          <label class="has-text-input half-width">
            <span>Company</span>
            <input type="text" id="name" />
          </label>
          <label class="has-text-input half-width">
            <span>Job Title</span>
            <input type="text" id="position" />
          </label>
          <label class="has-text-input half-width">
            <span>Start year</span>
            <input type="number" min="1900" max="2023" placeholder="YYYY" id="startDate-year" />
          </label>
          <label class="has-text-input half-width">
            <span>Start month</span>
            <select id="startDate-month">
              <option value="">Select month...</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>
          <label class="has-checkbox-input">
            <input type="checkbox" id="current" />
            <span>I currently work here</span>
          </label>
          <label class="has-text-input half-width">
            <span>End year</span>
            <input type="number" min="1900" max="2023" placeholder="YYYY" id="endDate-year" />
          </label>
          <label class="has-text-input half-width">
            <span>End month</span>
            <select id="endDate-month">
              <option value="">Select month...</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>
          <h3 id="highlights">Accomplishments</h3>
          <button id="add-highlight">Add accomplishment</button>
          <button id="remove">Remove work experience</button>
        </template>

        <section id="work">
          <h1>Work Experience</h1>
          <button id="add-work">Add work experience</button>
        </section>

        <template id="new-education">
          <h2 id="header" data-section-start>Education Name</h2>
          <label class="has-text-input half-width">
            <span>School</span>
            <input type="text" id="institution" />
          </label>
          <label class="has-text-input half-width">
            <span>Degree</span>
            <input type="text" id="studyType" />
          </label>
          <label class="has-text-input">
            <span>Major</span>
            <input type="text" id="area" />
          </label>
          <label class="has-text-input half-width">
            <span>Start year</span>
            <input type="number" min="1900" max="2023" placeholder="YYYY" id="startDate-year" />
          </label>
          <label class="has-text-input half-width">
            <span>Start month</span>
            <select id="startDate-month">
              <option value="">Select month...</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>
          <label class="has-checkbox-input half-width">
            <input type="checkbox" id="current" />
            <span>I am currently attending</span>
          </label>
          <label class="has-text-input half-width">
            <span>End year</span>
            <input type="number" min="1900" max="2023" placeholder="YYYY" id="endDate-year" />
          </label>
          <label class="has-text-input half-width">
            <span>End month</span>
            <select id="endDate-month">
              <option value="">Select month...</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>
          <button id="remove">Remove education</button>
        </template>

        <section id="education">
          <h1>Education</h1> 
          <button id="add-education">Add education</button>
        </section>

        <template id="new-skill-table-row">
          <tr id="skills-#">
            <td><label id="skills-#-name" for="skills-#-visibility">Skill name</label></td>
            <td><input type="checkbox" id="skills-#-visibility" checked></td>
            <td><button id="skills-#-remove"><i class="fa-solid fa-trash"></i></button></td>
          </tr>
        </template>

        <section id="skills">
          <h1>Skills</h1>
          <label class="has-text-input">
            <span>Search</span>
            <input type="search" placeholder="CSS, Git, etc..." id="skill-search" />
          </label>
          <table>
            <tbody>
            </tbody>
          </table>
          <label class="has-text-input">
            <span>New skill</span>
            <input type="text" placeholder="CSS, Git, etc..." id="new-skill-name" />
          </label>
          <button id="add-skill">Add skill</button>
        </section>

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