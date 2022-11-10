import { saveResumeData, loadLocalStorageData, BasicsStore, type WorkStore } from '@src/data/data';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type Writable, writable, get } from 'svelte/store';

const blankSaveData = JSON.stringify({
  basics: {
    name: '',
    label: '',
    image: '',
    phone: '',
    email: '',
    summary: ''
  },
  work: []
});

describe('saveResumeData', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      setItem: vi.fn()
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('saves data to localStorage', () => {
    const expectedSaveData = blankSaveData;
    saveResumeData();
    expect(localStorage.setItem).toHaveBeenCalledOnce();
    expect(localStorage.setItem).toHaveBeenCalledWith('saveData', expectedSaveData);
  });
});

describe('loadLocalStorageData', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('loads data from localStorage', () => {
    const fakeLocalStorage = blankSaveData;
    const basicsStore = new BasicsStore();
    const workStores: Writable<WorkStore[]> = writable([]);

    vi.stubGlobal('localStorage', {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getItem: (key: string) => {
        return fakeLocalStorage;
      }
    });

    loadLocalStorageData(basicsStore, workStores);
    expect(get(basicsStore.name)).toBe('');
    expect(get(basicsStore.image)).toBe('');
    expect(get(basicsStore.label)).toBe('');
    expect(get(basicsStore.phone)).toBe('');
    expect(get(basicsStore.email)).toBe('');
    expect(get(basicsStore.summary)).toBe('');
    expect(get(workStores)).toStrictEqual([]);
  });

  it('errors in the console if no save data is loaded', () => {
    vi.stubGlobal('localStorage', {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getItem: (key: string) => {
        return null;
      }
    });
    vi.stubGlobal('console', {
      error: vi.fn()
    });

    loadLocalStorageData();

    expect(console.error).toHaveBeenCalledOnce();
  });
});
