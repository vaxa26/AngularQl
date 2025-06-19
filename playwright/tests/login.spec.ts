import { test, expect } from '@playwright/test';

test('🔐 Login über Icon oben links', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  // Den ersten Button oben links anklicken
  const loginIcon = page.locator('button').first();
  await expect(loginIcon).toBeVisible();
  await loginIcon.click();

  // Felder ausfüllen
  await page.getByPlaceholder('Name').fill('demo');
  await page.getByPlaceholder('Passwort').fill('demo');

  // Absenden
  await page.getByRole('button', { name: /Login/i }).click();

  // Überprüfen, ob erfolgreich eingeloggt
  await expect(page.locator('text=Willkommen')).toBeVisible();
});
