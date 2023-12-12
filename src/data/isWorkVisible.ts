import type { Work } from './data';
import type { Tag } from './tag';

/**
 *
 * @param work
 * @param tags
 */
export default function isWorkVisible(work: Work, tags: Tag[]): boolean {
  if (!work.visible) return false;
  let visible = false;
  for (const highlight of work.highlights) {
    for (const skill of highlight.tagNames) {
      const tag = tags.find((t) => t.name == skill);
      if (tag != undefined) {
        visible = visible || tag.visible;
      }
    }
  }
  return visible;
}
