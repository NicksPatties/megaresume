<script lang="ts">
  import { arrayMove } from '@src/util/arrayMove';
  let items = ['list 1', 'list 2', 'list 3'];
  let hoveringIndex = -1;
  let draggingIndex = -1;

  function itemDragStart(e: DragEvent | null, dragI: number) {
    if (e != null && e.dataTransfer != null) {
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
    class="drop-zone {hoveringIndex == i ? 'open' : ''}"
    on:dragenter={(e) => dropZoneDragEnter(e, i)}
    on:dragover={dropZoneDragOver}
    on:dragleave={dropZoneDragLeave}
    on:drop={(e) => dropZoneDrop(e, i)}
  >
    Drop here! {i}
  </li>
  <li
    class="draggable-item {draggingIndex == i ? 'dragging' : ''}"
    draggable="true"
    on:dragstart={(e) => itemDragStart(e, i)}
  >
    {item}
    <div
      class="collision-top"
      on:dragenter={(e) => dropZoneDragEnter(e, i)}
      on:dragover={dropZoneDragOver}
      on:dragleave={dropZoneDragLeave}
      on:drop={(e) => dropZoneDrop(e, i)}
    />
    <div
      class="collision-bottom"
      on:dragenter={(e) => dropZoneDragEnter(e, i + 1)}
      on:dragover={dropZoneDragOver}
      on:dragleave={dropZoneDragLeave}
      on:drop={(e) => dropZoneDrop(e, i + 1)}
    />
  </li>
{/each}
<li
  class="drop-zone {hoveringIndex == items.length ? 'open' : ''}"
  on:drop={(e) => dropZoneDrop(e, items.length)}
  on:dragover={dropZoneDragOver}
  on:dragleave={dropZoneDragLeave}
>
  Drop here! {items.length}
</li>

<style>
  .draggable-item {
    position: relative;
  }

  .dragging {
    background: purple;
    width: 100px;
    border-radius: 2em;
  }

  .drop-zone {
    background: #ddd;
    list-style: none;
    height: 0em;
    transition: height 0.3s ease-in-out;
    overflow: hidden;
  }

  .drop-zone.open {
    height: 2em;
  }

  .collision-top {
    position: absolute;
    height: 40%;
    width: 100%;
    top: 0;
    /* background: rgba(255, 0, 0, 0.25); */
  }

  .collision-bottom {
    position: absolute;
    height: 40%;
    width: 100%;
    bottom: 0;
    /* background: rgba(0, 255, 0, 0.25); */
  }
</style>
