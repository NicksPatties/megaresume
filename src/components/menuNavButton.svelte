<script lang="ts">
  export let id = '';
  export let textContent = 'Menu button';
  export let onclick: (
    _e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => void = () => {
    console.warn('IconButton: this button does nothing!');
  };
</script>

<button {id} class="big-btn" on:click={onclick}>
  {textContent}
  <i class="fa-solid fa-angle-right" />
</button>
