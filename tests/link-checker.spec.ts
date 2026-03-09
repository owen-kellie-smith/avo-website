import { test, expect } from '@playwright/test';


test('internal links and assets are valid', async ({ page }) => {
  const visited = new Set<string>();
  const queue = ['/'];

  while (queue.length) {
    const path = queue.pop()!;
    if (visited.has(path)) continue;
    visited.add(path);

    const response = await page.goto(path);
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);

    // collect links
    const links = await page.$$eval('a[href]', as =>
      as.map(a => a.getAttribute('href'))
    );

    // collect images
    const images = await page.$$eval('img[src]', imgs =>
      imgs.map(i => i.getAttribute('src'))
    );

    const urls = [...links, ...images];

    for (const href of urls) {
      if (!href) continue;

      if (
        href.startsWith('/') ||
        href.endsWith('.html') ||
        href.endsWith('.pdf') ||
        href.endsWith('.jpg') ||
        href.endsWith('.png') ||
        href.endsWith('.svg')
      ) {
        const next = href.startsWith('/') ? href : '/' + href;

        if (!visited.has(next)) {
          queue.push(next);
        }
      }
    }
  }
});
