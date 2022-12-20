<script lang="ts">
  import { flip } from 'svelte/animate';
  import { arrayMove } from '@src/util/arrayMove';
  let items = ['list 0', 'list 1', 'list 2'];
  let hoveringIndex = -1;
  let draggingIndex = -1;

  function itemDragStart(e: DragEvent | null, dragI: number) {
    if (e != null && e.dataTransfer != null) {
      draggingIndex = dragI;
    }
  }

  function dropZoneDragEnter(e: DragEvent | null, i: number) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
      draggingIndex != i ? (hoveringIndex = i) : (hoveringIndex = -1);
    }
  }

  function dropZoneDragOver(e: DragEvent | null) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
    }
  }

  function dropZoneDrop(e: DragEvent | null, moveToI: number) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
      items = arrayMove(items, draggingIndex, moveToI);
    }
    hoveringIndex = -1;
    draggingIndex = -1;
  }
</script>

<div class="reset-drop-zone" on:dragenter={() => (hoveringIndex = -1)} />
{#each items as item, i (item)}
  <li
    animate:flip
    class="draggable-item {hoveringIndex == i ? 'hovering' : ''}"
    draggable="true"
    on:dragstart={(e) => itemDragStart(e, i)}
    on:dragenter={(e) => dropZoneDragEnter(e, i)}
    on:dragover={dropZoneDragOver}
    on:drop={(e) => dropZoneDrop(e, i)}
  >
    {item}
  </li>
{/each}
<div class="reset-drop-zone" on:dragenter={() => (hoveringIndex = -1)} />

<style>
  .draggable-item {
    position: relative;
    transition: background-color 0.2s ease-in;
  }

  .hovering {
    background: #eee;
  }

  .reset-drop-zone {
    height: 1em; /* This should be the same height as the margins in the menu */
    width: 100%;
  }
</style>
