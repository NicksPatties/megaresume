<script lang="ts">
  import type { RealResumeData } from '../data/data';
  export let resume: RealResumeData;
</script>

<div class="resume-container">
  <div class="resume">
    <!-- This is where the theme information will be placed in the future -->
    <div class="basicInformation">
      <input
        id="basic_information-name"
        class="name"
        type="text"
        placeholder="Firstname Lastname"
        value={resume.basicInformation.name}
      />
      <input
        id="title"
        class="subname"
        type="text"
        placeholder="Job Title"
        value={resume.basicInformation.title}
      />
      <input
        id="contact"
        class="subname"
        type="text"
        placeholder="+15555555555"
        value={resume.basicInformation.contact}
      />
      <input
        id="location"
        class="subname"
        type="text"
        placeholder="Location"
        value={resume.basicInformation.location}
      />
    </div>
    <div class="experience">
      <h3>Work Experience</h3>
      <ul>
        {#each resume.experience as exp}
          <li>{exp.title}, {exp.company} <i>{exp.startDate}-{exp.endDate}</i></li>
          <ul>
            {#each exp.highlights as highlight}
              <li>{highlight}</li>
            {/each}
          </ul>
        {/each}
      </ul>
    </div>
    <div class="education">
      <h3>Education</h3>
      <ul>
        {#each resume.education as edu}
          <li>{edu.degree}: {edu.institution} {edu.startDate}-{edu.endDate}</li>
          <ul>
            {#each edu.highlights as highlight}
              <li>{highlight}</li>
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

  .basicInformation {
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
