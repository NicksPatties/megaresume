import { writable, get, type Writable } from 'svelte/store';

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
  highlights: Writable<Highlight[]> = writable([]);

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

type SaveData = {
  basics: Basics;
  work: Work[];
};

/**
 * Takes data from Basics, Work, and Education stores and saves it to localStorage as a JSON blob
 */
export function saveResumeData(
  basics: BasicsStore = basicsStore,
  work: Writable<WorkStore[]> = workStores
) {
  const saveData: SaveData = {
    basics: {
      name: get(basics.name),
      label: get(basics.label),
      image: get(basics.image),
      phone: get(basics.phone),
      email: get(basics.email),
      summary: get(basics.summary)
    },
    work: []
  };

  get(work).forEach((ws: WorkStore) => {
    saveData.work.push({
      name: get(ws.name),
      position: get(ws.position),
      url: get(ws.url),
      startDate: get(ws.startDate),
      endDate: get(ws.endDate),
      summary: get(ws.summary),
      highlights: get(ws.highlights)
    });
  });

  window.localStorage.setItem('saveData', JSON.stringify(saveData));
}

export function loadData(
  saveDataString: string,
  basics: BasicsStore = basicsStore,
  work: Writable<WorkStore[]> = workStores
) {
  const saveData: SaveData = JSON.parse(saveDataString);
    // load basic data
    basics.name.set(saveData.basics.name);
    basics.label.set(saveData.basics.label);
    basics.image.set(saveData.basics.image);
    basics.label.set(saveData.basics.label);
    basics.phone.set(saveData.basics.phone);
    basics.email.set(saveData.basics.email);
    basics.summary.set(saveData.basics.summary);

    // load work data
    const workStoresArray: WorkStore[] = [];
    saveData.work.forEach((work) => {
      workStoresArray.push(new WorkStore(work));
    });
    work.set(workStoresArray);
}

export function loadLocalStorageData(
  basics: BasicsStore = basicsStore,
  work: Writable<WorkStore[]> = workStores
) {
  const saveDataString = localStorage.getItem('saveData');
  if (saveDataString != null) {
    loadData(saveDataString, basics, work);
  } else {
    console.error('Failed to load resume save data from localStorage!');
  }
}

/**
 * Can use this as a loadResumeFromJSONResume function in the future
 *
 * @param jsonResume
 * @returns
 */
export function loadJSONResumeData(jsonResume: string): [BasicsStore, Writable<WorkStore[]>] {
  const realData = JSON.parse(jsonResume);
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

export const basicsStore = new BasicsStore();
export const workStores: Writable<WorkStore[]> = writable([]);
