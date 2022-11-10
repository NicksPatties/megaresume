<script lang="ts">
  export let id: string;
  export let placeholder: string;
  export let disabled = false;
  export let oninput: (e: Event | null) => void;
  export let content: string;
</script>

<textarea {id} {placeholder} {disabled} rows="4" on:input={oninput}>{content}</textarea>

<style>
  textarea {
    margin-top: 6px;
    margin-bottom: 14px;
    font-family: serif;
    font-size: 16px;
    resize: none;
    width: 100%;
  }
</style>
