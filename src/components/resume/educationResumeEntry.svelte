<script lang="ts">
  export let i: number;
  export let name: string;
  export let degree: string;
  export let major: string;
  export let startDate: string;
  export let endDate: string;

  const id = `resume_education_${i}_`;
</script>

<p id={`type_major_name_${i}`}>
  <span id={`${id}degree`}>{degree}</span>, <span id={`${id}major`}>{major}</span>,
  <span id={`${id}name`}>{name}</span>
</p>
<p id={`educaiton_name_${i}`} class={'education-date'}>
  <span id={`${id}startDate`}>{startDate}</span> - <span id={`${id}endDate`}>{endDate}</span>
</p>

<style>
  .education-date {
    margin-bottom: 12px;
  }
</style>
