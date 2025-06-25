import { expect, test } from '@playwright/test';

test('Suche nach Buch 1', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page.getByPlaceholder('Suche nach ID').fill('1');
  await page.getByPlaceholder('Suche nach ID').press('Enter');

  await expect(page).toHaveURL(/\/buecher\/1$/);
});
