<script lang="ts">
  import { arrayMove } from '@src/util/arrayMove';
  let items = ['list 1', 'list 2', 'list 3'];
  let hoveringIndex = -1;

  function itemDragStart(e: DragEvent | null, dropI: number) {
    if (e != null && e.dataTransfer != null) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData('text/plain', dropI.toString());
    }
  }

  function dropZoneDragEnter(e: DragEvent | null, i: number) {
    if (e != null && e.dataTransfer != null) {
      e.preventDefault();
      hoveringIndex = i;
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
    hoveringIndex = -1;
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
    class="drop-zone {hoveringIndex == i ? "hovering": ""}"
    on:dragenter={(e) => dropZoneDragEnter(e, i)}
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
  class="drop-zone {hoveringIndex == items.length ? "hovering": ""}"
  on:dragenter={(e) => dropZoneDragEnter(e, items.length)}
  on:dragover={dropZoneDragOver}
  on:dragleave={dropZoneDragLeave}
  on:drop={(e) => dropZoneDrop(e, items.length)}
>
  Drop Zone {items.length}
</li>

<style>
  .drop-zone {
    background: #ddd;
    list-style: none;
    height: 5px;
    padding: 0;
    transition: "background-color" 0.3s ease-in-out;
    overflow: hidden;
  }

  .drop-zone.hovering{
    background: #bbb;
    padding: 0.25em;
    height: 2em;
  }
</style>
