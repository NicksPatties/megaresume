<script lang="ts">
  /**
   * @param string The id of the button. Useful primarily for testing.
   */
  export let id: string;
  /**
   * @param string The text to appear in the menu button
   */
  export let textContent: string;
  /**
   * @param function Executes when the button is pressed
   */
  export let onclick: (
    _e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => void = () => {
    console.warn('MenuNavButton: this button does nothing!');
  };
</script>

<button {id} class="big-btn" on:click={onclick}>
  {textContent}
  <i class="fa-solid fa-angle-right" />
</button>

<style>
</style>
