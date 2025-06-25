import { expect, test } from '@playwright/test';

test('📘 Admin meldet sich an und legt ein Buch an', async ({ page }) => {
  // 1. Startseite aufrufen
  await page.goto('http://localhost:4200/home');

  // 2. Login-Icon (👤) klicken – hat class="User"
  await page.locator('button.User').click();

  // 3. Login-Formular ausfüllen
  await page.getByPlaceholder('Name').fill('admin');
  await page.getByPlaceholder('Passwort').fill('p');
  await page.locator('button.btn-primary:has-text("Login")').click();

  // 4. Warten bis Login-Fenster verschwindet
  await page.waitForSelector('button.btn-outline-primary');

  // 5. Menü-Button klicken
  await page.locator('button.btn-outline-primary').click();

  // 6. Button mit Text "Hinzufügen" klicken
  await page.getByRole('button', { name: /Hinzufügen/ }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  // 7. Warten bis Formular geladen ist
  await expect(page.getByPlaceholder('ISBN')).toBeVisible();

  // 8. Formularfelder ausfüllen
  await page.getByPlaceholder('ISBN').fill('9781234567897');

  await page.locator('input[placeholder="Titel"]').fill('Testbuch');
  await page.getByLabel('Untertitel').fill('Playwright Test');

  await page.getByPlaceholder('Preis').fill('14.99');
  await page.getByPlaceholder('Rabatt').fill('0.1');
  await page.getByPlaceholder('yyyy-mm-dd').fill('2025-07-01');

  await page.getByPlaceholder('Beschriftung').fill('Playwright Buch');
  await page
    .getByPlaceholder('Content-Type (z.B. image/png)')
    .fill('image/png');

  await page.screenshot({
    path: 'screenshots/login-debug.png',
    fullPage: true,
  });

  await page.locator('input[name="homepage"]').fill('https://example.com');

  // 9. Buch-Art auswählen (EPUB)
  await page.getByRole('button', { name: 'Buch Art' }).click();
  await page.getByRole('button', { name: 'EPUB' }).click();

  // 10. Bewertung: 4 Sterne
  await page.locator('i.fa-star').nth(3).click(); // Index 3 = 4. Stern

  // 11. Lieferbar anhaken
  await page.getByLabel('Lieferbar').check();

  // 12. Schlagwörter anhaken
  await page.getByLabel('JAVASCRIPT').check();
  await page.getByLabel('TYPESCRIPT').check();

  // 13. Buch erstellen
  await page.getByRole('button', { name: /Buch erstellen/i }).click();

  // 14. Sicherstellen: kein Fehler-Alert
  await expect(page.locator('ngb-alert[type="danger"]')).toHaveCount(0);

  await page.goto('http://localhost:4200/home');

  await page.getByPlaceholder('Suche nach ISBN oder Titel').fill('Testbuch');
  await page.getByPlaceholder('Suche nach ISBN oder Titel').press('Enter');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  await expect(table).toContainText('Testbuch');

  await page.screenshot({
    path: 'screenshots/resultaddbook.png',
    fullPage: true,
  });
});
