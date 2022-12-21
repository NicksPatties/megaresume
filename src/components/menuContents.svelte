<script lang="ts">
  export let id: string;
  export let visible = false;
</script>

<div {id} class="menu-contents {visible ? 'visible' : ''}">
  <slot />
</div>
