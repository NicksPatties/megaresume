import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Menu from '@src/components/menu/menu.svelte';

describe('Menu component tests', () => {
  it('should have the correct branding in the header', () => {
    const { getByText } = render(Menu);
    expect(() => getByText('MegaResume')).to.not.throw;
  });
});
