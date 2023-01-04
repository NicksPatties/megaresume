import type { Highlight } from '@src/data/data';
import type { Tag } from '@src/data/tag';

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
