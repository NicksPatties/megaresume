<script lang="ts">
  export let i: number;
  export let name: string;

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target != null) {
      name = target.value;
    }
  }
</script>

<h3>Education {i + 1}</h3>
<label for="education_name">Name</label>
<input id="education_{i}_name" type="text" value={name} on:input={(e) => onInput(e)} />
