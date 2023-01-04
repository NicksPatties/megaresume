<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import { tagsStore, addTag, deleteTag, saveTags, loadTags, Tag, updateTag } from '@src/data/tag';
  import { onMount } from 'svelte';

  function onDeleteButtonClick(tag: Tag) {
    const msg = `Are you sure you'd like to delete the "${tag.name}" tag?`;
    if (window.confirm(msg)) {
      deleteTag(tag.name);
      saveTags();
    }
  }

  function onTagCheckboxClicked(tag: Tag) {
    tag.visible = !tag.visible;
    updateTag(tag);
    saveTags();
  }

  function onAddTagKeydown(e: KeyboardEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const currValue = target ? target.value : '';
    if (e.key == 'Enter' && currValue.length > 0) {
      addTag(new Tag(currValue));
      saveTags();
      target.value = '';
    }
  }

  onMount(() => {
    const jsonString = localStorage.getItem('tags');
    if (jsonString) {
      loadTags(jsonString);
    }
  });
</script>

<MenuContents id="menu-tags">
  <h1>Hello this is tags</h1>
  <p>Filter unecessary entries and experience by controlling which tags are visible</p>
  {#if $tagsStore.length > 0}
    {#each $tagsStore as tag}
      <div class="inline-input">
        <label for="tag-visibility-input-{tag.name}">{tag.name}</label>
        <button id="delete-tag-{tag.name}" on:click={() => onDeleteButtonClick(tag)}>Delete</button>
        <input
          id="tag-visibility-input-{tag.name}"
          type="checkbox"
          checked={tag.visible}
          on:click={() => onTagCheckboxClicked(tag)}
        />
      </div>
    {/each}
  {:else}
    <h3>No tags currently</h3>
  {/if}
  <div class="inline-input">
    <label for="add-tag-input">Add new tag</label>
    <input id="add-tag-input" type="text" on:keydown={(e) => onAddTagKeydown(e)} />
  </div>
  <div class="inline-input">
    <label for="search-current-tags">Search tags</label>
    <input id="search-current-tags" list="existing-tags" type="search" />
  </div>
  <datalist id="existing-tags">
    {#each $tagsStore as tag}
      <option value={tag.name} />
    {/each}
  </datalist>
  <p>Currently visible tags</p>
  <p>
    {#each $tagsStore as tag, i}
      {#if tag.visible}<span><strong>{tag.name}</strong> </span>{/if}
    {/each}
  </p>
</MenuContents>
