import type { Writable } from 'svelte/store';
import {
  type BasicsStore,
  workStore,
  type Work,
  basicsStore,
  type Highlight,
  educationStore,
  type Education
} from './data';
import type { JsonResume } from './JsonResume';

/**
Imports the contents of a JSON Resume and adds the contents into the appropriate stores.

@param jsonResume {JsonResume} The json resume as defined by the [following schema](https://jsonresume.org/schema/)
@param [basics=basicsStore] {BasicsStore} The stores for the basic information
@param [work=workStore] {Writable<Work[]>} The store for the work array
@param [education=educationStore] {Writable<Education[]>} The store for the education array
*/
export default function importJsonResume(
  jsonResume: JsonResume,
  basics: BasicsStore = basicsStore,
  work: Writable<Work[]> = workStore,
  education: Writable<Education[]> = educationStore
) {
  importBasics(jsonResume, basics);
  importWork(jsonResume, work);
  importEducation(jsonResume, education);
}

function importBasics(jsonResume: JsonResume, basicsStore: BasicsStore) {
  if (jsonResume.basics == undefined) {
    console.warn('No basic information. Ignoring import');
    return;
  }
  if (jsonResume.basics.name) {
    basicsStore.name.set(jsonResume.basics.name);
  }
  if (jsonResume.basics.label) {
    basicsStore.label.set(jsonResume.basics.label);
  }
  if (jsonResume.basics.email) {
    basicsStore.email.set(jsonResume.basics.email);
  }
  if (jsonResume.basics.phone) {
    basicsStore.phone.set(jsonResume.basics.phone);
  }
  if (jsonResume.basics.summary) {
    basicsStore.summary.set(jsonResume.basics.summary);
  }
  if (jsonResume.basics.location?.region) {
    basicsStore.location.set(jsonResume.basics.location.region);
  }
}

function importWork(jsonResume: JsonResume, workStore: Writable<Work[]>) {
  if (!jsonResume.work) {
    console.warn('No work information. Ignoring work import.');
    return;
  }
  const newWork: Array<Work> = [];
  for (const inWork of jsonResume.work) {
    const [startYear, startMonth] = inWork.startDate ? inWork.startDate.split('-') : ['', ''];
    const [endYear, endMonth] = inWork.endDate ? inWork.endDate.split('-') : ['', ''];
    const highlights: Array<Highlight> = [];
    if (inWork.highlights) {
      inWork.highlights.forEach((h: string) => {
        highlights.push({
          visible: true,
          content: h,
          tagNames: []
        });
      });
    }
    const outWork: Work = {
      visible: true,
      name: inWork.name || '',
      position: inWork.position || '',
      url: '',
      startMonth,
      startYear,
      current: false,
      endMonth,
      endYear,
      summary: inWork.summary || '',
      highlights
    };
    newWork.push(outWork);
  }

  workStore.set(newWork);
}

function importEducation(jsonResume: JsonResume, educationStore: Writable<Education[]>) {
  if (!jsonResume.education) {
    return;
  }
  const newEducation: Array<Education> = [];
  for (const inEdu of jsonResume.education) {
    const [startYear, startMonth] = inEdu.startDate ? inEdu.startDate.split('-') : ['', ''];
    const [endYear, endMonth] = inEdu.endDate ? inEdu.endDate.split('-') : ['', ''];
    const outEdu: Education = {
      visible: true,
      name: inEdu.institution || '',
      degree: inEdu.studyType || '',
      major: inEdu.area || '',
      startYear,
      startMonth,
      current: false,
      endYear,
      endMonth
    };
    newEducation.push(outEdu);
  }
  educationStore.set(newEducation);
}
