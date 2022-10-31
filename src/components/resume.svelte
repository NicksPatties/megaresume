<script lang="ts">
  import type { BasicsStore, ResumeData, WorkStore } from '../data/data';
  import { onInput } from '../util/eventListeners';
  import { get } from 'svelte/store';

  export let resume: ResumeData;
  export let basics: BasicsStore;
  export let work: WorkStore;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;

  const workName = work.name;
  const workPosition = work.position;
  const workUrl = work.url;
  const workStartDate = work.startDate;
  const workEndDate = work.endDate;
  const workSummary = work.summary;
  const workHighlights = work.highlights;
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
        <li>{$workPosition}, {$workName} <i>{$workStartDate} - {$workEndDate}</i></li>
        <ul>
          {#each $workHighlights as highlight}
            <li>{highlight}</li>
          {/each}
        </ul>
      </ul>
    </div>
    <div class="education">
      <h3>Education</h3>
      <ul>
        {#each resume.education as edu}
          <li>{edu.studyType}: {edu.institution} {edu.startDate}-{edu.endDate}</li>
          <ul>
            {#each edu.courses as course}
              <li>{course}</li>
            {/each}
          </ul>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .resume-container {
    z-index: -1;
    overflow-y: scroll;
  }

  .resume {
    transform-origin: center top;
    height: 11in;
    width: 8.5in;
    background: white;
    box-shadow: 0px 0px 9px black;
    transform: scale(1);
    margin: 42px auto;
  }

  /* Theme classes and such */
  .resume {
    padding: 0.5in;
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
