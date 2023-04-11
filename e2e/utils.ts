import { type Page, expect } from '@playwright/test';

export async function goToWorkMenu(page: Page) {
  await page.goto('/');
  // open the menu
  await page.locator('#open-button').click();
  // click the resume button
  await page.locator('#menu-button-resume').click();
  // click the work experience button
  await page.locator('#menu-resume-work-button').click();
}

export async function addWorkExperience(page: Page) {
  await goToWorkMenu(page);
  await page.click('#newWork');
}

export async function expectToBeVisibleAndHaveText(page: Page, id: string, text: string) {
  const l = page.locator(id);
  await expect(l).toBeVisible();
  await expect(l).toHaveText(text);
}
