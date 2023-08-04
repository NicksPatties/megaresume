import type { Highlight } from '@src/data/data';
import type { Tag } from '@src/data/tag';

export function isHighlightVisible(h: Highlight, tags: Tag[]): boolean {
  if (!h.visible) return false;
  if (h.visible && h.tagNames.length == 0) return true;
  for (let i = 0; i < h.tagNames.length; i++) {
    const currTag = h.tagNames[i];
    const savedTag = tags.find((t) => t.name == currTag);
    if (savedTag && savedTag.visible) {
      return true;
    }
  }
  return false;
}

export function dateInputToDecoratedString(date: string, placeholder: string): string {
  const sdmillis = Date.parse(date);
  if (isNaN(sdmillis)) {
    return placeholder;
  }
  const opts: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    timeZone: 'UTC'
  };
  const d = new Date(date);
  return Intl.DateTimeFormat('en-US', opts).format(d);
}
