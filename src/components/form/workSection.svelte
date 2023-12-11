<script lang="ts">
  import MonthOptions from '@src/components/monthOptions.svelte';
  import {
    saveResumeDataToLocalStorage,
    createBlankWork,
    workStore,
  } from '@src/data/data';
  import { Tag, addTag, getTag } from '@src/data/tag';

  function updateWorkProperty(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target == null) return;

    const [iStr, propname] = target.id.split('_').slice(1);
    const prop = propname;
    const i = parseInt(iStr);

    workStore.update((workArray) => {
      const value = target.value;
      // I would like to just do something like workArray[i][prop], but
      // that doesn't work, so this is what I have to do instead
      if (prop == 'startYear') workArray[i].startYear = value
      else if (prop == 'startMonth') workArray[i].startMonth = value
      else if (prop == 'endYear') workArray[i].endYear = value
      else if (prop == 'endMonth') workArray[i].endMonth = value
      else if (prop == 'current') workArray[i].current = target.checked
      else if (prop == 'name') workArray[i].name = value;
      else if (prop == 'position') workArray[i].position = value;
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function addWork() {
    workStore.update((w) => {
      w.push(createBlankWork());
      return w;
    });
  }

  function toggleWorkVisibility(i: number) {
    workStore.update((workArray) => {
      workArray[i].visible = !workArray[i].visible;
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function deleteWork(e: Event) {
    const target = e.target as HTMLButtonElement;
    const nameId = [...target.id.split('_').slice(0, 2), 'name'].join('_');
    const nameInput = document.getElementById(nameId) as HTMLInputElement;
    const name = nameInput.value;
    const i = parseInt(nameInput.id.split('_')[1]);
    if (window.confirm(`Are you sure you would like to delete this work experience? ${name}`)) {
      workStore.update((w) => {
        w.splice(i, 1);
        saveResumeDataToLocalStorage();
        return w;
      });
    }
  }

  function addHighlight(i: number) {
    workStore.update((workArray) => {
      workArray[i].highlights.push({
        visible: true,
        content: '',
        tagNames: []
      });
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function onHighlightInput(e: Event, i: number, k: number) {
    const target = e.target as HTMLInputElement;
    if (target) {
      workStore.update((workArray) => {
        workArray[i].highlights[k].content = target.value;
        saveResumeDataToLocalStorage();
        return workArray;
      });
    }
  }

  function toggleHighlightVisibility(i:number, k: number) {
    workStore.update((workArray) => {
      const visible = workArray[i].highlights[k].visible;
      workArray[i].highlights[k].visible = !visible;
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }

  function deleteHighlight(i: number, k: number) {
    if (window.confirm('Are you sure you would like to delete this highlight?')) {
      workStore.update((workArray) => {
        workArray[i].highlights.splice(k, 1);
        saveResumeDataToLocalStorage();
        return workArray;
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
      workStore.update((workArray) => {
        let tagNames = workArray[i].highlights[k].tagNames;
        if (tagNames == undefined) tagNames = [];
        tagNames.push(currValue);
        workArray[i].highlights[k].tagNames = tagNames;
        saveResumeDataToLocalStorage();
        return workArray;
      });

      target.value = '';
    }
  }

  function onHighlightSkillDelete(i: number, k: number, tagI: number) {
    workStore.update((workArray) => {
      workArray[i].highlights[k].tagNames.splice(tagI, 1);
      saveResumeDataToLocalStorage();
      return workArray;
    });
  }
</script>

<section id="work">
  <h1>Work Experience</h1>
  {#each $workStore as w, i}
    <h2 id="header">{w.name || `Work ${i + 1}`}</h2>
    <label class="has-text-input half-width">
      <span>Company</span>
      <input type="text" id={`work_${i}_name`} value={w.name} on:input={updateWorkProperty} />
    </label>
    <label class="has-text-input half-width">
      <span>Job Title</span>
      <input
        type="text"
        id={`work_${i}_position`}
        value={w.position}
        on:input={updateWorkProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>Start year</span>
      <input
        type="number"
        min="1900"
        max="2023"
        placeholder="YYYY"
        id={`work_${i}_startYear`}
        value={w.startYear}
        on:input={updateWorkProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>Start month</span>
      <select id={`work_${i}_startMonth`} value={w.startMonth} on:input={updateWorkProperty}>
        <MonthOptions />
      </select>
    </label>
    <label class="has-checkbox-input">
      <!-- current doens't actually exist in a work object, btw-->
      <input type="checkbox" id={`work_${i}_current`} value={w.current} on:input={updateWorkProperty}/>
      <span>I currently work here</span>
    </label>
    <label class="has-text-input half-width">
      <span>End year</span>
      <input
        type="number"
        min="1900"
        max="2023"
        placeholder="YYYY"
        disabled={w.current}
        id={`work_${i}_endYear`}
        value={w.endYear}
        on:input={updateWorkProperty}
      />
    </label>
    <label class="has-text-input half-width">
      <span>End month</span>
      <select id={`work_${i}_endMonth`} value={w.endMonth} disabled={w.current} on:input={updateWorkProperty}>
        <MonthOptions />
      </select>
    </label>
    <h3 id="highlights">Accomplishments</h3>

    <!-- Highlights start here -->
    {#each w.highlights as h, k}
      <label class="has-text-input">
        <span>Accomplishment</span>
        <textarea
          id={`work_${i}_highlights_${k}_content`}
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
          id={`work_${i}_highlights_${k}_skills-search`}
          type="search"
          placeholder="Search skills..."
          list="existing-skills"
          enterkeyhint="enter"
          autocapitalize="none"
          on:keydown={(e) => onTagKeydown(e, i, k)}
        />
        <ul class="related-skills-list">
          {#each h.tagNames as name, si}
            <li id={`work_${i}_highlight_${k}_skill_${name}`}>
              {name}
              <button
                id={`work_${i}_highlight_${k}_skill_${name}_remove`}
                on:click={() => onHighlightSkillDelete(i, k, si)}
              >
                <i class="fa-regular fa-x"></i>
              </button>
            </li>
          {/each}
        </ul>
      </label>
      <button id={`work_${i}_highlight_${k}_toggle-visibility`} on:click={() => {toggleHighlightVisibility(i, k)}}>
        {h.visible ? 'Hide accomplishment' : 'Show accomplishment'}
      </button>
      <button id="remove" on:click={() => {deleteHighlight(i, k)}}>Remove accomplishment</button>
    {/each}

    <button id={`work_${i}_add-highlight`} on:click={() => {addHighlight(i)}}>Add accomplishment</button>
    <button id={`work_${i}_toggle-visibility`} on:click={() => {toggleWorkVisibility(i)}}>
      {w.visible ? 'Hide work experience' : 'Show work experience'}
    </button>
    <button id={`work_${i}_remove`} on:click={deleteWork}>Remove work experience</button>
    <div class='full-width' style={'margin: 4rem'}></div>
  {/each}
  <button id="add-work" on:click={addWork}>Add work experience</button>
</section>
