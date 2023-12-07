<script lang="ts">
  import MonthOptions from '@src/components/monthOptions.svelte';
  import {
    saveResumeDataToLocalStorage,
    createBlankWork,
    workStore,
  } from '@src/data/data';
  import { tagsStore } from '@src/data/tag';

  function updateWorkProperty(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target == null) return;

    const [sectionId, iStr, propname] = target.id.split('_');
    const prop = propname;
    const i = parseInt(iStr);

    workStore.update((workArray) => {
      const value = target.value;
      // I would like to just do something like workArray[i][prop], but
      // that doesn't work, so this is what I have to do instead
      if (prop == 'startDate' || prop == 'endDate') {
        const section = document.getElementById(sectionId)
        if (section) {
          const idPrefix = [sectionId, iStr, propname].join('_')
          const yearField = section.querySelector(`#${idPrefix}_year`) as HTMLInputElement
          const monthField = section.querySelector(`#${idPrefix}_month`) as HTMLInputElement
          if (yearField && monthField) {
            const year = yearField.value
            const month = monthField.value
            if (year && month) {
              const newDate = year + '-' + month
              workArray[i][prop] = newDate
            }
          }
        }
      }
      else if (prop == 'name') workArray[i].name = value;
      else if (prop == 'position') workArray[i].position = value;
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

  function addHighlight(i: number) {
    workStore.update((workArray) => {
      workArray[i].highlights.push({
        visible: true,
        content: '',
        tagNames: []
      });
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function onHighlightInput(e: Event, i: number, k: number) {
    const target = e.target as HTMLInputElement;
    if (target) {
      workStore.update((workArray) => {
        workArray[i].highlights[k].content = target.value;
        saveResumeDataToLocalStorage();
        return workArray;
      });
    }
  }

  function deleteHighlight(i: number, k: number) {
    if (window.confirm('Are you sure you would like to delete this highlight?')) {
      workStore.update((workArray) => {
        workArray[i].highlights.splice(k, 1);
        saveResumeDataToLocalStorage();
        return workArray;
      });
    }
  }
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
        on:input={updateWorkProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>Start month</span>
      <select id={`work_${i}_startDate_month`} value={w.startDate.split('-')[1]} on:input={updateWorkProperty}>
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
        on:input={updateWorkProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>End month</span>
      <select id={`work_${i}_endDate_month`} value={w.startDate.split('-')[1]} on:input={updateWorkProperty}>
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
          on:input={(e) => {onHighlightInput(e, i, k)}}
        ></textarea>
      </label>
      <label class="has-text-input">
        <span>Related skills</span>
        <input id={`work_${i}_highlights_${k}_skills-search`} type="search" placeholder="Search skills..." />
        <select id={`work_${i}_highlights_${k}_skills-select`} multiple={true}>
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
      <button id="remove" on:click={() => {deleteHighlight(i, k)}}>Remove accomplishment</button>
    {/each}
    <button id={`work_${i}_add-highlight`} on:click={() => {addHighlight(i)}}>Add accomplishment</button>
    <button id={`work_${i}_remove`} on:click={deleteWork}>Remove work experience</button>
  {/each}
  <button id="add-work" on:click={addWork}>Add work experience</button>
</section>
