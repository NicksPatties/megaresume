<script lang="ts">
  import { flip } from 'svelte/animate';
  import { arrayMove } from '@src/util/arrayMove';
  let items = ['list 0', 'list 1', 'list 2'];
  let draggingIndex = -1;

  function itemDragStart(e: DragEvent | null, dragI: number) {
    if (e != null && e.dataTransfer != null) {
      draggingIndex = dragI;
    }
  }

  function dropZoneDragEnter(e: DragEvent | null, i: number) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
      // swap an element with the current draggable index
      // change the draggableIndex after the swap is complete
      if (draggingIndex != i) {
        items = arrayMove(items, draggingIndex, i);
      }
      draggingIndex = i;
    }
  }

  function dropZoneDragOver(e: DragEvent | null, i: number) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
    }
  }

  function dropZoneDrop(e: DragEvent | null, i: number) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
      if (draggingIndex != i) {
        items = arrayMove(items, draggingIndex, i);
      }
    }
    draggingIndex = -1;
  }
</script>

{#each items as item, i (item)}
  <li
    animate:flip={{ duration: 500 }}
    class="draggable-item"
    draggable="true"
    on:dragstart={(e) => itemDragStart(e, i)}
    on:dragenter={(e) => dropZoneDragEnter(e, i)}
    on:dragover={(e) => dropZoneDragOver(e, i)}
    on:drop={(e) => dropZoneDrop(e, i)}
  >
    {item}
  </li>
{/each}

<style>
  li {
    display: flex;
    align-items: center;
    height: 3em;
  }

  .draggable-item {
    position: relative;
    transition: background-color 0.2s ease-in;
  }
</style>
