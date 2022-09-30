import { describe, expect, it } from 'vitest';
import { data, type DataShape } from '../../src/data/data';

describe('data tests', () => {
  it('should resolve to the correct data', async () => {
    const expectedData: DataShape = {
      name: 'SvelteKit',
      url: 'https://kit.svelte.dev/'
    };
    await expect(data).resolves.toStrictEqual(expectedData);
  });
});
