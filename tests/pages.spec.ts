import { test, expect } from '@playwright/test';

const hashPages = [
  { path: '/',            hash: '',           label: 'latest'    },
  { path: '/#about',      hash: '#about',     label: 'about'     },
  { path: '/#contact',    hash: '#contact',   label: 'contact'   },
  { path: '/#leader',     hash: '#leader',    label: 'leader'    },
  { path: '/#conductor',  hash: '#conductor', label: 'conductor' },
  { path: '/#charter',    hash: '#charter',   label: 'charter'   },
];

for (const { path, label } of hashPages) {
  test(`${label} page loads via hash route`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('#main-content')).not.toBeEmpty();
  });
}

const redirectPages = [
  '/about.html',
  '/contact.html',
  '/leader.html',
  '/conductor.html',
  '/charter.html',
];

for (const path of redirectPages) {
  test(`${path} redirects to index`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);
    // JS redirect fires; final URL should be index.html with a hash
    await page.waitForFunction(() => location.pathname === '/' || location.pathname.endsWith('index.html'));
    await expect(page.locator('body')).toBeVisible();
  });
}

