<script lang="ts">
  import type { BasicsStore, WorkStore, EducationStore } from '@src/data/data';
  import { onInput } from '@src/util/eventListeners';
  import type { Writable } from 'svelte/store';
  import WorkResume from './workResume.svelte';
  import EducationResume from './educationResume.svelte';

  export let basics: BasicsStore;
  export let work: Writable<WorkStore[]>;
  export let education: Writable<EducationStore[]>;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;

  onresize = () => {
    console.log(`window height: ${window.innerHeight}`);
    const resumeHeight = 1056; // 11in
    const margin = 42;
    const fittedResumeHeight = window.innerHeight - margin * 2;
    const scale = fittedResumeHeight / resumeHeight;
    console.log(scale);
  };
</script>

<div class="resume-container">
  <div class="resume">
    <!-- This is where the theme information will be placed in the future -->
    <div class="basics">
      <input
        id="basic_information-name"
        class="name"
        type="text"
        placeholder="Firstname Lastname"
        value={$name}
        on:input={(e) => onInput(e, name)}
      />
      <input
        id="label"
        class="subname"
        type="text"
        placeholder="Job Title"
        value={$label}
        on:input={(e) => onInput(e, label)}
      />
      <input
        id="phone"
        class="subname"
        type="text"
        placeholder="+15555555555"
        value={$phone}
        on:input={(e) => onInput(e, phone)}
      />
      <input
        id="email"
        class="subname"
        type="text"
        placeholder="placeholder@email.com"
        value={$email}
        on:input={(e) => onInput(e, email)}
      />
    </div>
    <div class="experience">
      <h3>Work Experience</h3>
      <ul>
        {#each $work as w}
          <WorkResume
            name={w.name}
            position={w.position}
            startDate={w.startDate}
            endDate={w.endDate}
            highlights={w.highlights}
          />
        {/each}
      </ul>
    </div>
    <div class="education">
      <h3>Education</h3>
      <ul>
        {#each $education as edu}
          <EducationResume
            studyType={edu.studyType}
            institution={edu.institution}
            area={edu.area}
            startDate={edu.startDate}
            endDate={edu.endDate}
            score={edu.score}
            courses={edu.courses}
          />
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  :root {
    --A4height: 1056px; /* 11in */
    --A4width: 816px; /* 8.5in */
    --pointFiveIn: 48px;
  }

  .resume-container {
    z-index: -1;
    overflow-y: scroll;
  }

  .resume {
    transform-origin: center top;
    height: var(--A4height);
    width: var(--A4width);
    background: white;
    box-shadow: 0px 0px 9px black;
    transform: scale(1);
    margin: 42px auto;
  }

  /* Theme classes and such */
  .resume {
    padding: var(--pointFiveIn);
    width: calc(var(--A4width) - 2 * var(--pointFiveIn));
    height: calc(var(--A4height) - 2 * var(--pointFiveIn));
  }

  .resume input {
    border: none;
    font-family: 'Times New Roman', Times, serif;
  }

  .basics {
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-bottom: 0.25in;
  }

  .name {
    font-size: 24px;
  }

  .subname {
    font-size: 18px;
  }

  ul {
    font-size: 18px;
  }
</style>
