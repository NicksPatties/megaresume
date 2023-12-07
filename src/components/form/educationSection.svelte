<script lang='ts'>
  import MonthOptions from "@src/components/monthOptions.svelte";
  import {
    educationStore,
    saveResumeDataToLocalStorage, 
    type Education 
  } from "@src/data/data";

  function updateEducationProperty(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target == null) return;

    const [iStr, propname] = target.id.split('_').slice(1);
    const prop = propname as keyof Education;
    const i = parseInt(iStr);

    educationStore.update((eduArray) => {
      const value = target.value;
      // I would like to just do something like workArray[i][prop], but
      // that doesn't work, so this is what I have to do instead
      if (prop == 'name') eduArray[i].name = value;
      else if (prop == 'degree') eduArray[i].degree = value;
      else if (prop == 'major') eduArray[i].major = value;
      else if (prop == 'startDate') eduArray[i].startDate = value;
      else if (prop == 'endDate') eduArray[i].endDate = value;
      saveResumeDataToLocalStorage();
      return eduArray;
    });
  }

  function addEducation() {
    educationStore.update((edu) => {
      edu.push({
        visible: true,
        name: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: ''
      });
      return edu;
    });
  }

  function removeEducation(e: Event) {
    const target = e.target as HTMLButtonElement;
    const nameId = [...target.id.split('_').slice(0, 2), 'name'].join('_');
    const nameInput = document.getElementById(nameId) as HTMLInputElement;
    const name = nameInput.value;
    const i = parseInt(nameInput.id.split('_')[1]);
    if (window.confirm(`Are you sure you would like to delete this education? ${name}`)) {
      educationStore.update((edu) => {
        edu.splice(i, 1);
        saveResumeDataToLocalStorage();
        return edu;
      });
    }
  }
</script>

<section id="education">
  <h1>Education</h1>
  {#each $educationStore as e, i}
    <h2 id="header" data-section-start>Education Name</h2>
    <label class="has-text-input half-width">
      <span>School</span>
      <input type="text" id={`education_${i}_name`} value={e.name} on:input={updateEducationProperty}/>
    </label>
    <label class="has-text-input half-width">
      <span>Degree</span>
      <input type="text" id={`education_${i}_degree`} value={e.degree} on:input={updateEducationProperty}/>
    </label>
    <label class="has-text-input">
      <span>Major</span>
      <input type="text" id={`education_${i}_major`} value={e.major} on:input={updateEducationProperty}/>
    </label>
    <label class="has-text-input half-width">
      <span>Start year</span>
      <input
        type="number" 
        min="1900" 
        max="2023" 
        placeholder="YYYY" 
        id={`education_${i}_startDate_year`}
        value={e.startDate.split('-')[0]}
      />
    </label>
    <label class="has-text-input half-width">
      <span>Start month</span>
      <select id={`education_${i}_startDate_month`} value={e.startDate.split('-')[1]}>
        <MonthOptions/>
      </select>
    </label>
    <label class="has-checkbox-input half-width">
      <input type="checkbox" id={`education_${i}_current`} />
      <span>I am currently attending</span>
    </label>
    <label class="has-text-input half-width">
      <span>End year</span>
      <input
        type="number" 
        min="1900" 
        max="2023" 
        placeholder="YYYY" 
        id={`education_${i}_endDate_year`}
        value={e.endDate.split('-')[0]}
      />
    </label>
    <label class="has-text-input half-width">
      <span>End month</span>
      <select id={`education_${i}_endDate_month`} value={e.endDate.split('-')[1]}>
        <MonthOptions/>
      </select>
    </label>
    <button id={`education_${i}_remove`} on:click={removeEducation}>Remove education</button>
  {/each}
  <button id="add-education" on:click={addEducation}>Add education</button>
</section>