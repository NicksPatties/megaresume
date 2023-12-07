<script lang="ts">
  import { writable, derived } from "svelte/store";
  import { tagsStore } from "@src/data/tag";

  let searchTerm = writable('');
  let filteredTags = derived([tagsStore, searchTerm], ([$tagsStore, $searchTerm]) =>
    $tagsStore.filter((tag) => tag.name.includes($searchTerm))
  );

  function updateSearchTerm(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      searchTerm.set(target.value);
    }
  }
</script>

<section id="skills">
  <h1>Skills</h1>
  <label class="has-text-input">
    <span>Search</span>
    <input type="search" placeholder="CSS, Git, etc..." id="skill-search" value={$searchTerm} on:input={updateSearchTerm}/>
  </label>
  <table>
    <tbody>
      {#each $filteredTags as s}
        <tr>
          <td><label id={`skills-${s.name}`} for={`skills-${s.name}-visible`}>{s.name}</label></td>
          <td>
            <input 
              type="checkbox" 
              id={`skills-${s.name}-visible`} 
              checked={s.visible}
              on:click={() => {}}
            /></td>
          <td><button id={`skills-${s.name}-remove`}><i class="fa-solid fa-trash"></i></button></td>
        </tr>
      {/each}
    </tbody>
  </table>
  <label class="has-text-input">
    <span>New skill</span>
    <input type="text" placeholder="CSS, Git, etc..." id="new-skill-name" />
  </label>
  <button id="add-skill">Add skill</button>
</section>