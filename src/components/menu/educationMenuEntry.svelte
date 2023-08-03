<script lang="ts">
  import { type Education, educationStore } from '@src/data/data';

  export let i: number;
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
      return eduArray;
    });
  }
</script>

<!-- name -->
<h3>Education {i + 1}</h3>
<label for="education_{i}_name">Name</label>
<input
  id="education_{i}_name"
  type="text"
  value={name}
  on:input={(e) => updateEducationProperty(e, 'name')}
/>

<!-- type -->
<label for="education_{i}_type">Type</label>
<input
  id="education_{i}_type"
  type="text"
  value={type}
  on:input={(e) => updateEducationProperty(e, 'type')}
/>

<!-- degree -->
<label for="education_{i}_degree">Degree</label>
<input
  id="education_{i}_degree"
  type="text"
  value={degree}
  on:input={(e) => updateEducationProperty(e, 'degree')}
/>

<!-- startDate -->
<label for="education_{i}_startDate">Start Date</label>
<input
  id="education_{i}_startDate"
  type="text"
  value={startDate}
  on:input={(e) => updateEducationProperty(e, 'startDate')}
/>

<!-- endDate -->
<label for="education_{i}_endDate">End Date</label>
<input
  id="education_{i}_endDate"
  type="text"
  value={endDate}
  on:input={(e) => updateEducationProperty(e, 'endDate')}
/>
