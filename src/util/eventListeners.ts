import { saveResumeData } from '../data/data';
import { type Writable, get } from 'svelte/store';

export function onInput(e: Event, s: Writable<string>, saveData = saveResumeData) {
  const target = e.target as HTMLInputElement;
  if (target) {
    s.set(target.value);
    saveData();
  }
}

export function onArrayInput(
  e: Event,
  s: Writable<string[]>,
  i: number,
  saveData = saveResumeData
) {
  const target = e.target as HTMLInputElement;
  if (target) {
    const array = get(s);
    array[i] = target.value;
    s.set(array);
    saveData();
  }
}
