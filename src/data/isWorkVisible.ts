import type { Project, Work } from './data';
import type { Tag } from './tag';

/**
 *
 * @param work
 * @param tags
 */
export function isWorkVisible(work: Work, tags: Tag[]): boolean {
  if (!work.visible) return false;
  let visible = false;
  for (const highlight of work.highlights) {
    if (!highlight.visible) continue;
    for (const skill of highlight.tagNames) {
      const tag = tags.find((t) => t.name == skill);
      if (tag != undefined) {
        visible = visible || tag.visible;
      }
    }
  }
  return visible;
}

/**
 *
 * @param project
 * @param tags
 */
export function isProjectVisible(project: Project, tags: Tag[]): boolean {
  if (!project.visible) return false;
  let visible = false;
  for (const highlight of project.highlights) {
    if (!highlight.visible) continue;
    for (const skill of highlight.tagNames) {
      const tag = tags.find((t) => t.name == skill);
      if (tag != undefined) {
        visible = visible || tag.visible;
      }
    }
  }
  return visible;
}
