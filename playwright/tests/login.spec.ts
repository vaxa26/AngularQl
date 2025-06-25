import { expect, test } from '@playwright/test';

test('🔐 Login über Icon oben links', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  // Den ersten Button oben links anklicken
  await page.goto('http://localhost:4200/home');

  // 2. Login-Icon (👤) klicken – hat class="User"
  await page.locator('button.User').click();

  // 3. Login-Formular ausfüllen
  await page.getByPlaceholder('Name').fill('admin');
  await page.getByPlaceholder('Passwort').fill('p');
  await page.locator('button.btn-primary:has-text("Login")').click();

  await page.waitForSelector('button.btn-outline-primary');

  await expect(page.locator('text=admin')).toBeVisible();
  await page.screenshot({
    path: 'screenshots/resultlogin.png',
    fullPage: true,
  });
});
