<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { onInput, onArrayInput } from '../util/eventListeners';

  export let studyType: Writable<string>;
  export let institution: Writable<string>;
  export let area: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let score: Writable<string>;
  export let courses: Writable<string[]>;
</script>

<label for="studyType">Study Type</label>
<input id="studyType" type="text" value={$studyType} on:input={(e) => onInput(e, studyType)} />

<label for="institution">Institution</label>
<input
  id="institution"
  type="text"
  value={$institution}
  on:input={(e) => onInput(e, institution)}
/>

<label for="area">Area</label>
<input id="area" type="text" value={$area} on:input={(e) => onInput(e, area)} />

<label for="startDate">Start Date</label>
<input id="startDate" type="text" value={$startDate} on:input={(e) => onInput(e, startDate)} />

<label for="endDate">End Date</label>
<input id="endDate" type="text" value={$endDate} on:input={(e) => onInput(e, endDate)} />

<label for="score">Score</label>
<input id="score" type="text" value={$score} on:input={(e) => onInput(e, score)} />

<label for="courses">Courses</label>
{#each $courses as course, i}
  <input
    id="courses[{i}]"
    type="text"
    value={course}
    on:input={(e) => {
      onArrayInput(e, courses, i);
    }}
  />
{/each}
