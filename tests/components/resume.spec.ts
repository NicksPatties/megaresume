import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Resume from 'src/components/resume.svelte';

describe('Resume component tests', () => {
  it('should display the name property in the input field', () => {
    const { getByDisplayValue } = render(Resume, { name: 'First Last' });
    expect(getByDisplayValue('First Last')).toBeDefined();
  });
});
