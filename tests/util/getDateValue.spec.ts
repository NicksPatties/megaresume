import { getDateValue } from '@src/util/getDateValue';
import { describe, it, expect } from 'vitest';

describe('getDateValue', () => {
  it('should return the correct string for a given date', () => {
    const mockDate = new Date('October 1, 2000');
    expect(getDateValue(mockDate)).toBe('2000-10');
  });

  it('should return the correct string if the month should have a leading zero', () => {
    const mockDate = new Date('January 1, 2000');
    expect(getDateValue(mockDate)).toBe('2000-01');
  });
});
