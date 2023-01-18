import { writable, get, type Writable } from 'svelte/store';

type Basics = {
  name: string;
  label: string;
  image: string;
  phone: string;
  email: string;
  summary: string;
};

export const blankBasics: Basics = {
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
  /**
   * the tags that have been assigned to the highlight
   */
  tagNames: string[];
};

export type Work = {
  visible: boolean;
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: Highlight[];
};

export type NewWork = Work;

export function createBlankWork(): Work {
  return {
    visible: true,
    name: '',
    position: '',
    url: '',
    startDate: '',
    endDate: '',
    summary: '',
    highlights: []
  };
}

export class WorkStore {
  visible = writable(true);
  name = writable('');
  position = writable('');
  url = writable('');
  startDate = writable('');
  endDate = writable('');
  summary = writable('');
  highlights: Writable<Highlight[]> = writable([]);

  constructor(params: Work = createBlankWork()) {
    this.visible.set(params.visible);
    this.name.set(params.name);
    this.position.set(params.position);
    this.url.set(params.url);
    this.startDate.set(params.startDate);
    this.endDate.set(params.endDate);
    this.summary.set(params.summary);
    this.highlights.set(params.highlights);
  }
}

export function removeTagFromWorkStores(tagName: string, stores = workStores) {
  const workEntries = get(stores);
  workEntries.forEach((workStore) => {
    const highlights = get(workStore.highlights);
    highlights.forEach((h) => {
      h.tagNames = h.tagNames.filter((t) => t !== tagName);
    });
    workStore.highlights.set(highlights);
  });
}

export type SaveData = {
  basics: Basics;
  work: Work[];
};

export function saveData(
  basics: BasicsStore = basicsStore,
  work: Writable<WorkStore[]> = workStores
): SaveData {
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
      visible: get(ws.visible),
      name: get(ws.name),
      position: get(ws.position),
      url: get(ws.url),
      startDate: get(ws.startDate),
      endDate: get(ws.endDate),
      summary: get(ws.summary),
      highlights: get(ws.highlights)
    });
  });

  return saveData;
}

/**
 * Takes data from Basics, Work, and Education stores and saves it to localStorage as a JSON blob
 */
export function saveResumeDataToLocalStorage(
  basics: BasicsStore = basicsStore,
  work: Writable<WorkStore[]> = workStores
) {
  const data: SaveData = saveData(basics, work);
  window.localStorage.setItem('saveData', JSON.stringify(data));
}

export function loadData(
  saveDataString: string,
  basics: BasicsStore = basicsStore,
  work: Writable<WorkStore[]> = workStores
) {
  const saveData: SaveData = JSON.parse(saveDataString);
  try {
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
  } catch (e) {
    if (e instanceof TypeError) {
      console.error(
        "The data doesn't match the expected save format! Perhaps something was corrupted?"
      );
    } else {
      console.error('Something went wrong loading the data. Please try loading it again.');
    }
  }
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

export function clearResumeStores() {
  basicsStore.name.set('');
  basicsStore.label.set('');
  basicsStore.image.set('');
  basicsStore.label.set('');
  basicsStore.phone.set('');
  basicsStore.email.set('');
  basicsStore.summary.set('');

  workStores.set([]);
}

export const basicsStore = new BasicsStore();
export const workStores: Writable<WorkStore[]> = writable([]);
export const newWorkStores: Writable<Work[]> = writable([]);
