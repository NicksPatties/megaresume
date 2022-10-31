import { type Writable, get } from 'svelte/store';

export function onInput(e: Event, s: Writable<string>) {
  const target = e.target as HTMLInputElement;
  if (target) s.set(target.value);
}

export function onArrayInput(e: Event, s: Writable<string[]>, i: number) {
  const target = e.target as HTMLInputElement;
  if (target) {
    const array = get(s);
    array[i] = target.value;
    s.set(array);
  }
}
