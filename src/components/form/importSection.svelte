<script lang="ts">
  import type { JsonResume } from '@src/data/JsonResume';
  import { loadData, saveResumeDataToLocalStorage } from '@src/data/data';
  import importJsonResume from '@src/data/importJsonResume';

  function requestFile() {
    const fileUpload = document.getElementById('import-megaresume-data-input');
    if (fileUpload != null) fileUpload.click();
  }

  function requestJsonResumeFile() {
    const fileUpload = document.getElementById('import-jsonresume-data-input');
    if (fileUpload != null) fileUpload.click();
  }

  /**
   * Loads a MegaResume Json file
   * @param {Event} e an event that is triggered by an HTMLInputElement
   */
  const fileUpload = document.getElementById('import-megaresume-data-input');
  if (fileUpload != null) fileUpload.click();
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

  /**
    Loads a Json Resume file into MegaResume
    @param {Event} e fires when uploading a file
  */
  function loadJsonResumeFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file != undefined) {
      const fr = new FileReader();
      fr.onload = (e) => {
        if (e.target == null || e.target.result == null) {
          console.error('something went wrong with loading json resume file');
        } else {
          const jsonResume = JSON.parse(e.target.result as string) as JsonResume;
          importJsonResume(jsonResume);
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
      id="what-is-jsonresume"
      href="https://jsonresume.org/schema/">Learn more about JSON Resume.</a
    >
  </p>

  <button on:click={requestJsonResumeFile} id="import-jsonresume-data">Import JSON Resume</button>
  <input
    id="import-jsonresume-data-input"
    type="file"
    accept=".json"
    style="display:none"
    on:change={loadJsonResumeFile}
  />

  <button on:click={requestFile} id="import-megaresume-data">Open MegaResume data</button>
  <input
    id="import-megaresume-data-input"
    type="file"
    accept=".json"
    style="display:none"
    on:change={loadFile}
  />
</section>
