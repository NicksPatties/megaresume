<script lang="ts">
  import { loadData, saveResumeDataToLocalStorage } from '@src/data/data';

  function requestFile() {
    const fileUpload = document.getElementById('import-megaresume-data-input');
    if (fileUpload != null) fileUpload.click();
  }

  /**
   * Loads a MegaResume Json file
   * @param {Event} e an event that is triggered by an HTMLInputElement
   */
  function loadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file != undefined) {
      console.log(`File uploaded! ${file.name}: ${file.size}`);
      const fr = new FileReader();
      fr.onload = (e) => {
        if (e.target == null) {
          console.error('something went wrong opening the file. try again?');
        } else {
          loadData(e.target.result as string);
          saveResumeDataToLocalStorage();
        }
      };
      fr.readAsText(file);
    }
  }
</script>

<section id="import">
  <h1>Import Resume</h1>
  <p class="full-width">
    MegaResume uses the JSON Resume format to import your resume. <a
      id="what-is-json-resume"
      href="https://jsonresume.org/schema/">Learn more about JSON Resume.</a
    >
  </p>

  <button id="import-json-resume">Import JSON Resume (Coming soon)</button>

  <button on:click={requestFile} id="import-megaresume-data">Open MegaResume data</button>
  <input
    id="import-megaresume-data-input"
    type="file"
    accept=".json"
    style="display:none"
    on:change={loadFile}
  />
</section>
