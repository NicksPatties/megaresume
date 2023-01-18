<script lang="ts">
  import IconButton from '@src/components/iconButton.svelte';
  import WorkResumeEntry from '@src/components/resume/workResumeEntry.svelte';
  import { basicsStore, workStores } from '@src/data/data';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let basics = basicsStore;

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
    const newScale = `scale(${scale * scaleControl})`;
    if (resumeNode != null) {
      resumeNode.style.transform = newScale;
    }

    if (resumeOverflowNode != null) {
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
      <p class="name" class:placeholder={$name.length == 0}>{$name ? $name : 'Your name'}</p>
      <p class="subname" class:placeholder={$label.length == 0}>
        {$label ? $label : 'Your profession'}
      </p>
      <p class="subname" class:placeholder={$phone.length == 0}>
        {$phone ? $phone : '(555) 555-5555'}
      </p>
      <p class="subname" class:placeholder={$email.length == 0}>
        {$email ? $email : 'youremail@email.com'}
      </p>
    </div>
    <div class="experience">
      {#if $workStores.length > 0}
        <h3>Work Experience</h3>
        <ul>
          {#if $workStores != null}
            {#each $workStores as w, i}
              {#if get(w.visible) == true}
                <WorkResumeEntry workStore={w} {i} />
              {/if}
            {/each}
          {/if}
        </ul>
      {:else}
        <h3 class="placeholder">Your work experience will go here.</h3>
      {/if}
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

  .placeholder {
    color: gray;
  }
</style>
