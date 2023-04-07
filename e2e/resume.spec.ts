import { expect, test } from '@playwright/test';

test.describe('Resume component', () => {
  test('The resume container should be 8.5 by 11 inches', async ({ page }) => {
    const expectedWidth = 816;
    const expectedHeight = 1056;

    await page.goto('/');
    const resumeHandle = page.locator('[data-testid="resume"]');
    const [actualWidth, actualHeight] = await resumeHandle.evaluate((el) => [
      el.clientWidth,
      el.clientHeight
    ]);
    expect(actualWidth).toEqual(expectedWidth);
    expect(actualHeight).toEqual(expectedHeight);
  });
});
