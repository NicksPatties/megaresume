import { test } from '@playwright/test';

test.describe('Options menu', () => {
  test('Clear resume clears all the data from the resume', async ({ page }) => {
    await page.goto('/');
    // Click #open-button
    await page.locator('#open-button').click();
    // Click #menu-button-resume
    await page.locator('#menu-button-resume').click();
    // fill in basic resume information
    await page.locator('button:has-text("Basic information")').click();
    await page.locator('#basics_name').click();
    await page.locator('#basics_name').fill('Basic information');
    await page.locator('#basics_title').click();
    await page.locator('#basics_title').fill('title');
    await page.locator('#basics_phone').fill('123456');
    await page.locator('#basics_email').fill('email@email.com');
    await page.locator('#back-button').click();

    // fill in work experience
    await page.locator('button:has-text("Work experience")').click();
    await page.locator('text=Add new work entry').click();
    await page.locator('#work_0_name').fill('work');
    await page.locator('#work_0_position').fill('position');
    await page.locator('#work_0_startDate').fill('2020-05');
    await page.locator('#work_0_endDate').fill('2021-05');
    await page.locator('button:has-text("Edit highlights")').click();
    await page.locator('text=Add new highlight').click();
    await page.locator('textarea').fill('A cool highlight');
    // Fill text=Edit Highlights Highlight 1 Add tags(press Enter to submit tag) Add new highligh >> input[type="text"]
    await page
      .locator(
        'text=Edit Highlights Highlight 1 Add tags(press Enter to submit tag) Add new highligh >> input[type="text"]'
      )
      .fill('html');
    await page
      .locator(
        'text=Edit Highlights Highlight 1 Add tags(press Enter to submit tag) Add new highligh >> input[type="text"]'
      )
      .press('Enter');

    // Click text=Add new highlight
    await page.locator('text=Add new highlight').click();
    await page.locator('#work_0_highlight_1').click();
    await page.locator('#work_0_highlight_1').fill('Another one');
    await page.locator('#work_0_highlight_1_tagsInput').click();
    await page.locator('#work_0_highlight_1_tagsInput').fill('css');
    await page.locator('#work_0_highlight_1_tagsInput').press('Enter');

    // return to main menu
    await page.locator('#back-button').click();
    await page.locator('#back-button').click();
    await page.locator('#back-button').click();

    // go to options menu
    await page.locator('button:has-text("Options")').click();
    // Click text=[DEBUG] Clear resume data
    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss();
    });
    await page.locator('text=[DEBUG] Clear resume data').click();

    // now go into the resume details and check if there's stuff there

    await page.locator('#back-button').click();
    // Click button:has-text("Tags")
    await page.locator('button:has-text("Tags")').click();
    // Click #back-button
    await page.locator('#back-button').click();
    // Click #back-button
    await page.locator('#back-button').click();
  });
});
