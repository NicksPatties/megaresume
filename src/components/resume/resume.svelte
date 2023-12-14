<script lang="ts">
  import WorkResumeEntry from '@src/components/resume/workResumeEntry.svelte';
  import { basicsStore, workStore, educationStore } from '@src/data/data';
  import { tagsStore } from '@src/data/tag';
  import { derived } from 'svelte/store';
  import isWorkVisible from '@src/data/isWorkVisible';

  export let print = false;

  let basics = basicsStore;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;
  const location = basics.location;
  const summary = basics.summary;

  let visibleWorkStores = derived([workStore, tagsStore], ($values) => {
    const [work, tags] = $values;
    return work.filter((w) => isWorkVisible(w, tags));
  });

  let anyVisibleEducationItems = derived(educationStore, (edu) => {
    return edu.filter((ed) => ed.visible).length > 0;
  });

  let visibleSkills = derived(tagsStore, (tag) => {
    return tag.filter((t) => t.visible);
  });
</script>

<div id={print ? 'print-resume' : 'resume'} class="resume" data-testid="resume">
  <div class="basics">
    <h1 class:placeholder={$name.length == 0}>{$name ? $name : 'Your name'}</h1>
    {#if $label.length > 0}
      <p class="subname">{$label}</p>
    {/if}  
    {#if $location.length > 0}
      <p class="subname">{$location}</p>
    {/if} 
  </div>

  <div class="left">
    <div class="experience">
      {#if $visibleWorkStores.length > 0}
        <h2>Work Experience</h2>
        {#each $visibleWorkStores as w, i}
          {#if w.visible}
            <WorkResumeEntry
              {i}
              name={w.name}
              position={w.position}
              startYear={w.startYear}
              endYear={w.endYear}
              highlights={w.highlights}
              current={w.current}
            />
          {/if}
        {/each}
      {:else}
        <h2 class="placeholder">Your work experience will go here.</h2>
      {/if}
    </div>
  </div>

  <div class="right">
    {#if $summary.length > 0}
      <div class="summary">
        <h2>Summary</h2>
        <span>{$summary}</span>
      </div>
    {/if}

    {#if $phone.length > 0 || $email.length > 0}
      <div class='contact'>
        <h2>Contact</h2>
        {#if $phone.length > 0}
          <p><b>Phone</b></p>
          <p>{$phone}</p>
        {/if}
        <br/>
        {#if $email.length > 0}
          <p><b>Email</b></p>
          <p>{$email}</p>
        {/if}
      </div>
    {/if}

    {#if $visibleSkills.length > 0}
      <div class="skills">
        <h2>Skills</h2>
        <ul>
          {#each $visibleSkills as skill}
            <li><b>{skill.name}</b></li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if $anyVisibleEducationItems}
      <div class="education">
        <h2>Education</h2>
        {#each $educationStore as edu}
          {#if edu.visible}
            <p><b>{edu.degree}</b></p>
            <p>{edu.major}</p>
            <p>{edu.name}</p>
            <p><i>{edu.startYear || 'start year'} - {edu.endYear || 'end year'}</i></p>
            <br>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>
