<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let studyType: Writable<string>;
  export let institution: Writable<string>;
  export let area: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let score: Writable<string>;
  export let courses: Writable<string[]>;
</script>

<li>{$studyType}: {$institution} <i>{$startDate} - {$endDate}</i></li>
<ul>
  <li>{$area}</li>
  <li>{$score}</li>
  {#each $courses as course}
    <li>{course}</li>
  {/each}
</ul>
