<script lang="ts">
  import MonthOptions from '@src/components/monthOptions.svelte';
  import {
    saveResumeDataToLocalStorage,
    projectsStore,
    type Project,
    createBlankProject,
  } from '@src/data/data';
  import { Tag, addTag, getTag } from '@src/data/tag';

  function updateProjectProperty(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target == null) return;

    const [iStr, propname] = target.id.split('_').slice(1);
    const prop = propname;
    const i = parseInt(iStr);

    projectsStore.update((projectsArray: Project[]) => {
      const value = target.value;
      // I would like to just do something like workArray[i][prop], but
      // that doesn't work, so this is what I have to do instead
      if (prop == 'startYear') projectsArray[i].startYear = value
      else if (prop == 'role') projectsArray[i].role = value
      else if (prop == 'startMonth') projectsArray[i].startMonth = value
      else if (prop == 'endYear') projectsArray[i].endYear = value
      else if (prop == 'endMonth') projectsArray[i].endMonth = value
      else if (prop == 'current') projectsArray[i].current = target.checked
      else if (prop == 'name') projectsArray[i].name = value;
      saveResumeDataToLocalStorage();
      return projectsArray;
    });
  }

  function addProject() {
    projectsStore.update((p: Project[]) => {
      p.push(createBlankProject());
      return p;
    });
  }

  function toggleProjectVisibility(i: number) {
    projectsStore.update((projects: Project[]) => {
      projects[i].visible = !projects[i].visible;
      saveResumeDataToLocalStorage();
      return projects;
    });
  }

  function deleteProject(e: Event) {
    const target = e.target as HTMLButtonElement;
    const nameId = [...target.id.split('_').slice(0, 2), 'name'].join('_');
    const nameInput = document.getElementById(nameId) as HTMLInputElement;
    const name = nameInput.value;
    const i = parseInt(nameInput.id.split('_')[1]);
    if (window.confirm(`Are you sure you would like to delete this project? ${name}`)) {
      projectsStore.update((projects: Project[]) => {
        projects.splice(i, 1);
        saveResumeDataToLocalStorage();
        return projects;
      });
    }
  }

  function addHighlight(i: number) {
    projectsStore.update((projects: Project[]) => {
      projects[i].highlights.push({
        visible: true,
        content: '',
        tagNames: []
      });
      saveResumeDataToLocalStorage();
      return projects;
    });
  }

  function onHighlightInput(e: Event, i: number, k: number) {
    const target = e.target as HTMLInputElement;
    if (target) {
      projectsStore.update((projects: Project[]) => {
        projects[i].highlights[k].content = target.value;
        saveResumeDataToLocalStorage();
        return projects;
      });
    }
  }

  function toggleHighlightVisibility(i:number, k: number) {
    projectsStore.update((projects: Project[]) => {
      const visible = projects[i].highlights[k].visible;
      projects[i].highlights[k].visible = !visible;
      saveResumeDataToLocalStorage();
      return projects;
    });
  }

  function deleteHighlight(i: number, k: number) {
    if (window.confirm('Are you sure you would like to delete this highlight?')) {
      projectsStore.update((projects: Project[]) => {
        projects[i].highlights.splice(k, 1);
        saveResumeDataToLocalStorage();
        return projects;
      });
    }
  }

  function onTagKeydown(e: KeyboardEvent, i: number, k: number) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const currValue = target ? target.value : '';
    if (e.key == 'Enter' && currValue.length > 0) {
      // if the tag is not in the tags, add the tag into the store
      if (getTag(currValue) == undefined) {
        addTag(new Tag(currValue));
      }

      // add tag to the highlight
      projectsStore.update((projects: Project[]) => {
        let tagNames = projects[i].highlights[k].tagNames;
        if (tagNames == undefined) tagNames = [];
        tagNames.push(currValue);
        projects[i].highlights[k].tagNames = tagNames;
        saveResumeDataToLocalStorage();
        return projects;
      });

      target.value = '';
    }
  }

  function onHighlightSkillDelete(i: number, k: number, tagI: number) {
    projectsStore.update((workArray) => {
      workArray[i].highlights[k].tagNames.splice(tagI, 1);
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }
</script>

<section id="projects">
  <h1>Projects</h1>
  {#each $projectsStore as p, i}
    <h2>{p.name || `Project ${i + 1}`}</h2>
    <div class="full-width" id={`projects-${i}`}></div>
    <label class="has-text-input half-width">
      <span>Name</span>
      <input type="text" id={`projects_${i}_name`} value={p.name} on:input={updateProjectProperty} />
    </label>    
    <label class="has-text-input half-width">
      <span>Role</span>
      <input type="text" id={`projects_${i}_role`} value={p.role} on:input={updateProjectProperty} />
    </label>
    <label class="has-text-input half-width">
      <span>Start year</span>
      <input
        type="number"
        min="1900"
        placeholder="YYYY"
        id={`projects_${i}_startYear`}
        value={p.startYear}
        on:input={updateProjectProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>Start month</span>
      <select id={`projects_${i}_startMonth`} value={p.startMonth} on:input={updateProjectProperty}>
        <MonthOptions />
      </select>
    </label>
    <label class="has-checkbox-input">
      <input type="checkbox" id={`projects_${i}_current`} value={p.current} on:input={updateProjectProperty}/>
      <span>Project is active</span>
    </label>
    <label class="has-text-input half-width">
      <span>End year</span>
      <input
        type="number"
        min="1900"
        placeholder="YYYY"
        disabled={p.current}
        id={`projects_${i}_endYear`}
        value={p.endYear}
        on:input={updateProjectProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>End month</span>
      <select id={`projects_${i}_endMonth`} value={p.endMonth} disabled={p.current} on:input={updateProjectProperty}>
        <MonthOptions />
      </select>
    </label>
    <h3 id="highlights">Accomplishments</h3>

    <!-- Highlights start here -->
    {#each p.highlights as h, k}
      <label class="has-text-input">
        <span>Accomplishment</span>
        <textarea
          id={`projects_${i}_highlights_${k}_content`}
          rows="5"
          value={h.content}
          placeholder="This is an accomplishment..."
          on:input={(e) => {onHighlightInput(e, i, k)}}
        ></textarea>
      </label>
      <label class="has-text-input">
        <span>Related skills <span style="font-size: x-small"><i>Press Enter to add your skill</i></span></span>
        <!-- Enables searching the skills in the skillsSection -->
        <input
          id={`projects_${i}_highlights_${k}_skills-search`}
          type="search"
          placeholder="Search skills..."
          list="existing-skills"
          enterkeyhint="enter"
          autocapitalize="none"
          on:keydown={(e) => onTagKeydown(e, i, k)}
        />
        <ul class="related-skills-list">
          {#each h.tagNames as name, si}
            <li id={`projects_${i}_highlight_${k}_skill_${name}`}>
              {name}
              <button
                id={`projects_${i}_highlight_${k}_skill_${name}_remove`}
                on:click={() => onHighlightSkillDelete(i, k, si)}
              >
                <i class="fa-regular fa-x"></i>
              </button>
            </li>
          {/each}
        </ul>
      </label>
      <button id={`projects_${i}_highlight_${k}_toggle-visibility`} on:click={() => {toggleHighlightVisibility(i, k)}}>
        {h.visible ? 'Hide accomplishment' : 'Show accomplishment'}
      </button>
      <button id="remove" on:click={() => {deleteHighlight(i, k)}}>Remove accomplishment</button>
    {/each}

    <button id={`projects_${i}_add-highlight`} on:click={() => {addHighlight(i)}}>Add accomplishment</button>
    <button id={`projects_${i}_toggle-visibility`} on:click={() => {toggleProjectVisibility(i)}}>
      {p.visible ? 'Hide project' : 'Show project'}
    </button>
    <button id={`projects_${i}_remove`} on:click={deleteProject}>Remove project</button>
    <div class='full-width' style={'margin: 4rem'}></div>
  {/each}
  <button id="add-projects" on:click={addProject}>Add project</button>
</section>
