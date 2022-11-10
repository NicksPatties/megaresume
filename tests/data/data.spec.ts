import { saveResumeData } from '@src/data/data';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('saveResumeData', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      setItem: vi.fn(),
      getItem: vi.fn()
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('saves data to localStorage', () => {
    const expectedSaveData = JSON.stringify({
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
    saveResumeData();
    expect(localStorage.setItem).toHaveBeenCalledOnce();
    expect(localStorage.setItem).toHaveBeenCalledWith('saveData', expectedSaveData);
  });
});
