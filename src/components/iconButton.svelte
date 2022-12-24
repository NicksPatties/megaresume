<script lang="ts">
  export let id = '';
  export let buttonStyle = '';
  export let iconClass: string;
  export let size = 'big';
  export let onclick: (
    _e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => void = () => {
    console.warn('IconButton: this button does nothing!');
  };
</script>

<button {id} class="icon-button {size}" style={buttonStyle} on:click={onclick}>
  <i class={iconClass} />
</button>

<style>
  :root {
    --big-button-size: var(--header-height);
    --small-button-size: 20.5px;
  }

  .icon-button {
    border-radius: 50%;
    padding: 0;
    margin: 0;
    background: white;
    border: none;
    transition: background-color 0.1s ease-in;
  }

  .icon-button:hover {
    background: #f5f5f5;
  }

  .icon-button:active {
    background: #ddd;
  }

  .big {
    width: var(--header-height);
    height: var(--header-height);
    font-size: 1.5em;
  }

  .small {
    width: var(--small-button-size);
    height: var(--small-button-size);
    font-size: 0.9rem;
  }
</style>
