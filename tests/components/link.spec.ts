import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Link from '../../src/components/link.svelte';

describe('Link component tests', () => {
  it('should render a link tag with the correct href', () => {
    const { container } = render(Link, { href: 'href' });
    expect(() => container.querySelector("[href='href']")).not.toBeNull();
  });
});
