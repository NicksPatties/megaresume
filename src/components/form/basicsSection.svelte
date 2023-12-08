<script lang="ts">
  import { basicsStore, saveResumeDataToLocalStorage } from "@src/data/data";
  import type { Writable } from "svelte/store";

  const name = basicsStore.name;
  const label = basicsStore.label;
  const phone = basicsStore.phone;
  const email = basicsStore.email;
  const location = basicsStore.location;
  const summary = basicsStore.summary;

  function onInput(e: Event, s: Writable<string>, saveData = saveResumeDataToLocalStorage) {
    const target = e.target as HTMLInputElement;
    if (target) {
      s.set(target.value);
      saveData();
    }
  }
</script>

<section id="basics">
  <h1>About Me</h1>
  <label class="has-text-input half-width">
    <span>Full name</span>
    <input
      type="text" 
      id="basics-name" 
      value={$name} 
      on:input={(e) => onInput(e, name)}
    />
  </label>
  <label class="has-text-input half-width">
    <span>Job title</span>
    <input 
    type="text" 
    id="basics-label" 
    value={$label}
    on:input={(e) => onInput(e, label)}
  />
  </label>
  <label class="has-text-input half-width">
    <span>Email</span>
    <input 
    type="email" 
    id="basics-email" 
    value={$email}
    on:input={(e) => onInput(e, email)}
  />
  </label>
  <label class="has-text-input half-width">
    <span>Phone</span>
    <input 
    type="text" 
    id="basics-phone" 
    value={$phone}
    on:input={(e) => onInput(e, phone)}
  />
  </label>
  <label class="has-text-input">
    <span>Location</span>
    <input 
    type="text" 
    id="basics-location" 
    value={$location}
    on:input={(e) => onInput(e, location)}
  />
  </label>
  <label class="has-text-input ">
    <span>Summary</span>
    <input 
    type="text" 
    id="basics-summary" 
    value={$summary}
    on:input={(e) => onInput(e, summary)}
  />
  </label>
</section>