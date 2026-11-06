# José Rafael — portfólio profissional

Portfólio voltado a oportunidades de **desenvolvimento full-stack júnior**, com projetos, decisões técnicas, experiência profissional, formação em conclusão e currículo de uma página.

**Site:** https://portfoliodozrpires.vercel.app/

**Alternativa pelo GitHub Pages:** https://zrpires.github.io/meuPortfolio/

## Projetos apresentados

| Projeto | Demonstração | Código |
| --- | --- | --- |
| LojaDoZe | [Abrir loja](https://lojadoze-sigma.vercel.app/) | [GitHub](https://github.com/zrpires/LojaDoZe) |
| AssistDoZe | [Abrir assistente](https://assistdoze.vercel.app/) | [GitHub](https://github.com/zrpires/AssistDoZe) |
| IaAudio | [Abrir agente de voz](https://projetodeaudiodoze.vercel.app/) | [GitHub](https://github.com/zrpires/IaAudio) |
| Gestão de funcionários em Java | Aplicação de console | [GitHub](https://github.com/zrpires/teste-pratico-iniflex) |
| Jogo da memória acessível | [Jogar](https://zrpires.github.io/jogo_da_memoria_acessibilidade/) | [GitHub](https://github.com/zrpires/jogo_da_memoria_acessibilidade) |

Os cartões apresentam problema, abordagem, tecnologias e limitações. Projetos pessoais não são descritos como experiência profissional ou adoção comercial. Tecnologias em estudos aparecem separadas das utilizadas nos projetos. A situação de ADS foi atualizada para **em conclusão**, conforme confirmação do titular.

## O que foi aprimorado

- Projetos e contato ganham prioridade; informações essenciais estão no HTML e funcionam sem JavaScript.
- Removidos o loop contínuo de partículas, efeitos de digitação, atrasos para revelar seções, sons pré-carregados, imagens surpresa e captura global de teclas.
- Removidas as dependências de fontes, ícones e áudio externos. A carga inicial não precisa acessar terceiros.
- Terminal preservado como interação opcional em `details`, sem iniciar sozinho, mudar o foco ou executar comandos do sistema. Entrada renderizada como texto, com histórico e saída limitados.
- Navegação por teclado, link para pular ao conteúdo, foco visível, indicação de seção e respeito a movimento reduzido.
- Tradução PT/EN com preferência persistida, que também funciona se o navegador bloquear armazenamento.
- Metadados, dados estruturados e links profissionais. Currículo em HTML e PDF com texto selecionável, sem fotografia, barras de habilidade ou layout em colunas no documento.
- Foto original organizada em `assets/`, com dimensões explícitas para evitar deslocamento de layout.

## Evidências de validação

Na revisão de **6 de novembro de 2026**:

- JavaScript da página reduzido de **18.350 para 5.998 bytes**: **67,3% menor**. Isso mede o arquivo JS, não uma melhoria percentual do tempo total de carregamento.
- `npm run check` e os quatro testes de conteúdo passaram em Node.js 22.
- Testes em Chromium passaram em **1440, 768, 390 e 320 px**, sem rolagem horizontal.
- Verificações automatizadas axe-core para WCAG 2 A/AA e WCAG 2.1 AA sem violações nos cenários testados. Não substituem avaliação manual com tecnologias assistivas.
- Tradução, persistência de idioma, conteúdo sem JavaScript, armazenamento bloqueado, terminal, histórico de comandos e download do PDF verificados.
- Sem erros JavaScript, recursos locais quebrados ou requisições de terceiros durante os testes de navegação.
- Currículo PDF: **uma página A4**, com marcação de acessibilidade e texto selecionável.
- Os três endereços Vercel fornecidos e o jogo da memória responderam HTTP 200. Isso confirma disponibilidade das páginas, não testa integralmente os aplicativos externos.

O GitHub Actions repete sintaxe, conteúdo e testes de navegador a cada push e pull request.

## Executar e testar

Requer Node.js 22.x. Não há dependência de runtime nem etapa de compilação do site.

```bash
npm ci
npm run dev
```

Abra http://127.0.0.1:4173.

```bash
npm run check
npm test
npx playwright install chromium
npm run test:e2e
```

Em Linux, se faltarem bibliotecas do navegador, use `npx playwright install --with-deps chromium`. Para usar Chromium já instalado, configure `CHROMIUM_PATH` com o caminho do executável. Essa variável é usada apenas nas ferramentas de desenvolvimento.

## Atualizar o currículo

Edite `Portfólio/meuPortfolio/curriculo.html` e gere novamente o PDF:

```bash
npm run resume:pdf
```

O comando usa Chromium/Playwright e atualiza `assets/curriculo-jose-rafael.pdf`. O próprio currículo também tem a opção de imprimir/salvar em PDF pelo navegador. Ao alterar experiências ou formação, mantenha a página principal e o currículo coerentes. Não adicione datas de conclusão, métricas de resultado ou tecnologias dominadas sem confirmação.

## Publicação

### Vercel

A pasta de origem foi preservada para manter compatibilidade com a configuração anterior.

- Se a **Root Directory** for a raiz do repositório, `vercel.json` já configura `Portfólio/meuPortfolio` como saída estática, sem build, e instala somente dependências de produção.
- Se o projeto existente apontar diretamente para **`Portfólio/meuPortfolio`**, mantenha essa opção: o diretório contém o site completo e também funciona como site estático, com saída `.` e build desativado.
- Framework: **Other**. Não há variáveis de ambiente necessárias.
- Os cabeçalhos de segurança de `vercel.json` são aplicados quando a raiz do repositório é utilizada. O servidor local os reproduz para a validação.

O `index.html` na raiz é um ponto de entrada para o GitHub Pages, que encaminha à pasta de origem. Evita duplicar o conteúdo da página.

### Metadados e segurança

O endereço canônico corresponde ao domínio existente do portfólio. Atualize os metadados ao mudar de domínio. O JSON-LD possui um hash permitido na política CSP, validado por `npm test`: ao alterar o conteúdo dessa tag, atualize também seu hash em `vercel.json`.

## Estrutura

```text
Portfólio/meuPortfolio/
  index.html          # Conteúdo profissional e projetos
  style.css           # Layout responsivo e impressão
  app.js              # Idioma, navegação e terminal opcional
  curriculo.html      # Fonte editável do currículo
  assets/
    jose-rafael.jpg
    favicon.svg
    curriculo-jose-rafael.pdf
scripts/              # Servidor local e geração do PDF
tests/               # Verificações de conteúdo e navegador
.github/workflows/    # Validação automática
index.html            # Entrada compatível com GitHub Pages
vercel.json           # Publicação estática e cabeçalhos
```
