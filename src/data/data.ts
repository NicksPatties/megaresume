import { writable, get, type Writable } from 'svelte/store';
import { tagsStore, type Tag } from './tag';

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

export type Education = {
  visible: boolean;
  name: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
};

export type SaveData = {
  basics: Basics;
  work: Work[];
  education: Education[];
  tags: Tag[];
};

export function saveData(
  basics = basicsStore,
  work = workStore,
  edu = educationStore,
  tags = tagsStore
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
    work: [],
    education: [],
    tags: []
  };

  get(work).forEach((w) => {
    saveData.work.push(w);
  });

  get(edu).forEach((ed) => {
    saveData.education.push(ed);
  });

  get(tags).forEach((t) => {
    saveData.tags.push(t);
  });

  return saveData;
}

/**
 * Takes data from Basics, Work, and Education stores and saves it to localStorage as a JSON blob
 */
export function saveResumeDataToLocalStorage(
  basics = basicsStore,
  work = workStore,
  education = educationStore,
  tags = tagsStore
) {
  const data: SaveData = saveData(basics, work, education, tags);
  window.localStorage.setItem('saveData', JSON.stringify(data));
}

export function loadData(
  saveDataString: string,
  basics = basicsStore,
  work = workStore,
  edu = educationStore,
  tags = tagsStore
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
    const workStoresArray: Work[] = [];
    if (saveData.work == undefined) {
      saveData.work = [];
    }
    saveData.work.forEach((work) => {
      workStoresArray.push(work);
    });
    work.set(workStoresArray);

    // load education data
    const educationStoresArray: Education[] = [];
    if (saveData.education == undefined) {
      saveData.education = [];
    }
    saveData.education.forEach((edu) => {
      educationStoresArray.push(edu);
    });
    edu.set(educationStoresArray);

    // load tags
    const loadedtags: Tag[] = [];
    saveData.tags.forEach((tag) => {
      loadedtags.push(tag);
    });
    tags.set(loadedtags);
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
  work = workStore,
  edu = educationStore,
  tags = tagsStore
) {
  const saveDataString = localStorage.getItem('saveData');
  if (saveDataString != null) {
    loadData(saveDataString, basics, work, edu, tags);
  } else {
    console.error('Failed to load resume save data from localStorage!');
  }
}

export function clearResumeStores(
  basics = basicsStore,
  work = workStore,
  edu = educationStore,
  tags = tagsStore
) {
  basics.name.set('');
  basics.label.set('');
  basics.image.set('');
  basics.label.set('');
  basics.phone.set('');
  basics.email.set('');
  basics.summary.set('');

  work.set([]);
  edu.set([]);
  tags.set([]);
}

export const basicsStore = new BasicsStore();
export const workStore: Writable<Work[]> = writable([]);
export const educationStore: Writable<Education[]> = writable([]);
/**
 * The index to determine which highlights to show in the highlights menu
 */
export const workI: Writable<number> = writable(0);
