<script lang="ts">
  /**
   * The id of the button element
   */
  export let id: string;

  /**
   * The text that appears in the button
   */
  export let text: string;

  /**
   * The function to execute when the button is clicked
   */
  export let click: () => null;
</script>

<button {id} class="add-entry" on:click={click()}>{text}</button>

<style>
  .add-entry {
    margin: 8px 0;
    font-family: serif;
    font-weight: bold;
    width: 100%;
    font-size: 16px;
    height: 32px;
  }
</style>
