import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toBe('Welcome to default value');
  // flaky and I hate it
  await page.waitForTimeout(1000); // greater than mock return time
  expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
});
