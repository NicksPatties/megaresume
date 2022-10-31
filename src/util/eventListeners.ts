import type { Writable } from 'svelte/store';

export function onInput(e: Event, s: Writable<string>) {
  const target = e.target as HTMLInputElement;
  if (target) s.set(target.value);
}
