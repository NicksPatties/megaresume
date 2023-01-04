import { writable, get, type Writable } from 'svelte/store';

export class Tag {
  readonly name: string;
  visible: boolean;

  constructor(name: string, visible = true) {
    this.name = name;
    this.visible = visible;
  }
}

export const tagsStore: Writable<Tag[]> = writable([]);

export function addTag(tag: Tag, store = tagsStore) {
  const tags = get(store);
  const isAlreadyThere = tags.findIndex((t) => t.name == tag.name) >= 0;
  if (isAlreadyThere) {
    console.warn(`Tag ${tag.name} is already present. Skipping add.`);
    return;
  }
  tags.push(tag);
  store.set(tags);
}

export function deleteTag(name: string, store = tagsStore) {
  const tags = get(store);
  const iToDelete = tags.findIndex((t) => t.name == name);
  if (iToDelete == -1) {
    console.warn(`Tag ${name} does not exist. Skipping deletion.`);
    return;
  }
  tags.splice(iToDelete, 1);
  tagsStore.set(tags);
}

export function updateTag(tag: Tag, store = tagsStore) {
  const tags = get(store);
  const iToUpdate = tags.findIndex((t) => t.name == tag.name);
  if (iToUpdate == -1) {
    console.warn(`Tag ${tag.name} does not exist. Skipping update.`);
    return;
  }
  tags[iToUpdate] = tag;
  tagsStore.set(tags);
}

export function saveTags(store = tagsStore) {
  const tags = get(store);
  localStorage.setItem('tags', JSON.stringify(tags));
}

export function loadTags(jsonString: string, store = tagsStore) {
  const tags = JSON.parse(jsonString);
  store.set(tags);
}
