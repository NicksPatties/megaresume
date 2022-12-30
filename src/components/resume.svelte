<script lang="ts">
  import { basicsStore, workStores, type BasicsStore, type WorkStore } from '@src/data/data';
  import { type Writable, get } from 'svelte/store';
  import WorkResume from './workResume.svelte';
  import { onMount } from 'svelte';
  import IconButton from './iconButton.svelte';

  let basics: BasicsStore = basicsStore;
  let work: Writable<WorkStore[]> = workStores;

  const name = basics.name;
  const label = basics.label;
  const phone = basics.phone;
  const email = basics.email;

  let scaleControl = 1;

  function scaleResume() {
    const resumeHeight = 1056; // 11in
    const margin = 42;
    const fittedResumeHeight = window.innerHeight - margin * 2;
    const scale = fittedResumeHeight / resumeHeight;
    const resumeNode: HTMLElement | null = document.querySelector('.resume');
    const resumeOverflowNode: HTMLElement | null = document.querySelector('.overflow-warning');
    if (resumeNode != null && resumeOverflowNode != null) {
      const newScale = `scale(${scale * scaleControl})`;
      resumeNode.style.transform = newScale;
      resumeOverflowNode.style.transform = newScale;
    }
  }

  onMount(() => {
    scaleResume();
    onresize = scaleResume;
  });
</script>

<div class="resume-container">
  <div class="resume">
    <div class="basics">
      <p class="name">{$name}</p>
      <p class="subname">{$label}</p>
      <p class="subname">{$phone}</p>
      <p class="subname">{$email}</p>
    </div>
    <div class="experience">
      <h3>Work Experience</h3>
      <ul>
        {#each $work as w}
          {#if get(w.visible) == true}
            <WorkResume
              name={w.name}
              position={w.position}
              startDate={w.startDate}
              endDate={w.endDate}
              highlights={w.highlights}
            />
          {/if}
        {/each}
      </ul>
    </div>
  </div>
  <div class="resume overflow-warning">
    <div class="basics">
      <p class="name">{$name}</p>
      <p class="subname">{$label}</p>
      <p class="subname">{$phone}</p>
      <p class="subname">{$email}</p>
    </div>
    <div class="experience">
      <h3>Work Experience</h3>
      <ul>
        {#each $work as w}
          {#if get(w.visible) == true}
            <WorkResume
              name={w.name}
              position={w.position}
              startDate={w.startDate}
              endDate={w.endDate}
              highlights={w.highlights}
            />
          {/if}
        {/each}
      </ul>
    </div>
  </div>
</div>
<div class="controls-container">
  <IconButton
    id="zoom-in"
    iconClass="fa-solid fa-magnifying-glass-plus"
    onclick={() => {
      scaleControl += 0.1;
      scaleResume();
    }}
  />
  <IconButton
    id="zoom-out"
    iconClass="fa-solid fa-magnifying-glass-minus"
    onclick={() => {
      scaleControl -= 0.1;
      scaleResume();
    }}
  />
</div>

<style>
  :root {
    --A4height: 1056px; /* 11in */
    --A4width: 816px; /* 8.5in */
    --pointFiveIn: 48px;
  }

  .resume-container {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: start;
    height: 100%;
    width: 100%;
  }

  .resume {
    position: absolute;
    overflow: hidden;
    top: 42px;
    z-index: 5;
    padding: var(--pointFiveIn);
    width: var(--A4width);
    height: var(--A4height);
    background: white;
    box-shadow: 0px 0px 9px black;
    transform: scale(1);
    transform-origin: center top;
  }

  /* Theme classes and such */

  .resume.overflow-warning {
    z-index: 0;
    color: red;
  }

  .basics {
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-bottom: 0.25in;
  }

  .name {
    font-size: 24px;
  }

  .subname {
    font-size: 18px;
  }

  ul {
    font-size: 18px;
  }

  .controls-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 20px;
    right: 20px;
  }
</style>
