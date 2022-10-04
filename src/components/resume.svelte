<script lang="ts">
  import { update } from '../data/data';

  export let name: string;
</script>

<div class="resume-container">
  <div class="resume">
    <!-- This is where the theme information will be placed in the future -->
    <div class="resume-basic-info-container">
      <input
        id="name"
        class="resume-name"
        type="text"
        placeholder="Firstname Lastname"
        bind:value={name}
        on:keyup={() => update(name)}
      />
    </div>
  </div>
</div>

<style>
  .resume-container {
    z-index: -1;
    overflow-y: scroll;
  }

  .resume {
    transform-origin: center top;
    height: 11in;
    width: 8.5in;
    background: white;
    box-shadow: 0px 0px 9px black;
    transform: scale(1);
    margin: 42px auto;
  }

  /* Theme classes and such */
  .resume {
    padding: 0.5in;
  }

  .resume input {
    border: none;
    font-family: 'Times New Roman', Times, serif;
  }

  .resume-basic-info-container {
    display: flex;
    flex-direction: column;
    width: 75%;
  }

  .resume-name {
    font-size: 24px;
  }
</style>
