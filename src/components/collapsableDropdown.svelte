<script lang="ts">
  import { onMount } from 'svelte';

  export let dropdownName: string;

  let className = 'collapsable-dropdown';
  let closed = false;
  let dropdownHeight: string;
  let click = () => {
    closed = !closed;
  };

  onMount(() => {
    const elem = document.querySelector(`.${className}`);
    if (elem) {
      dropdownHeight = `${elem.getBoundingClientRect().height}px`;
    }
  });
</script>

<fieldset>
  <legend>
    {dropdownName}
    <button on:click={click}>Toggle</button>
  </legend>
  <div class={className} class:closed style:height={closed ? '0px' : dropdownHeight}>
    <slot />
  </div>
</fieldset>

<style>
  .collapsable-dropdown {
    transition: height 0.3s ease-in-out;
    overflow-y: hidden;
  }
</style>
