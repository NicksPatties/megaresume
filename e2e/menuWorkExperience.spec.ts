import { type Page, expect, test } from '@playwright/test';

async function goToWorkMenu(page: Page) {
  await page.goto('/');
  // open the menu
  await page.locator('#open-button').click();
  // click the resume button
  await page.locator('#menu-button-resume').click();
  // click the work experience button
  await page.locator('#menu-resume-work-button').click();
}

test.describe('Work experience menu input', () => {
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

  test.describe('Start and end dates', () => {
    test('If an end date is earlier than a start date, then the dates are invalid', async ({
      page
    }) => {
      await goToWorkMenu(page);
      await page.click('#newWork');
      await page.locator('#work_0_startDate').fill('2000-01');
      await page.locator('#work_0_endDate').fill('1999-01');
      expect(await page.evaluate('document.getElementById("work_0_endDate").checkValidity()')).toBe(
        false
      );
      expect(
        await page.evaluate('document.getElementById("work_0_startDate").checkValidity()')
      ).toBe(false);
    });
  });
});
