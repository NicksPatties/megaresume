import { writable, get, type Writable } from 'svelte/store';
import { Basics } from './data';

export const basicsStore: Writable<Basics> = writable(new Basics());

export function updateBasics(newName: string) {
  const b = get(basicsStore);
  b.name = newName;
  basicsStore.set(b);
}
