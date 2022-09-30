<script lang="ts">
  import Intro from '../components/intro.svelte';
  import Link from '../components/link.svelte';
  import type { DataShape } from '../data/data';
  import { data } from '../data/data';
  import { onMount } from 'svelte';

  let name: string = 'default value';
  let url: string = 'default value';

  onMount(async () => {
    let myData: DataShape = await data;
    name = myData.name;
    url = myData.url;
  });
</script>

<Intro {name} />
<Link href={url} />
