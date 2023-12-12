<script lang="ts">
  import WorkResumeEntry from '@src/components/resume/workResumeEntry.svelte';
  import EducationResumeEntry from '@src/components/resume/educationResumeEntry.svelte';
  import { basicsStore, workStore, educationStore } from '@src/data/data';
  import { tagsStore } from '@src/data/tag';
  import { dateInputToDecoratedString } from '@src/util/resumeUtils';
  import { derived } from 'svelte/store';
  import isWorkVisible from '@src/data/isWorkVisible';

  export let print = false

  let basics = basicsStore;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;
  const location = basics.location;
  const summary = basics.summary;

  let visibleWorkStores = derived([workStore, tagsStore], ($values) => {
    const [work, tags] = $values
    return work.filter(w => isWorkVisible(w, tags))
  });

  let anyVisibleEducationItems = derived(educationStore, (edu) => {
    return edu.filter((ed) => ed.visible).length > 0;
  });

  let visibleSkills = derived(tagsStore, (tag) => {
    return tag.filter((t) => t.visible);
  });
</script>

<div id="{print ? 'print-resume' : 'resume'}" class="resume" data-testid="resume">
  <div class="basics">
    <p class="name" class:placeholder={$name.length == 0}>{$name ? $name : 'Your name'}</p>
    <p class="subname" class:placeholder={$label.length == 0}>
      {$label ? $label : 'Your profession'}
    </p>
    <p class="subname" class:placeholder={$location.length == 0}>
      {$location ? $location : 'Location'}
    </p>
    <p class="subname" class:placeholder={$phone.length == 0}>
      {$phone ? $phone : '(555) 555-5555'}
    </p>
    <p class="subname" class:placeholder={$email.length == 0}>
      {$email ? $email : 'youremail@email.com'}
    </p>
  </div>

  {#if $summary.length > 0}
    <div class="summary">
      <h3>Summary</h3>
      <span>{$summary}</span>
    </div>
  {/if}

  {#if $visibleSkills.length > 0}
    <div class="skills">
      <h3>Skills</h3>
      <ul>
        {#each $visibleSkills as skill}
          <li>{skill.name}</li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="experience">
    {#if $visibleWorkStores.length > 0}
      <h3>Work Experience</h3>
      {#each $visibleWorkStores as w, i}
        {#if w.visible}
          <WorkResumeEntry
            {i}
            name={w.name}
            position={w.position}
            startDate={dateInputToDecoratedString(w.startDate, 'Start date')}
            endDate={dateInputToDecoratedString(w.endDate, 'End date')}
            highlights={w.highlights}
          />
        {/if}
      {/each}
    {:else}
      <h3 class="placeholder">Your work experience will go here.</h3>
    {/if}
  </div>

  {#if $anyVisibleEducationItems}
    <div class="education">
      <h3>Education</h3>
      {#each $educationStore as edu, i}
        {#if edu.visible}
          <EducationResumeEntry
            {i}
            name={edu.name}
            degree={edu.degree}
            major={edu.major}
            startDate={dateInputToDecoratedString(edu.startDate, 'Start date')}
            endDate={dateInputToDecoratedString(edu.endDate, 'End date')}
          />
        {/if}
      {/each}
    </div>
  {/if}

  
</div>

<style>

</style>
