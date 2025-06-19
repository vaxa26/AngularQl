import { test, expect } from '@playwright/test';


test('📘 Buch anlegen über klare CSS-Selektoren', async ({ page }) => {
  await page.goto('http://localhost:4200/add');

  await page.locator('input[placeholder="ISBN"]', { hasNotText: 'Untertitel' }).fill('978-3-11111-111-1');

  await page.locator('input[placeholder="Titel"]', { hasNotText: 'Untertitel' }).first().fill('Testtitel');

  await page.locator('input[placeholder="Untertitel"]').fill('Automatisch');

  await page.locator('input[placeholder="Preis"]').fill('12.50');
  await page.locator('input[placeholder="Rabatt"]').fill('3');

  await page.locator('input[placeholder="yyyy-mm-dd"]').fill('2025-10-10');

  await page.locator('input[placeholder="Homepage hinzufügen"]').fill('https://testseite.de');

  await page.locator('input[placeholder="Mit Enter hinzufügen"]').fill('TestSchlagwort');
  await page.keyboard.press('Enter');

  await page.locator('input[placeholder="Beschriftung"]').fill('Testbild');
  await page.locator('input[placeholder*="Content-Type"]').fill('image/jpeg');

  await page.getByRole('button', { name: /buch art/i }).click();
  await page.getByRole('button', { name: /epub/i }).click();

  await page.locator('input[type="checkbox"]').check();

  await page.getByRole('button', { name: /buch erstellen/i }).click();

  await expect(page.locator('text=Fehler')).not.toBeVisible();
});