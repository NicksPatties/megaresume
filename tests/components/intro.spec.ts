import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Intro from '../../src/components/intro.svelte';

describe('Intro component tests', () => {
  it('should render the correct text', () => {
    const { getByText } = render(Intro, { name: 'name' });
    expect(getByText('Welcome to name')).toBeDefined();
  });
});
