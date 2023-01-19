<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import { newWorkStores, saveResumeDataToLocalStorage, type Highlight } from '@src/data/data';
  import { getTag, addTag, Tag } from '@src/data/tag';

  export let highlights: Highlight[];
  export let i: number;

  function addHighlight() {
    newWorkStores.update((workArray) => {
      console.log('addHighlight');
      return workArray;
    });
  }

  function deleteHighlight(k: number) {
    if (window.confirm('Are you sure you would like to delete this highlight?')) {
      newWorkStores.update((workArray) => {
        console.log('delete Highlight');
        return workArray;
      });
    }
  }

  function hideHighlight(k: number) {
    newWorkStores.update((workArray) => {
      console.log('hideHighlight');
      return workArray;
    });
  }

  function moveHighlight(k: number, up: boolean) {
    newWorkStores.update((workArray) => {
      console.log('moveHighlight');
      return workArray;
    });
  }

  function updateWorkHighlight(k: number, value: string) {
    newWorkStores.update((workArray) => {
      workArray[i].highlights[k].content = value;
      return workArray;
    });
  }

  function onTagKeydown(e: KeyboardEvent, k: number) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const currValue = target ? target.value : '';
    if (e.key == 'Enter' && currValue.length > 0) {
      // if the tag is not in the tags, add the tag into the store
      if (getTag(currValue) == undefined) {
        addTag(new Tag(currValue));
      }

      // add tag to the highlight
      newWorkStores.update((workArray) => {
        let tagNames = workArray[i].highlights[k].tagNames;
        if (tagNames == undefined) tagNames = [];
        tagNames.push(currValue);
        workArray[i].highlights[k].tagNames = tagNames;
        return workArray;
      });
    }
  }

  /**
   *
   * @param e
   * @param s
   * @param k the index of the highlight that is being edited
   * @param saveData
   */
  function onHighlightInput(e: Event, k: number) {
    const target = e.target as HTMLInputElement;
    if (target) {
      newWorkStores.update((workArray) => {
        console.log('onHighlightInput');
        return workArray;
      });
    }
  }

  function onTagDelete(k: number, tagI: number) {
    newWorkStores.update((workArray) => {
      workArray[i].highlights[k].tagNames.splice(tagI, 1);
      return workArray;
    });
    saveResumeDataToLocalStorage();
  }
</script>

{#each highlights as highlight, k}
  <label for="work_{i}_highlight_{k}">
    New Highlight {k + 1}
    <div class="label-controls">
      {#if k > 0}
        <IconButton
          size="small"
          id="work_{i}_highlight_{k}_up"
          iconClass="fa-solid fa-arrow-up"
          onclick={() => moveHighlight(k, true)}
        />
      {/if}
      {#if k < highlights.length - 1}
        <IconButton
          size="small"
          id="work_{i}_highlight_{k}_down"
          iconClass="fa-solid fa-arrow-down"
          onclick={() => moveHighlight(k, false)}
        />
      {/if}
      <IconButton
        size="small"
        id="work_{i}_highlight_{k}_hide"
        iconClass={highlight.visible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
        onclick={() => hideHighlight(k)}
      />
      <IconButton
        size="small"
        id="work_{i}_highlight_{k}_delete"
        iconClass="fa-regular fa-trash-can"
        onclick={() => deleteHighlight(k)}
      />
    </div>
  </label>
  <textarea
    id={`work_${i}_highlight_${k}`}
    placeholder={'A cool highlight'}
    disabled={!$newWorkStores[i].visible || !highlight.visible}
    on:input={(e) => {
      onHighlightInput(e, k);
    }}>{highlight.content}</textarea
  >
  <label for={`work_${i}_highlight_${k}_tagsInput`}
    >Add tags<span class="hint">(press Enter to submit tag)</span></label
  >
  <input
    class="input-add-tags"
    id={`work_${i}_highlight_${k}_tagsInput`}
    type="text"
    list="existing-tags"
    on:keydown={(e) => onTagKeydown(e, k)}
  />
  <p>
    {#each highlight.tagNames as name, ti}
      <span id="work_{i}_highlight_{k}_tag_{name}" class="highlight-tag">
        {name}
        <IconButton
          size="small"
          id="work_{i}_highlight_{k}_delete_tag_{name}"
          iconClass="fa-regular fa-circle-xmark"
          onclick={() => onTagDelete(k, ti)}
        />
      </span>
    {/each}
  </p>
{/each}
<button id={`work_${i}_newHighlight`} class="big-btn" on:click={() => addHighlight()}>
  Add new highlight
</button>

<style>
  label {
    display: flex;
    justify-content: space-between;
  }

  .input-add-tags {
    margin-bottom: 0;
  }

  .highlight-tag {
    margin-top: 5px;
    display: inline-block;
    background: #ddd;
    padding: 0 5px;
    border-radius: 5px;
    margin-right: 5px;
  }
</style>
