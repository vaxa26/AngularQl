import { expect, test } from '@playwright/test';

test('Suche nach Büchern', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page.getByPlaceholder('Suche nach ISBN oder Titel').press('Enter');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  // Expect: Es gibt mehr als nur den Header (also Datenzeilen)
  const dataRows = table.locator('tbody tr');
  const rowCount = await dataRows.count();
  expect(rowCount).toBeGreaterThan(4);
});

test('Suche nach Büchern mit titel Alpha', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page.getByPlaceholder('Suche nach ISBN oder Titel').fill('Alpha');
  await page.getByPlaceholder('Suche nach ISBN oder Titel').press('Enter');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  await expect(table).toContainText('Alpha');
});

test('Suche nach Büchern mit ISBN', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page
    .getByPlaceholder('Suche nach ISBN oder Titel')
    .fill('978-3-897-22583-1	');
  await page.getByPlaceholder('Suche nach ISBN oder Titel').press('Enter');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  await expect(table).toContainText('978-3-897-22583-1	');
});

test('Suche nach Büchern mit nicht lieferbar', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page.getByLabel('Nicht lieferbar').check();

  await page.getByPlaceholder('Suche nach ISBN oder Titel').press('Enter');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  await expect(table).toContainText('Nein');
});

test('Suche nach Büchern mit Rating >= 3', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page.locator('.star-rating i.fa-star').nth(2).click();

  await page.getByPlaceholder('Suche nach ISBN oder Titel').press('Enter');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  const rows = table.locator('tbody tr');
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const filledStars = await row.locator('i.fa-solid.fa-star').count();

    expect(filledStars).toBeGreaterThanOrEqual(3);
  }
});
