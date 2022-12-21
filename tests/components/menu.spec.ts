import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Menu from '@src/components/menu.svelte';
import { BasicsStore } from '@src/data/data';
import { writable } from 'svelte/store';

describe('Menu component tests', () => {
  it('should have the correct branding in the header', () => {
    const { getByText } = render(Menu, {
      basics: new BasicsStore(),
      work: writable([])
    });
    expect(() => getByText('MegaResume')).to.not.throw;
  });
});
