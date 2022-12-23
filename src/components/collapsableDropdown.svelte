<script lang="ts">
  import { onMount } from 'svelte';

  export let name: string;
  export let id = name.toLowerCase().replaceAll(' ', '-');
  export let closed = false;

  let className = 'collapsable-dropdown';

  let dropdownHeight: string;
  let click = () => {
    closed = !closed;
  };

  onMount(() => {
    const elem = document.getElementById(id);
    if (elem) {
      dropdownHeight = `${elem.scrollHeight}px`;
    }
  });
</script>

<fieldset>
  <legend>
    {name}
    <button on:click={click}>{closed ? 'Open' : 'Close'}</button>
  </legend>
  <div {id} class={className} class:closed style:height={closed ? '0px' : dropdownHeight}>
    <slot />
  </div>
</fieldset>

<style>
  .collapsable-dropdown {
    float: left;
    width: 100%;
    transition: height 0.3s ease-in-out;
    overflow-y: hidden;
  }
</style>
