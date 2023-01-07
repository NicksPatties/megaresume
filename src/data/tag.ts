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

export function getTag(name: string, store = tagsStore) {
  const tags = get(store);
  return tags.find((t) => t.name == name);
}

export function deleteTag(name: string, store = tagsStore) {
  const tags = get(store);
  const iToDelete = tags.findIndex((t) => t.name == name);
  if (iToDelete == -1) {
    console.warn(`Tag ${name} does not exist. Skipping deletion.`);
    return;
  }
  tags.splice(iToDelete, 1);
  store.set(tags);
}

export function updateTag(tag: Tag, store = tagsStore) {
  const tags = get(store);
  const iToUpdate = tags.findIndex((t) => t.name == tag.name);
  if (iToUpdate == -1) {
    console.warn(`Tag ${tag.name} does not exist. Skipping update.`);
    return;
  }
  tags[iToUpdate] = tag;
  store.set(tags);
}

export function updateAllTags(visible: boolean, store = tagsStore) {
  const tags = get(store);
  tags.forEach((t) => (t.visible = visible));
  store.set(tags);
}

export function saveTags(store = tagsStore) {
  const tags = get(store);
  localStorage.setItem('tags', JSON.stringify(tags));
}

export function loadTags(store = tagsStore) {
  const jsonString = localStorage.getItem('tags');
  if (jsonString) {
    store.set(JSON.parse(jsonString));
  } else {
    console.error('Failed to load tags from localStorage');
  }
}
