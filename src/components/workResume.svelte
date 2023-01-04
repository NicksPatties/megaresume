<script lang="ts">
  import type { Highlight } from '@src/data/data';
  import type { Writable } from 'svelte/store';
  import { tagsStore, Tag } from '@src/data/tag';

  export let name: Writable<string>;
  export let position: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let highlights: Writable<Array<Highlight>>;

  export function isHighlightVisible(h: Highlight, tags: Tag[]): boolean {
    if (!h.visible) return false;
    for (let i = 0; i < h.tagNames.length; i++) {
      const currTag = h.tagNames[i];
      const savedTag = tags.find((t) => t.name == currTag);
      if (savedTag && savedTag.visible) {
        return true;
      }
    }
    return false;
  }
</script>

<li>{$position}, {$name} <i>{$startDate} - {$endDate}</i></li>
<ul>
  {#each $highlights as highlight}
    {#if isHighlightVisible(highlight, $tagsStore)}
      <li>{highlight.content}</li>
    {/if}
  {/each}
</ul>
