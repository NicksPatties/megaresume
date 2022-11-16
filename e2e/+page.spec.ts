import { expect, test } from '@playwright/test';

test.describe('Resume input', () => {
  test('#14 Work highlights do not duplicate when creating new work object', async ({ page }) => {
    await page.goto('/');
    // open the resume menu
    await page.click('.open-button');
    // click add new work
    await page.click('#newWork');
    // click add new highlight
    await page.click('#work_0_newHighlight');
    // type in new highlight
    await page.type('#work_0_highlight_0', 'A new highlight');
    // click add new work
    await page.click('#newWork');
    // check if there are no new highlights
    expect(await page.isVisible('#work_1_highlight_0', { strict: true })).toBe(false);
  });
});
