<script lang="ts">
  export let name: string;
  export let type: string;
  export let degree: string;
  export let startDate: string;
  export let endDate: string;
</script>

<p>{type}, {degree}, {name}</p>
<p class={'education-date'}>{startDate} - {endDate}</p>

<style>
  .education-date {
    margin-bottom: 12px;
  }
</style>
