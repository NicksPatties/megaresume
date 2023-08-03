<script lang="ts">
  import { type Education, educationStore, saveResumeDataToLocalStorage } from '@src/data/data';
  import IconButton from '@src/components/iconButton.svelte';

  export let i: number;
  export let visible: boolean;
  export let name: string;
  export let type: string;
  export let degree: string;
  export let startDate: string;
  export let endDate: string;

  function updateEducationProperty(e: Event, propname: keyof Education) {
    const target = e.target as HTMLInputElement;
    if (target == null) return;
    educationStore.update((eduArray) => {
      const value = target.value;
      if (propname == 'name') eduArray[i].name = value;
      else if (propname == 'type') eduArray[i].type = value;
      else if (propname == 'degree') eduArray[i].degree = value;
      else if (propname == 'startDate') eduArray[i].startDate = value;
      else if (propname == 'endDate') eduArray[i].endDate = value;
      saveResumeDataToLocalStorage();
      return eduArray;
    });
  }

  function hideEducation() {
    educationStore.update((eduArray) => {
      eduArray[i].visible = !eduArray[i].visible;
      saveResumeDataToLocalStorage();
      return eduArray;
    });
  }

  function deleteEducation() {
    if (
      window.confirm(`Are you sure you'd like to delete this entry from your education? ${name}`)
    ) {
      educationStore.update((eduArray) => {
        const eduCopy = eduArray.slice();
        eduCopy.splice(i, 1);
        saveResumeDataToLocalStorage();
        return eduCopy;
      });
    }
  }
</script>

<!-- name -->
<h3 class="submenu-header">
  Education {i + 1}
  <div class="label-controls">
    <IconButton
      size="small"
      id="education_{i}_hide"
      iconClass={visible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
      onclick={() => hideEducation()}
    />
    <IconButton
      size="small"
      id="education_{i}_delete"
      iconClass="fa-regular fa-trash-can"
      onclick={() => deleteEducation()}
    />
  </div>
</h3>
<label for="education_{i}_name">Name</label>
<input
  id="education_{i}_name"
  type="text"
  value={name}
  disabled={!visible}
  on:input={(e) => updateEducationProperty(e, 'name')}
/>

<!-- type -->
<label for="education_{i}_type">Type</label>
<input
  id="education_{i}_type"
  type="text"
  value={type}
  disabled={!visible}
  on:input={(e) => updateEducationProperty(e, 'type')}
/>

<!-- degree -->
<label for="education_{i}_degree">Degree</label>
<input
  id="education_{i}_degree"
  type="text"
  value={degree}
  disabled={!visible}
  on:input={(e) => updateEducationProperty(e, 'degree')}
/>

<!-- startDate -->
<label for="education_{i}_startDate">Start Date</label>
<input
  id="education_{i}_startDate"
  type="month"
  value={startDate}
  disabled={!visible}
  on:input={(e) => updateEducationProperty(e, 'startDate')}
/>

<!-- endDate -->
<label for="education_{i}_endDate">End Date</label>
<input
  id="education_{i}_endDate"
  type="month"
  value={endDate}
  disabled={!visible}
  on:input={(e) => updateEducationProperty(e, 'endDate')}
/>
