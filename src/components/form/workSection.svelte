<script lang="ts">
  import MonthOptions from '@src/components/monthOptions.svelte';
  import {
    saveResumeDataToLocalStorage,
    createBlankWork,
    type Work,
    workStore,
  } from '@src/data/data';
  import { tagsStore } from '@src/data/tag';

  function updateWorkProperty(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target == null) return;

    const [iStr, propname] = target.id.split('_').slice(1);
    const prop = propname as keyof Work;
    const i = parseInt(iStr);

    workStore.update((workArray) => {
      const value = target.value;
      // I would like to just do something like workArray[i][prop], but
      // that doesn't work, so this is what I have to do instead
      if (prop == 'name') workArray[i].name = value;
      else if (prop == 'position') workArray[i].position = value;
      else if (prop == 'startDate') workArray[i].startDate = value;
      else if (prop == 'endDate') workArray[i].endDate = value;
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function addWork() {
    workStore.update((w) => {
      w.push(createBlankWork());
      return w;
    });
  }

  function deleteWork(e: Event) {
    const target = e.target as HTMLButtonElement;
    const nameId = [...target.id.split('_').slice(0, 2), 'name'].join('_');
    const nameInput = document.getElementById(nameId) as HTMLInputElement;
    const name = nameInput.value;
    const i = parseInt(nameInput.id.split('_')[1]);
    if (window.confirm(`Are you sure you would like to delete this work experience? ${name}`)) {
      workStore.update((w) => {
        w.splice(i, 1);
        saveResumeDataToLocalStorage();
        return w;
      });
    }
  }

  // function addHighlight() {
  //   workStore.update((workArray) => {
  //     workArray[i].highlights.push({
  //       visible: true,
  //       content: '',
  //       tagNames: []
  //     });
  //     saveResumeDataToLocalStorage();
  //     return workArray;
  //   });
  // }
</script>

<section id="work">
  <h1>Work Experience</h1>
  {#each $workStore as w, i}
    <h2 id="header">{w.name || `Work ${i + 1}`}</h2>
    <label class="has-text-input half-width">
      <span>Company</span>
      <input type="text" id={`work_${i}_name`} value={w.name} on:input={updateWorkProperty} />
    </label>
    <label class="has-text-input half-width">
      <span>Job Title</span>
      <input
        type="text"
        id={`work_${i}_position`}
        value={w.position}
        on:input={updateWorkProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>Start year</span>
      <input
        type="number"
        min="1900"
        max="2023"
        placeholder="YYYY"
        id={`work_${i}_startDate_year`}
        value={w.startDate.split('-')[0]}
      />
    </label>
    <label class="has-text-input half-width">
      <span>Start month</span>
      <select id={`work_${i}_startDate_month`} value={w.startDate.split('-')[1]}>
        <MonthOptions />
      </select>
    </label>
    <label class="has-checkbox-input">
      <!-- current doens't actually exist in a work object, btw-->
      <input type="checkbox" id={`work_${i}_current`} />
      <span>I currently work here</span>
    </label>
    <label class="has-text-input half-width">
      <span>End year</span>
      <input
        type="number"
        min="1900"
        max="2023"
        placeholder="YYYY"
        id={`work_${i}_endDate_year`}
        value={w.endDate.split('-')[0]}
      />
    </label>
    <label class="has-text-input half-width">
      <span>End month</span>
      <select id={`work_${i}_endDate_month`} value={w.startDate.split('-')[1]}>
        <MonthOptions />
      </select>
    </label>
    <h3 id="highlights">Accomplishments</h3>
    {#each w.highlights as h, k}
      <label class="has-text-input">
        <span>Accomplishment</span>
        <textarea
          id={`work_${i}_highlights_${k}_content`}
          rows="3"
          value={h.content}
          placeholder="This is an accomplishment..."
        ></textarea>
      </label>
      <label class="has-text-input">
        <span>Related skills</span>
        <input id="skills-search" type="search" placeholder="Search skills..." />
        <select id="skills-select" multiple={true}>
          {#each $tagsStore as skill}
            <!-- Not really doing anything with the skills right now tbh -->
            <option
              value={skill.name}
              selected={h.tagNames.find((elem) => elem == skill.name) !== undefined}
            >
              {skill.name}
            </option>
          {/each}
        </select>
      </label>
      <button id="remove">Remove accomplishment</button>
    {/each}
    <button id={`work_${i}_add-highlight`}>Add accomplishment</button>
    <button id={`work_${i}_remove`} on:click={deleteWork}>Remove work experience</button>
  {/each}
  <button id="add-work" on:click={addWork}>Add work experience</button>
</section>