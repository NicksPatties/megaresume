import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Menu from 'src/components/menu.svelte';

describe('Menu component tests', () => {
  it('should display the name property in the input field', () => {
    const { getByDisplayValue } = render(Menu, { name: 'First Last' });
    expect(getByDisplayValue('First Last')).toBeDefined();
  });
});
