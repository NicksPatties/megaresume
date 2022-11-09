<script lang="ts">
  import Input from '@src/components/input.svelte';
  import type { Writable } from 'svelte/store';

  export let studyType: Writable<string>;
  export let institution: Writable<string>;
  export let area: Writable<string>;
  export let startDate: Writable<string>;
  export let endDate: Writable<string>;
  export let score: Writable<string>;
</script>

<Input label={'Study Type'} value={studyType} />
<Input label={'Institution'} value={institution} />
<Input label={'Area'} value={area} />
<Input label={'Start Date'} value={startDate} />
<Input label={'End Date'} value={endDate} />
<Input label={'Score'} value={score} />
