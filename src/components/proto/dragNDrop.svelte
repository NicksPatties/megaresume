<script lang="ts">
  import { arrayMove } from '@src/util/arrayMove';
  let items = ['list 1', 'list 2', 'list 3'];

  function itemDragStart(e: DragEvent | null, dropI: number) {
    if (e != null && e.dataTransfer != null) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData('text/plain', dropI.toString());
    }
  }

  function dropZoneDragEnter(e: DragEvent | null) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
    }
    console.log('dragZoneDragEneter');
  }

  function dropZoneDragOver(e: DragEvent | null) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
    }
    console.log('dropZoneDragOver');
  }

  function dropZoneDragLeave() {
    // DOM cleanup can happen in here, since this event will always happen
    console.log('dragZoneDragLeave');
  }

  function dropZoneDrop(e: DragEvent | null, i: number) {
    if (e != null && e.dataTransfer != null) {
      const data = parseInt(e.dataTransfer.getData('text/plain'));
      items = arrayMove(items, data, i);
      e.preventDefault();
    }
    console.log('dropZoneDrop');
  }
</script>

{#each items as item, i}
  <li
    class="drop-zone"
    on:dragenter={dropZoneDragEnter}
    on:dragover={dropZoneDragOver}
    on:dragleave={dropZoneDragLeave}
    on:drop={(e) => dropZoneDrop(e, i)}
  >
    Drop Zone {i}
  </li>
  <li draggable="true" on:dragstart={(e) => itemDragStart(e, i)}>
    {item}
  </li>
{/each}
<li
  class="drop-zone"
  on:dragenter={dropZoneDragEnter}
  on:dragover={dropZoneDragOver}
  on:dragleave={dropZoneDragLeave}
  on:drop={(e) => dropZoneDrop(e, items.length)}
>
  Drop Zone {items.length}
</li>

<style>
  .drop-zone {
    background: pink;
  }
</style>
