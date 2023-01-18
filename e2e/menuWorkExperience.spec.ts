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

async function addWorkExperience(page: Page) {
  await goToWorkMenu(page);
  await page.click('#newWork');
}

async function expectToBeVisibleAndHaveText(page: Page, id: string, text: string) {
  const l = page.locator(id);
  await expect(l).toBeVisible();
  await expect(l).toHaveText(text);
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

  test.describe('Work menu operations and resume display syncing', () => {
    test('Adding work experience shows a blank work experience entry with placeholder info in the resume', async ({
      page
    }) => {
      await addWorkExperience(page);

      await expectToBeVisibleAndHaveText(page, '#resume_work_0_position', 'Position');
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_name', 'Name');
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_startDate', 'Start date');
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_endDate', 'End date');
      await expectToBeVisibleAndHaveText(
        page,
        '#resume_work_0_highlight_placeholder',
        'Highlights'
      );
    });

    test('Updating fields in work menu correctly updates fields in resume component', async ({
      page
    }) => {
      await addWorkExperience(page);

      /**
       * @param p
       * @param inputId id of the input field without the '#' character
       * @param inputText
       * @param expectedText
       */
      async function fillAndVerify(
        p: Page,
        inputId: string,
        inputText: string,
        expectedText = inputText
      ) {
        await p.locator(`#${inputId}`).fill(inputText);
        await expectToBeVisibleAndHaveText(p, `#resume_${inputId}`, expectedText);
      }

      await fillAndVerify(page, 'work_0_position', 'Position');
      await fillAndVerify(page, 'work_0_name', 'Name');
      await fillAndVerify(page, 'work_0_startDate', '2000-01', 'January 2000');
      await fillAndVerify(page, 'work_0_startDate', '2000-12', 'December 2000');

      await page.locator('#work_0_newHighlight').click();
      const highlightText = 'A new highlight';
      await page.locator('#work_0_highlight_0').fill(highlightText);
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_highlight_0', highlightText);
    });
  });
});
