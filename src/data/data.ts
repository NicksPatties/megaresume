import { writable, type Writable } from 'svelte/store';

type Basics = {
  name: string;
  label: string;
  image: string;
  phone: string;
  email: string;
  summary: string;
};

const blankBasics: Basics = {
  name: '',
  label: '',
  image: '',
  phone: '',
  email: '',
  summary: ''
};

export class BasicsStore {
  name = writable('');
  label = writable('');
  image = writable('');
  phone = writable('');
  email = writable('');
  summary = writable('');

  constructor(params: Basics = blankBasics) {
    this.name.set(params.name);
    this.label.set(params.label);
    this.image.set(params.image);
    this.phone.set(params.phone);
    this.email.set(params.email);
    this.summary.set(params.summary);
  }
}

export type Work = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

const blankWork: Work = {
  name: '',
  position: '',
  url: '',
  startDate: '',
  endDate: '',
  summary: '',
  highlights: ['']
};

export class WorkStore {
  name = writable('');
  position = writable('');
  url = writable('');
  startDate = writable('');
  endDate = writable('');
  summary = writable('');
  highlights = writable(['']);

  constructor(params: Work = blankWork) {
    this.name.set(params.name);
    this.position.set(params.position);
    this.url.set(params.url);
    this.startDate.set(params.startDate);
    this.endDate.set(params.endDate);
    this.summary.set(params.summary);
    this.highlights.set(params.highlights);
  }
}

export type Education = {
  studyType: string;
  institution: string;
  area: string;
  url: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
};

const blankEducation: Education = {
  studyType: '',
  institution: '',
  area: '',
  url: '',
  startDate: '',
  endDate: '',
  score: '',
  courses: ['']
};

export class EducationStore {
  studyType = writable('');
  institution = writable('');
  area = writable('');
  url = writable('');
  startDate = writable('');
  endDate = writable('');
  score = writable('');
  courses = writable(['']);

  constructor(params: Education = blankEducation) {
    this.studyType.set(params.studyType);
    this.institution.set(params.institution);
    this.area.set(params.area);
    this.url.set(params.url);
    this.startDate.set(params.startDate);
    this.endDate.set(params.endDate);
    this.score.set(params.score);
    this.courses.set(params.courses);
  }
}

/**
 * Takes data from Basics, Work, and Education stores and saves it to localStorage as a JSON blob
 */
export function saveResumeData() {
  console.log('save');
}

export function loadResumeData(
  resumeJSON: string
): [BasicsStore, Writable<WorkStore[]>, Writable<EducationStore[]>] {
  const realData = JSON.parse(resumeJSON);
  const basicsStore = new BasicsStore(realData.basics as Basics);
  const workStoresArray: Array<WorkStore> = [];
  realData.work.forEach((elem: Work) => {
    workStoresArray.push(new WorkStore(elem));
  });
  const workStores = writable(workStoresArray);
  const educationStoreArray: Array<EducationStore> = [];
  realData.education.forEach((elem: Education) => {
    educationStoreArray.push(new EducationStore(elem));
  });
  const educationStores = writable(educationStoreArray);

  return [basicsStore, workStores, educationStores];
}
