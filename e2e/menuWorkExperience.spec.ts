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
    // go to highlights page
    await page.click('#menu_highlights_0');
    // click add new highlight
    await page.click('#work_0_newHighlight');
    // type in new highlight
    await page.type('#work_0_highlight_0', 'A new highlight');
    // go back to work menu
    await page.click('#back-button');
    // click add new work
    await page.click('#newWork');
    // go to the highlights of the new work you just created
    await page.click('#menu_highlights_1');
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
      await fillAndVerify(page, 'work_0_endDate', '2000-12', 'December 2000');

      // go to highlights page
      await page.click('#menu_highlights_0');
      await page.click('#work_0_newHighlight');
      const highlightText = 'A new highlight';
      await page.type('#work_0_highlight_0', highlightText);
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_highlight_0', highlightText);
    });

    test('Removing a highlight from a work field should update the resume components list correctly', async ({
      page
    }) => {
      await addWorkExperience(page);
      await page.click('#menu_highlights_0');
      await page.locator('#work_0_newHighlight').click();
      await page.locator('#work_0_highlight_0').fill('Some highlight that I will delete.');
      page.on('dialog', (dialog) => dialog.accept()); // click ok when the delete confirmation dialog occurs
      await page.locator('#work_0_highlight_0_delete').click();
      await expect(page.locator('#work_0_highlight_0')).not.toBeVisible();
      await expect(page.locator('#resume_work_0_highlight_0')).not.toBeVisible();
    });

    test('Adding and removing a tag to a highlight should show and hide the tag below the highlight respectively', async ({
      page
    }) => {
      await addWorkExperience(page);
      await page.click('#menu_highlights_0');
      await page.locator('#work_0_newHighlight').click();
      const tagName = 'tagName';
      const tagsInput = page.locator('#work_0_highlight_0_tagsInput');
      await tagsInput.type(tagName);
      await tagsInput.press('Enter');
      const tagId = `#work_0_highlight_0_tag_${tagName}`;
      // test if the tag showed up
      await expectToBeVisibleAndHaveText(page, tagId, tagName);
      // remove the tag and test if it's gone
      await page.locator(`#work_0_highlight_0_delete_tag_${tagName}`).click();
      await expect(page.locator(tagId)).not.toBeVisible();
    });

    test('Changing the order of highlights updates the list of highlights in the resume properly', async ({
      page
    }) => {
      await addWorkExperience(page);
      await page.click('#menu_highlights_0');
      // fill in highlights
      const firstHighlight = 'First highlight';
      const secondHighlight = 'Second highlight';
      const firstHighlightLocator = page.locator('#work_0_highlight_0');
      const secondHighlightLocator = page.locator('#work_0_highlight_1');
      await page.locator('#work_0_newHighlight').click();
      await firstHighlightLocator.fill(firstHighlight);
      await page.locator('#work_0_newHighlight').click();
      await secondHighlightLocator.fill(secondHighlight);

      // move first highlight down and verify
      await page.locator('#work_0_highlight_0_down').click();
      await expect(page.locator('#work_0_highlight_0')).toHaveValue(secondHighlight);
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_highlight_0', secondHighlight);
      await expect(page.locator('#work_0_highlight_1')).toHaveValue(firstHighlight);
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_highlight_1', firstHighlight);

      // move the second highlight up and verify
      // list should be back to its initial order
      await page.locator('#work_0_highlight_1_up').click();
      await expect(page.locator('#work_0_highlight_0')).toHaveValue(firstHighlight);
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_highlight_0', firstHighlight);
      await expect(page.locator('#work_0_highlight_1')).toHaveValue(secondHighlight);
      await expectToBeVisibleAndHaveText(page, '#resume_work_0_highlight_1', secondHighlight);
    });

    test('Changing the order of work entries updates the resume with the correct information', async ({
      page
    }) => {
      await goToWorkMenu(page);
      const work1 = {
        name: 'Work 1 Name',
        position: 'Work 1 Position',
        startDate: '2001-01',
        decoratedStartDate: 'January 2001',
        endDate: '2001-12',
        decoratedEndDate: 'December 2001',
        highlight: 'Work 1 highlight'
      };

      const work2 = {
        name: 'Work 2 Name',
        position: 'Work 2 Position',
        startDate: '2002-01',
        decoratedStartDate: 'January 2002',
        endDate: '2002-12',
        decoratedEndDate: 'December 2002',
        highlight: 'Work 2 highlight'
      };

      // add first work experience
      await page.locator('#newWork').click();
      await page.locator('#work_0_name').fill(work1.name);
      await page.locator('#work_0_position').fill(work1.position);
      await page.locator('#work_0_startDate').fill(work1.startDate);
      await page.locator('#work_0_endDate').fill(work1.endDate);
      await page.click('#menu_highlights_0');
      await page.locator('#work_0_newHighlight').click();
      await page.locator('#work_0_highlight_0').fill(work1.highlight);
      await page.click('#back-button');
      // add second work experience
      await page.locator('#newWork').click();
      await page.locator('#work_1_name').fill(work2.name);
      await page.locator('#work_1_position').fill(work2.position);
      await page.locator('#work_1_startDate').fill(work2.startDate);
      await page.locator('#work_1_endDate').fill(work2.endDate);
      await page.click('#menu_highlights_1');
      await page.locator('#work_1_newHighlight').click();
      await page.locator('#work_1_highlight_0').fill(work2.highlight);
      await page.click('#back-button');

      // swap work
      await page.locator('#work_0_down').click();

      // verify the swap is correct in the menu
      await expect(page.locator('#work_0_header')).toHaveText(work2.name);
      await expect(page.locator('#work_0_name')).toHaveValue(work2.name);
      await expect(page.locator('#work_0_position')).toHaveValue(work2.position);
      await expect(page.locator('#work_0_startDate')).toHaveValue(work2.startDate);
      await expect(page.locator('#work_0_endDate')).toHaveValue(work2.endDate);
      await page.click('#menu_highlights_0');
      await expect(page.locator('#work_0_highlight_0')).toHaveValue(work2.highlight);
      await page.click('#back-button');

      await expect(page.locator('#work_1_header')).toHaveText(work1.name);
      await expect(page.locator('#work_1_name')).toHaveValue(work1.name);
      await expect(page.locator('#work_1_position')).toHaveValue(work1.position);
      await expect(page.locator('#work_1_startDate')).toHaveValue(work1.startDate);
      await expect(page.locator('#work_1_endDate')).toHaveValue(work1.endDate);
      await page.click('#menu_highlights_1');
      await expect(page.locator('#work_1_highlight_0')).toHaveValue(work1.highlight);
      await page.click('#back-button');

      // verify the swap is correct in the resume component
      await expect(page.locator('#resume_work_0_name')).toHaveText(work2.name);
      await expect(page.locator('#resume_work_0_position')).toHaveText(work2.position);
      await expect(page.locator('#resume_work_0_startDate')).toHaveText(work2.decoratedStartDate);
      await expect(page.locator('#resume_work_0_endDate')).toHaveText(work2.decoratedEndDate);
      await expect(page.locator('#resume_work_0_highlight_0')).toHaveText(work2.highlight);

      await expect(page.locator('#resume_work_1_name')).toHaveText(work1.name);
      await expect(page.locator('#resume_work_1_position')).toHaveText(work1.position);
      await expect(page.locator('#resume_work_1_startDate')).toHaveText(work1.decoratedStartDate);
      await expect(page.locator('#resume_work_1_endDate')).toHaveText(work1.decoratedEndDate);
      await expect(page.locator('#resume_work_1_highlight_0')).toHaveText(work1.highlight);
    });
  });
});
