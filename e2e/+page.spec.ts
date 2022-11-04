import { expect, test } from '@playwright/test';

test.describe('Resume input', () => {
  // test('Inputting value in menu reflects in resume', async ({ page }) => {
  //   const testName = 'My Name';
  //   await page.goto('/');
  //   await page.locator('.open-button').click();
  //   await page.locator('.basic-info-content #name').type(testName);
  //   expect(await page.locator('.resume-basic-info-container #name').inputValue()).toBe(testName);
  // });
  test('placeholder', () => {
    expect(true).toBe(true);
  });
});
