import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { preview, browserOptions } from './preview.mjs';

const server = await preview(4176);
let browser;
try {
  browser = await chromium.launch(browserOptions());
  const page = await browser.newPage();
  await page.goto(server.url + '/curriculo.html', { waitUntil: 'networkidle' });
  await page.pdf({
    path: fileURLToPath(new URL('../Portfólio/meuPortfolio/assets/curriculo-jose-rafael.pdf', import.meta.url)),
    format: 'A4', preferCSSPageSize: true, printBackground: true, tagged: true,
  });
  console.log('Currículo PDF atualizado a partir de curriculo.html.');
} finally {
  await browser?.close();
  server.close();
}
