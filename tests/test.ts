import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
});

test('js behaves as expected', () => {
  expect(1 + 1).toEqual(2);
});
