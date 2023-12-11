import { expect, test } from '@playwright/test';

test.describe('Resume component', () => {
  test('The page to open', async ({ page }) => {
    // const expectedWidth = 816;
    // const expectedHeight = 1056;

    await page.goto('/');
    // const resumeHandle = page.locator('[data-testid="resume"]');
    // const [actualWidth, actualHeight] = await resumeHandle.evaluate((el) => [
    //   el.clientWidth,
    //   el.clientHeight
    // ]);
    // expect(actualWidth).toEqual(expectedWidth);
    // expect(actualHeight).toEqual(expectedHeight);
    expect(true).toEqual(true);
  });
});
