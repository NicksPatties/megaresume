<script lang="ts">
  import { writable, derived } from 'svelte/store';
  import { tagsStore, Tag, updateTag, updateAllTags, addTag, deleteTag } from '@src/data/tag';
  import { removeTagFromWorkStores, saveResumeDataToLocalStorage } from '@src/data/data';

  let searchTerm = writable('');
  let filteredTags = derived([tagsStore, searchTerm], ([$tagsStore, $searchTerm]) =>
    $tagsStore.filter((tag) => tag.name.toLowerCase().includes($searchTerm))
  );

  function updateSearchTerm(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      searchTerm.set(target.value);
    }
  }

  function onTagCheckboxClicked(tag: Tag) {
    tag.visible = !tag.visible;
    saveResumeDataToLocalStorage();
    updateTag(tag);
  }

  function onShowAllTagsToggle(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      target.checked ? updateAllTags(true) : updateAllTags(false);
      saveResumeDataToLocalStorage();
    }
  }

  function addSkill() {
    const newSkillInput = document.getElementById('new-skill-name') as HTMLInputElement;
    if (newSkillInput) {
      const value = newSkillInput.value;
      if (value.length <= 0) {
        console.warn("There's no skill here aaaaa!");
        return;
      }
      addTag(new Tag(value));
      saveResumeDataToLocalStorage();
      newSkillInput.value = '';
    }
  }

  function onDeleteButtonClick(tag: Tag) {
    const msg = `Are you sure you'd like to delete the "${tag.name}" tag?`;
    if (window.confirm(msg)) {
      // remove tag from all highlights
      removeTagFromWorkStores(tag.name);
      saveResumeDataToLocalStorage();

      // remove the tag
      deleteTag(tag.name);
    }
  }
</script>

<section id="skills">
  <h1>Skills</h1>
  <label class="has-text-input">
    <span>Search</span>
    <input
      type="search"
      placeholder="CSS, Git, etc..."
      id="skill-search"
      value={$searchTerm}
      on:input={updateSearchTerm}
    />
  </label>
  <table>
    <tbody>
      <tr>
        <td><label for="show-all-skills">Show all skills</label></td>
        <td> <input type="checkbox" id={`show-all-skills`} on:click={onShowAllTagsToggle} /></td>
        <td></td>
      </tr>

      {#each $filteredTags as s}
        <tr>
          <td><label id={`skills-${s.name}`} for={`skills-${s.name}-visible`}>{s.name}</label></td>
          <td>
            <input
              type="checkbox"
              id={`skills-${s.name}-visible`}
              checked={s.visible}
              on:click={() => {
                onTagCheckboxClicked(s);
              }}
            /></td
          >
          <td>
            <button id={`skills-${s.name}-remove`} on:click={() => onDeleteButtonClick(s)}>
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <label class="has-text-input">
    <span>New skill</span>
    <input type="text" placeholder="CSS, Git, etc..." id="new-skill-name" />
  </label>
  <button id="add-skill" on:click={addSkill}>Add skill</button>
</section>
<!-- Used for suggesting skills for highlights -->
<datalist id='existing-skills'>
  {#each $tagsStore as tag}
    <option value={tag.name}/>
  {/each}
</datalist>
