<script lang="ts">
  export let i: number;
  export let name: string;
  export let type: string;
  export let major: string;
  export let startDate: string;
  export let endDate: string;
</script>

<p id={`type_major_name_${i}`}>{type}, {major}, {name}</p>
<p id={`educaiton_name_${i}`} class={'education-date'}>{startDate} - {endDate}</p>

<style>
  .education-date {
    margin-bottom: 12px;
  }
</style>
