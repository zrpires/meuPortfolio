'use strict';

// Content is already present in the HTML; JavaScript only enhances interaction.
const translated = Array.from(document.querySelectorAll('[data-en]'), element => ({
  element,
  pt: element.textContent,
  en: element.dataset.en,
}));
const translatedLabels = Array.from(document.querySelectorAll('[data-en-aria]'), element => ({
  element, pt: element.getAttribute('aria-label'), en: element.dataset.enAria,
}));
const toggle = document.querySelector('#language-toggle');
let language = 'pt';

function setLanguage(next) {
  language = next === 'en' ? 'en' : 'pt';
  document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  translated.forEach(({ element, pt, en }) => { element.textContent = language === 'en' ? en : pt; });
  translatedLabels.forEach(({ element, pt, en }) => { element.setAttribute('aria-label', language === 'en' ? en : pt); });
  if (toggle) {
    toggle.textContent = language === 'en' ? 'PT' : 'EN';
    toggle.setAttribute('aria-label', language === 'en' ? 'Mudar para português' : 'Switch to English');
  }
  if (toggle) document.title = language === 'en'
    ? 'José Rafael | Junior full-stack developer'
    : 'José Rafael | Desenvolvedor full-stack júnior';
  try { localStorage.setItem('portfolio-language', language); } catch { /* Translation also works without storage. */ }
}

if (toggle) {
  toggle.hidden = false;
  try { if (localStorage.getItem('portfolio-language') === 'en') setLanguage('en'); } catch { /* Keep the static Portuguese page. */ }
  toggle.addEventListener('click', () => setLanguage(language === 'pt' ? 'en' : 'pt'));
}

// Observe sections rather than doing layout work on every scroll event.
if ('IntersectionObserver' in window) {
  const navigation = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navigation.forEach(link => {
      if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -50% 0px' });
  navigation.forEach(link => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) observer.observe(section);
  });
}

const terminalForm = document.querySelector('#terminal-form');
if (terminalForm) {
  const input = document.querySelector('#terminal-input');
  const output = document.querySelector('#terminal-output');
  const commands = [];
  let index = 0;
  const aliases = { whoami: 'perfil', profile: 'perfil', skills: 'stack', projects: 'projetos', contact: 'contato', clear: 'limpar' };
  const responses = {
    pt: {
      help: 'perfil · stack · projetos · contato · limpar\nTambém aceito: whoami, skills, projects, contact e clear.',
      perfil: 'José Rafael Pires de Souza. Busco uma oportunidade full-stack júnior. ADS em conclusão na UniCesumar; experiência em operações e e-commerce.',
      stack: 'Nos projetos: HTML, CSS, JavaScript, Node.js, Java, Git e Vercel.\nEm estudos: React, Spring Boot, SQL e Python.',
      projetos: 'Várzuno — peladas, sorteio equilibrado, estatísticas e PostgreSQL.\nLojaDoZe — catálogo, carrinho e integração Stripe.\nAssistDoZe — tarefas, despesas e backups.\nIaAudio — chat por voz e texto.\nJogo da memória — experiência web com foco em acessibilidade.\nLinks e detalhes na seção Projetos.',
      contato: 'E-mail: joseraffael2003@gmail.com\nGitHub: github.com/zrpires\nLinkedIn: linkedin.com/in/zrpires',
      unknown: 'Comando não encontrado. Digite help para conhecer as opções.',
    },
    en: {
      help: 'profile · skills · projects · contact · clear\nPortuguese aliases are also supported.',
      perfil: 'José Rafael Pires de Souza. Seeking a junior full-stack role. Completing a Systems Analysis degree at UniCesumar; background in operations and e-commerce.',
      stack: 'In projects: HTML, CSS, JavaScript, Node.js, Java, Git and Vercel.\nStudying: React, Spring Boot, SQL and Python.',
      projetos: 'Várzuno — football groups, balanced teams, statistics and PostgreSQL.\nLojaDoZe — catalog, cart and Stripe integration.\nAssistDoZe — tasks, expenses and backups.\nIaAudio — voice and text chat.\nMemory game — accessibility-focused web experience.\nSee the Projects section for links and details.',
      contato: 'Email: joseraffael2003@gmail.com\nGitHub: github.com/zrpires\nLinkedIn: linkedin.com/in/zrpires',
      unknown: 'Unknown command. Type help to see the available options.',
    },
  };
  function append(text, className = '') {
    const line = document.createElement('p');
    line.textContent = text;
    if (className) line.className = className;
    output.append(line);
    // Keep this optional interaction bounded, even after a long session.
    while (output.childElementCount > 60) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight;
  }
  terminalForm.addEventListener('submit', event => {
    event.preventDefault();
    const raw = input.value.trim().slice(0, 160);
    if (!raw) return;
    input.value = '';
    commands.push(raw);
    if (commands.length > 30) commands.shift();
    index = commands.length;
    const name = raw.toLowerCase();
    const command = aliases[name] || name;
    if (command === 'limpar') { output.replaceChildren(); return; }
    append(`$ ${raw}`, 'command');
    append(Object.hasOwn(responses[language], command) ? responses[language][command] : responses[language].unknown);
  });
  input.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    index = Math.max(0, Math.min(commands.length, index + (event.key === 'ArrowUp' ? -1 : 1)));
    input.value = commands[index] || '';
  });
}

document.querySelector('#print-resume')?.addEventListener('click', () => window.print());
