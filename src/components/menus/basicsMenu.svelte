<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import Input from '@src/components/input.svelte';
  import { basicsStore } from '@src/data/data';
  let basics = basicsStore;
</script>

<MenuContents id="menu-resume-basics">
  <h2>Basic Information</h2>
  <Input id={'basics_name'} label={'Name'} value={basics.name} />
  <Input id={'basics_title'} label={'Title'} value={basics.label} />
  <Input id={'basics_phone'} label={'Phone'} value={basics.phone} />
  <Input id={'basics_email'} label={'Email'} value={basics.email} />
</MenuContents>
