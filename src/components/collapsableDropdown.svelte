<script lang="ts">
  import { onMount } from 'svelte';
  import IconButton from '@src/components/iconButton.svelte';

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
    <IconButton
      size="small"
      iconClass={closed ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-up'}
      onclick={click}
    />
  </legend>
  <div {id} class={className} class:closed style:height={closed ? '0px' : dropdownHeight}>
    <slot />
  </div>
</fieldset>

<style>
  legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .collapsable-dropdown {
    float: left;
    width: 100%;
    transition: height 0.3s ease-in-out;
    overflow-y: hidden;
  }
</style>
