import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { preview, browserOptions } from '../scripts/preview.mjs';

const require = createRequire(import.meta.url);
const server = await preview();
let browser;
try {
  browser = await chromium.launch(browserOptions());
  const context = await browser.newContext({ reducedMotion: 'reduce', acceptDownloads: true });
  const page = await context.newPage();
  const errors = [], failed = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.route('**/__test/axe.js', route => route.fulfill({ contentType: 'text/javascript', body: readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8') }));
  page.on('response', response => { if (response.status() >= 400) failed.push(response.url()); });
  page.on('request', request => { if (!request.url().startsWith(server.url)) external.push(request.url()); });
  await page.goto(server.url, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('article.project-card').count(), 4);
  assert.equal(await page.locator('article.supporting-card').count(), 2);
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'BODY');
  assert.equal(await page.evaluate(() => scrollY), 0);
  assert.equal(await page.locator('.hero').evaluate(el => getComputedStyle(el).opacity), '1');
  console.log('PASS: immediate content, six projects and no focus/scroll hijacking');

  await page.locator('#language-toggle').click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.getByRole('heading', { name: 'Selected projects', exact: true }).waitFor();
  assert.match(await page.title(), /Junior full-stack/);
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.locator('#language-toggle').click();
  await page.getByRole('heading', { name: 'Projetos selecionados', exact: true }).waitFor();
  console.log('PASS: bilingual content and language persistence');

  await page.locator('#terminal summary').click();
  const input = page.locator('#terminal-input');
  await input.fill('<img src=x onerror="window.injected=true">');
  await page.locator('#terminal-form button').click();
  assert.equal(await page.locator('#terminal-output img').count(), 0);
  assert.equal(await page.evaluate(() => window.injected), undefined);
  await input.fill('projetos'); await input.press('Enter');
  assert.match(await page.locator('#terminal-output').textContent(), /LojaDoZe/);
  await input.press('ArrowUp'); assert.equal(await input.inputValue(), 'projetos');
  await input.fill('clear'); await input.press('Enter');
  assert.equal(await page.locator('#terminal-output').textContent(), '');
  console.log('PASS: optional terminal, safe text rendering and history');

  const downloadPromise = page.waitForEvent('download');
  await page.locator('.hero-actions a[download]').click();
  assert.equal((await downloadPromise).suggestedFilename(), 'curriculo-jose-rafael.pdf');
  await page.goto(server.url + '/curriculo.html', { waitUntil: 'networkidle' });
  assert.match(await page.locator('main').textContent(), /em conclusão/);
  assert.equal(await page.getByRole('button', { name: 'Imprimir / salvar em PDF' }).count(), 1);
  console.log('PASS: downloadable PDF and readable résumé');

  await page.goto(server.url);
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Horizontal overflow at ${width}px`);
    await page.addScriptTag({ url: server.url + '/__test/axe.js' });
    const results = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
    assert.deepEqual(results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })), [], `Accessibility at ${width}px`);
  }
  console.log('PASS: responsive layouts and automated WCAG checks at four widths');
  assert.deepEqual(errors, []); assert.deepEqual(failed, []); assert.deepEqual(external, []);
  console.log('PASS: no JavaScript errors, failed assets or third-party requests');

  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(server.url);
  assert.equal(await staticPage.locator('article.project-card').count(), 4);
  assert.equal(await staticPage.locator('#language-toggle').isVisible(), false);
  assert.equal(await staticPage.locator('a[href="mailto:joseraffael2003@gmail.com"]').count(), 1);
  await staticPage.getByRole('link', { name: 'Explorar projetos' }).click();
  assert.ok(staticPage.url().endsWith('#projetos'));
  await noJs.close();
  console.log('PASS: essential content, navigation and contact work without JavaScript');

  const locked = await browser.newContext();
  await locked.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled'); } }); });
  const lockedPage = await locked.newPage();
  await lockedPage.goto(server.url);
  await lockedPage.locator('#language-toggle').click();
  assert.equal(await lockedPage.locator('html').getAttribute('lang'), 'en');
  await locked.close();
  console.log('PASS: translation works when browser storage is blocked');
  await context.close();
} finally {
  await browser?.close();
  server.close();
}
