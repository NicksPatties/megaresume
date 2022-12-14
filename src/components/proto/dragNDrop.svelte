<script lang="ts">
  import { arrayMove } from '@src/util/arrayMove';
  let items = ['list 0', 'list 1', 'list 2'];
  let hoveringIndex = -1;
  let draggingIndex = -1;

  function itemDragStart(e: DragEvent | null, dragI: number) {
    if (e != null && e.dataTransfer != null) {
      console.log(`dragging index ${dragI}`);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData('text/plain', dragI.toString());
      draggingIndex = dragI;
    }
  }

  function dropZoneDragEnter(e: DragEvent | null, i: number) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
      hoveringIndex = i;
      console.log(`hovering index ${i}`);
    }
  }

  function dropZoneDragOver(e: DragEvent | null) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
    }
  }

  function dropZoneDragLeave() {
    // DOM cleanup can happen in here, since this event will always happen
    console.log('dropZoneLeave?');
  }

  function dropZoneDrop(e: DragEvent | null, moveToI: number) {
    console.log('dropZoneDrop start?');
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
      const itemI = parseInt(e.dataTransfer.getData('text/plain'));
      items = arrayMove(items, itemI, moveToI);
    }
    hoveringIndex = -1;
    draggingIndex = -1;
    console.log('dropZoneDrop');
  }
</script>

{#each items as item, i}
  <li
    class="draggable-item {hoveringIndex == i ? 'hovering' : ''}"
    draggable="true"
    on:dragstart={(e) => itemDragStart(e, i)}
    on:dragenter={(e) => dropZoneDragEnter(e, i)}
    on:dragover={dropZoneDragOver}
    on:dragleave={dropZoneDragLeave}
    on:drop={(e) => dropZoneDrop(e, i)}
  >
    {item}
  </li>
{/each}

<style>
  .draggable-item {
    position: relative;
  }

  .hovering {
    background: #eee;
  }
</style>
