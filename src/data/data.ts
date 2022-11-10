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

export type Highlight = {
  /**
   * whether the highlist is visible in the resume
   */
  visible: boolean;
  /**
   * the content of the highlight itself
   */
  content: string;
};

export type Work = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: Highlight[];
};

type WorkData = {
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
  highlights: []
};

export class WorkStore {
  name = writable('');
  position = writable('');
  url = writable('');
  startDate = writable('');
  endDate = writable('');
  summary = writable('');
  highlights = writable([{ visible: true, content: '' }]);

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
/**
 * Takes data from Basics, Work, and Education stores and saves it to localStorage as a JSON blob
 */
export function saveResumeData() {
  console.log('save');
}

export function loadResumeData(resumeJSON: string): [BasicsStore, Writable<WorkStore[]>] {
  const realData = JSON.parse(resumeJSON);
  const basicsStore = new BasicsStore(realData.basics as Basics);
  const workStoresArray: Array<WorkStore> = [];
  realData.work.forEach((elem: WorkData) => {
    // convert highlights into newHighlights type for now
    const highlights = elem.highlights;
    const newHighlights: Highlight[] = [];
    highlights.forEach((h: string) => {
      newHighlights.push({ visible: true, content: h });
    });
    // end newHighlight conversion
    workStoresArray.push(
      new WorkStore({
        ...elem,
        highlights: newHighlights
      })
    );
  });
  const workStores = writable(workStoresArray);

  return [basicsStore, workStores];
}
