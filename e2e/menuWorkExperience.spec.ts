import { goToWorkMenu } from './menuHelpers';
import { expect, test } from '@playwright/test';

test.describe('Work menu input', () => {
  test('#14 Work highlights do not duplicate when creating new work object', async ({ page }) => {
    await goToWorkMenu(page);
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
