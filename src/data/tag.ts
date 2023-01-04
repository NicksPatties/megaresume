import { writable, get, type Writable } from 'svelte/store';

export class Tag {
  static count = 0;
  readonly id: number = -1;
  readonly name: string | undefined;
  visible: boolean | undefined;

  constructor(name: string, visible = true) {
    Tag.count++;
    this.id = Tag.count;
    this.name = name;
    this.visible = visible;
  }
}

export const tagsStore: Writable<Tag[]> = writable([]);

export function addTag(t: Tag, store = tagsStore) {
  const tags = get(store);
  tags.push(t);
  store.set(tags);
}

export function deleteTag(id: number, store = tagsStore) {
  const tags = get(store);
  const iToDelete = tags.findIndex((t) => t.id == id);
  tags.splice(iToDelete, 1);
  tagsStore.set(tags);
}

export function updateTag(tag: Tag, store = tagsStore) {
  const tags = get(store);
  const iToUpdate = tags.findIndex((t) => t.id == tag.id);
  tags[iToUpdate] = tag;
  tagsStore.set(tags);
}

export function saveTags(store = tagsStore) {
  const tags = get(store);
  localStorage.setItem('tags', JSON.stringify(tags));
}

export function loadTags(jsonString: string) {
  const tags = JSON.parse(jsonString);
  tagsStore.set(tags);
}
