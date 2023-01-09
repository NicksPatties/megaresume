<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import IconButton from '@src/components/iconButton.svelte';
  import {
    tagsStore,
    addTag,
    deleteTag,
    loadTags,
    Tag,
    updateTag,
    updateAllTags
  } from '@src/data/tag';
  import { derived, writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { removeTagFromWorkStores, saveResumeDataToLocalStorage } from '@src/data/data';

  let searchTerm = writable('');
  let filteredTags = derived([tagsStore, searchTerm], ([$tagsStore, $searchTerm]) =>
    $tagsStore.filter((tag) => tag.name.includes($searchTerm))
  );

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

  function onTagCheckboxClicked(tag: Tag) {
    tag.visible = !tag.visible;
    updateTag(tag);
  }

  function onAddTagKeydown(e: KeyboardEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const currValue = target ? target.value : '';
    if (e.key == 'Enter' && currValue.length > 0) {
      addTag(new Tag(currValue));
      target.value = '';
    }
  }

  function onShowAllTagsToggle(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      target.checked ? updateAllTags(true) : updateAllTags(false);
    }
  }

  function updateSearchTerm(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      searchTerm.set(target.value);
    }
  }

  onMount(() => {
    loadTags();
  });
</script>

<MenuContents id="menu-tags">
  <h1>Tags</h1>
  <p>Tags will control which entries in the resume are visible.</p>
  <div class="inline-input">
    <label for="search-current-tags">Search tags</label>
    <input
      id="search-current-tags"
      type="search"
      value={$searchTerm}
      on:input={(e) => {
        updateSearchTerm(e);
      }}
    />
  </div>

  {#if $filteredTags.length > 0}
    {#each $filteredTags as tag}
      <div class="inline-input">
        <label for="tag-visibility-input-{tag.name}">{tag.name}</label>
        <IconButton
          size="small"
          id="delete-tag-{tag.name}"
          iconClass="fa-regular fa-trash-can"
          onclick={() => onDeleteButtonClick(tag)}
        />
        <input
          id="tag-visibility-input-{tag.name}"
          type="checkbox"
          checked={tag.visible}
          on:click={() => onTagCheckboxClicked(tag)}
        />
      </div>
    {/each}
    <div class="inline-input">
      <label for="show-all-tags-check">Show all tags</label>
      <input type="checkbox" on:change={(e) => onShowAllTagsToggle(e)} />
    </div>
  {:else}
    <h3>No tags currently</h3>
  {/if}
  <div class="inline-input">
    <label for="add-tag-input">Add new tag</label>
    <input id="add-tag-input" type="text" on:keydown={(e) => onAddTagKeydown(e)} />
  </div>
  <datalist id="existing-tags">
    {#each $tagsStore as tag}
      <option value={tag.name} />
    {/each}
  </datalist>
</MenuContents>
