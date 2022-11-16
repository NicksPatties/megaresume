import { arrayMove } from '@src/util/arrayMove';
import { describe, expect, it } from 'vitest';

describe('arrayMove', () => {
  it('should return the array if it has a length less than or equal to 1', () => {
    const testArray = [0];
    const result = arrayMove(testArray, 0, 1);
    expect(result).toStrictEqual(testArray);
  });

  it('should return the array if its move and to values are the same', () => {
    const testArray = [0, 1];
    const result = arrayMove(testArray, 0, 0);
    expect(result).toStrictEqual(testArray);
  });

  it('should move an element back to the correct index', () => {
    const testArray = [0, 1, 2];
    const expected = [1, 0, 2];
    const result = arrayMove(testArray, 0, 1);
    expect(result).toStrictEqual(expected);
  });

  it('should move an element back to the correct index', () => {
    const testArray = [0, 1, 2];
    const expected = [1, 0, 2];
    const result = arrayMove(testArray, 1, 0);
    expect(result).toStrictEqual(expected);
  });
});
