<script lang="ts">
  import MenuContents from '@src/components/menuContents.svelte';
  import { basicsStore, saveResumeDataToLocalStorage } from '@src/data/data';
  import type { Writable } from 'svelte/store';

  let name = basicsStore.name;
  let label = basicsStore.label;
  let phone = basicsStore.phone;
  let email = basicsStore.email;

  function onInput(e: Event, s: Writable<string>, saveData = saveResumeDataToLocalStorage) {
    const target = e.target as HTMLInputElement;
    if (target) {
      s.set(target.value);
      saveData();
    }
  }
</script>

<MenuContents id="menu-resume-basics">
  <h2>Basic Information</h2>
  <label for="basics_name">Name</label>
  <input
    id="basics_name"
    type="text"
    value={$name}
    on:input={(e) => onInput(e, basicsStore.name)}
  />

  <label for="basics_title">Title</label>
  <input
    id="basics_title"
    type="text"
    value={$label}
    on:input={(e) => onInput(e, basicsStore.label)}
  />

  <label for="basics_phone">Phone</label>
  <input
    id="basics_phone"
    type="text"
    value={$phone}
    on:input={(e) => onInput(e, basicsStore.phone)}
  />

  <label for={'basics_email'}>Email</label>
  <input
    id="basics_email"
    type="text"
    value={$email}
    on:input={(e) => onInput(e, basicsStore.email)}
  />
</MenuContents>
