import { type Page } from '@playwright/test';

export async function goToWorkMenu(page: Page) {
  await page.goto('/');
  // open the menu
  await page.locator('#open-button').click();
  // click the resume button
  await page.locator('#menu-button-resume').click();
  // click the work experience button
  await page.locator('#menu-resume-work-button').click();
}
