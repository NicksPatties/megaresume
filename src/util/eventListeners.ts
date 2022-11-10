import { saveResumeData } from '@src/data/data';
import type { Writable } from 'svelte/store';

export function onInput(e: Event, s: Writable<string>, saveData = saveResumeData) {
  const target = e.target as HTMLInputElement;
  if (target) {
    s.set(target.value);
    saveData();
  }
}
