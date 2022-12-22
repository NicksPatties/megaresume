import { describe, it, expect } from 'vitest';
import { push, pop } from '@src/util/menuStack';

const mockStack = ['id-0'];

describe('menuStack push', () => {
  it('should ignore the id from the stack if its already present at the end', () => {
    expect(push('id-0', mockStack)).toStrictEqual(mockStack);
  });

  it('should push the id to the end of the stack', () => {
    const expectedStack = ['id-0', 'id-1'];
    expect(push('id-1', mockStack)).toStrictEqual(expectedStack);
  });
});

describe('menuStack pop', () => {
  it('should ignore popping if the stack is too short', () => {
    expect(pop(mockStack)).toStrictEqual(mockStack);
  });

  it('should pop the last element off the stack', () => {
    expect(pop(['id-0', 'id-1'])).toStrictEqual(mockStack);
  });
});
