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

export function removeTagFromWorkStores(tagName: string, stores = workStore) {
  stores.update((workArray) => {
    workArray.forEach((work) => {
      work.highlights.forEach((highlight) => {
        highlight.tagNames = highlight.tagNames.filter((t) => t !== tagName);
      });
    });
    return workArray;
  });
}

export type SaveData = {
  basics: Basics;
  work: Work[];
};

export function saveData(basics = basicsStore, work = workStore): SaveData {
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

  get(work).forEach((w) => {
    saveData.work.push({
      visible: w.visible,
      name: w.name,
      position: w.position,
      url: w.url,
      startDate: w.startDate,
      endDate: w.endDate,
      summary: w.summary,
      highlights: w.highlights
    });
  });

  return saveData;
}

/**
 * Takes data from Basics, Work, and Education stores and saves it to localStorage as a JSON blob
 */
export function saveResumeDataToLocalStorage(basics: BasicsStore = basicsStore, work = workStore) {
  const data: SaveData = saveData(basics, work);
  window.localStorage.setItem('saveData', JSON.stringify(data));
}

export function loadData(saveDataString: string, basics = basicsStore, work = workStore) {
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
    const workStoresArray: Work[] = [];
    saveData.work.forEach((work) => {
      workStoresArray.push(work);
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

export function loadLocalStorageData(basics: BasicsStore = basicsStore, work = workStore) {
  const saveDataString = localStorage.getItem('saveData');
  if (saveDataString != null) {
    loadData(saveDataString, basics, work);
  } else {
    console.error('Failed to load resume save data from localStorage!');
  }
}

export function clearResumeStores(basics = basicsStore, work = workStore) {
  basics.name.set('');
  basics.label.set('');
  basics.image.set('');
  basics.label.set('');
  basics.phone.set('');
  basics.email.set('');
  basics.summary.set('');

  work.set([]);
}

export const basicsStore = new BasicsStore();
export const workStore: Writable<Work[]> = writable([]);
