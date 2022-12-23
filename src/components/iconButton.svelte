<script lang="ts">
  export let id: string;
  export let buttonStyle: string;
  export let iconClass: string;
  export let onclick: (
    _e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => void;
</script>

<button {id} class="icon-button" style={buttonStyle} on:click={onclick}>
  <i class={iconClass} />
</button>

<style>
  .icon-button {
    border-radius: 50%;
    font-size: 1.5em;
    width: var(--header-height);
    height: var(--header-height);
    padding: 0;
    margin: 0;
    background: white;
    border: none;
    transition: background-color 0.1s ease-in;
  }

  .icon-button:hover {
    background: #f5f5f5;
  }
</style>
