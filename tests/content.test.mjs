import test from 'node:test';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const site = fileURLToPath(new URL('../Portfólio/meuPortfolio/', import.meta.url));
const home = readFileSync(resolve(site, 'index.html'), 'utf8');

test('all internal assets and section links resolve, including the résumé', () => {
  for (const name of ['index.html', 'curriculo.html']) {
    const html = readFileSync(resolve(site, name), 'utf8');
    const ids = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), m => m[1]));
    for (const [, href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:)/.test(href)) continue;
      if (href.startsWith('#')) assert.ok(ids.has(href.slice(1)), `Missing section ${href}`);
      else assert.ok(existsSync(resolve(site, href)), `Missing file ${href}`);
    }
  }
  assert.equal(readFileSync(resolve(site, 'assets/curriculo-jose-rafael.pdf')).subarray(0, 5).toString(), '%PDF-');
});

test('all six projects have source links and supplied Vercel links are exact', () => {
  for (const url of ['https://projetodeaudiodoze.vercel.app/', 'https://lojadoze-sigma.vercel.app/', 'https://assistdoze.vercel.app/']) assert.ok(home.includes(`href="${url}"`));
  for (const name of ['varzuno', 'IaAudio', 'LojaDoZe', 'AssistDoZe', 'teste-pratico-iniflex', 'jogo_da_memoria_acessibilidade']) assert.ok(home.includes(`https://github.com/zrpires/${name}`));
  assert.equal((home.match(/<h1\b/g) || []).length, 1);
  assert.ok(home.includes('em conclusão'));
  assert.ok(!home.includes('Previsão de Formatura'));
});

test('initial load has no third-party scripts, styles, fonts or audio', () => {
  for (const [, src] of home.matchAll(/<(?:script|img|link|audio)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
    // Canonical metadata is not a fetched resource.
    if (src === 'https://portfoliodozrpires.vercel.app/') continue;
    assert.ok(!src.startsWith('http'), `External resource ${src}`);
  }
  const script = readFileSync(resolve(site, 'app.js'), 'utf8');
  assert.ok(!/requestAnimationFrame|setInterval|\.innerHTML|\.focus\(|scrollTo\(/.test(script));
  assert.ok(!/<audio\b|<canvas\b/.test(home));
});

test('metadata and deployment entry points are present', () => {
  assert.ok(home.includes('name="description"'));
  assert.ok(home.includes('application/ld+json'));
  const hosting = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));
  assert.equal(hosting.outputDirectory, 'Portfólio/meuPortfolio');
  const structuredData = home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
  const hash = createHash('sha256').update(structuredData).digest('base64');
  assert.ok(hosting.headers[0].headers.find(header => header.key === 'Content-Security-Policy').value.includes('sha256-' + hash));
  const root = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(root.includes('Portf%C3%B3lio/meuPortfolio/'));
  for (const [, tag] of home.matchAll(/(<a\b[^>]*target="_blank"[^>]*>)/g)) assert.ok(tag.includes('noopener noreferrer'));
});
