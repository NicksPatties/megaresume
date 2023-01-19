import {
  saveResumeDataToLocalStorage,
  loadLocalStorageData,
  BasicsStore,
  loadData,
  blankBasics,
  createBlankWork,
  removeTagFromWorkStores,
  type Work
} from '@src/data/data';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type Writable, writable, get } from 'svelte/store';

const blankSaveData = JSON.stringify({
  basics: blankBasics,
  work: []
});

const blankSaveDataWithWork = JSON.stringify({
  basics: blankBasics,
  work: [createBlankWork()]
});

describe('saveResumeDataToLocalStorage', () => {
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
    saveResumeDataToLocalStorage();
    expect(localStorage.setItem).toHaveBeenCalledOnce();
    expect(localStorage.setItem).toHaveBeenCalledWith('saveData', expectedSaveData);
  });

  it('saves basics and work data to localStorage', () => {
    const expectedSaveData = blankSaveDataWithWork;
    const basicsStore = new BasicsStore();
    const workStore: Writable<Work[]> = writable([createBlankWork()]);
    saveResumeDataToLocalStorage(basicsStore, workStore);
    expect(localStorage.setItem).toHaveBeenCalledOnce();
    expect(localStorage.setItem).toHaveBeenCalledWith('saveData', expectedSaveData);
  });
});

describe('loadLocalStorageData', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('loads basics and work data from localStorage', () => {
    const fakeLocalStorage = blankSaveDataWithWork;
    const basicsStore = new BasicsStore();
    const workStores: Writable<Work[]> = writable([]);

    vi.stubGlobal('localStorage', {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getItem: (key: string) => {
        return fakeLocalStorage;
      }
    });

    loadLocalStorageData(basicsStore, workStores);

    // test basicsStore loaded properly
    expect(get(basicsStore.name)).toBe('');
    expect(get(basicsStore.image)).toBe('');
    expect(get(basicsStore.label)).toBe('');
    expect(get(basicsStore.phone)).toBe('');
    expect(get(basicsStore.email)).toBe('');
    expect(get(basicsStore.summary)).toBe('');

    // test if workStores loaded properly
    const actualWorkStores = get(workStores);
    expect(actualWorkStores.length).toBe(1);
    const actualWorkStore = actualWorkStores[0];
    expect(actualWorkStore.visible).toBe(true);
    expect(actualWorkStore.name).toBe('');
    expect(actualWorkStore.position).toBe('');
    expect(actualWorkStore.position).toBe('');
    expect(actualWorkStore.url).toBe('');
    expect(actualWorkStore.startDate).toBe('');
    expect(actualWorkStore.endDate).toBe('');
    expect(actualWorkStore.summary).toBe('');
    expect(actualWorkStore.highlights).toStrictEqual([]);
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

describe('loadData', () => {
  beforeEach(() => {
    vi.stubGlobal('console', {
      error: vi.fn()
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should error with the correct message if there is a TypeError', () => {
    const garbageData = JSON.stringify({ garbage: 'data' });
    const basicsStore = new BasicsStore();
    const workStores: Writable<Work[]> = writable([]);

    loadData(garbageData, basicsStore, workStores);

    expect(console.error).toHaveBeenCalledOnce();
    expect(console.error).toHaveBeenCalledWith(
      "The data doesn't match the expected save format! Perhaps something was corrupted?"
    );
  });
});

describe('removeTagFromWorkStores', () => {
  it('should remove the tag from all the highlights in all work stores', () => {
    const mockHighlights = [
      {
        visible: true,
        content: 'content',
        tagNames: ['js', 'css']
      },
      {
        visible: true,
        content: 'content 2',
        tagNames: ['js', 'html']
      }
    ];
    const mockWorkStore: Writable<Work[]> = writable([
      {
        ...createBlankWork(),
        highlights: mockHighlights
      },
      {
        ...createBlankWork(),
        highlights: mockHighlights
      }
    ]);
    const expectedHighlights = [
      {
        visible: true,
        content: 'content',
        tagNames: ['css']
      },
      {
        visible: true,
        content: 'content 2',
        tagNames: ['html']
      }
    ];
    removeTagFromWorkStores('js', mockWorkStore);

    const actualHighlights = get(mockWorkStore)[0].highlights;
    expect(expectedHighlights).toStrictEqual(actualHighlights);

    const actualHighlights2 = get(mockWorkStore)[1].highlights;
    expect(expectedHighlights).toStrictEqual(actualHighlights2);
  });
});
