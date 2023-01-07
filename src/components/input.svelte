<script lang="ts">
  import { onInput } from '@src/util/eventListeners';
  import type { Writable } from 'svelte/store';

  export let id: string;
  export let label: string;
  export let value: Writable<string>;
  export let disabled = false;
  export let type = 'text';
</script>

<label for={id}>{label}</label>
<input {id} {type} {disabled} value={$value} on:input={(e) => onInput(e, value)} />
