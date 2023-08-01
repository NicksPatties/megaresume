<script lang="ts">
  import { type Education, educationStore } from '@src/data/data';

  export let i: number;
  export let name: string;

  function updateEducationProperty(e: Event, propname: keyof Education) {
    const target = e.target as HTMLInputElement;
    if (target == null) return;
    educationStore.update((eduArray) => {
      const value = target.value;
      if (propname == 'name') eduArray[i].name = value;
      return eduArray;
    });
  }
</script>

<h3>Education {i + 1}</h3>
<label for="education_name">Name</label>
<input
  id="education_{i}_name"
  type="text"
  value={name}
  on:input={(e) => updateEducationProperty(e, 'name')}
/>
