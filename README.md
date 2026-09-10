# Clínica Veterinária — modelo white label

Modelo white label para clínicas veterinárias. Quente, arredondado, conduzido por foto.

Site **100% estático**: HTML, CSS e um JavaScript sem dependências. Sem build,
sem npm, sem backend. Publica direto no GitHub Pages.

---

## Personalizar para um cliente (o único passo obrigatório)

Edite **`js/brand.js`**. Nada mais. Esse arquivo controla nome, cores, fontes,
contato, textos, serviços, equipe, depoimentos, dúvidas e rodapé — inclusive os
rótulos dos formulários e as opções dos campos de seleção.

```js
window.BRAND = {
  nome: 'Nome do Cliente',
  sigla: 'NC',                 // duas letras dentro do quadrado do logo

  tema: {                      // vira CSS var de mesmo nome: --primary etc.
    'primary':       '#0e7c6b',
    'primary-hover': '#0a6357',
    'primary-soft':  '#dff2ee'
  },

  contato: {
    whatsapp: '+55 51 99999-0000',   // qualquer formato; o código normaliza
    telefone: '+55 51 3333-0000',
    email:    'contato@cliente.com.br',
    endereco: 'Rua Exemplo, 100 — Bairro, Cidade/UF'
  },
  // ...
};
```

Trocar `tema.primary` re-tematiza a página inteira, incluindo botões, ícones,
foco de teclado e destaques.

### Trocar as imagens

Substitua os arquivos em `assets/` mantendo os nomes:

| Arquivo | Onde aparece |
|---|---|
| `favicon.svg` | aba do navegador |
| `hero-1..3.svg`, `hero-wide.svg` | área principal |
| `card-1..6.svg` | cartões de conteúdo |
| `equipe-1..4.svg` | fotos da equipe |

Os SVGs atuais são espaços reservados gerados localmente. Pode trocar por
`.webp` ou `.jpg` — nesse caso ajuste a extensão nos caminhos dentro de
`js/brand.js` (equipe e cartões) e no `index.html` (hero).

---

## Publicar no GitHub Pages

1. Crie o repositório no GitHub e faça push da branch `main`.
2. No repositório: **Settings › Pages › Source: GitHub Actions**.
3. O fluxo em `.github/workflows/pages.yml` publica a cada push.

O site sobe em `https://<usuario>.github.io/<repositorio>/`.

Como todos os caminhos são relativos (`css/...`, `js/...`, `assets/...`),
funciona tanto em subpasta quanto em domínio próprio — não precisa de
`basePath`.

Para domínio próprio: crie um arquivo `CNAME` na raiz com o domínio e aponte
o DNS para o GitHub Pages.

---

## Rodar localmente

Abrir o `index.html` direto no navegador funciona. Para ficar igual à
produção:

```bash
npx --yes serve .
```

---

## Estrutura

```
index.html          marcação + sprite de ícones SVG embutido
css/tokens.css      design tokens do vertical (cores, tipografia, espaço, forma)
css/base.css        reset e primitivas compartilhadas (idêntico nos 4 modelos)
css/site.css        componentes específicos deste vertical
js/brand.js         >>> único arquivo a editar por cliente <<<
js/app.js           motor de white label (idêntico nos 4 modelos)
assets/             imagens e favicon
.nojekyll           impede o Jekyll de ignorar arquivos
```

**Seções da página:** hero com colagem, serviços, números, equipe, depoimentos, faixa de emergência, horários, dúvidas e formulário.

---

## Como o motor funciona

`js/app.js` lê `window.BRAND` e preenche a página:

| Atributo no HTML | Efeito |
|---|---|
| `data-b="hero.subtitulo"` | escreve o texto daquele caminho no elemento |
| `data-bhtml="hero.tituloHtml"` | o mesmo, aceitando HTML (`<em>`, `<br>`) |
| `data-battr="href:_links.whatsapp"` | define atributos; `_links` são links prontos |
| `data-list="servicos.itens"` | repete o `<template>` interno para cada item |
| `data-list-options="busca.tipos"` | preenche um `<select>` |
| `data-year` | ano corrente no rodapé |

Dentro de um `<template>`, use `{{campo}}`, `{{campo.sub}}`, `{{.}}`
(item simples), `{{@index}}` e `{{#pad}}` (01, 02, …).

**Links automáticos** montados a partir de `contato`: `_links.whatsapp`,
`_links.telefone`, `_links.email` e `_links.mapa`.

### Suporte a vários idiomas (opcional)

O motor é o mesmo do site institucional da R&L, que é multilíngue. Para deixar
este modelo em mais de um idioma, crie um `js/i18n.js` com
`window.I18N = { pt: {...}, en: {...} }`, carregue-o **antes** do
`js/app.js` e adicione os botões `<button data-lang-btn="en">`. Sem esse
arquivo, o site funciona normalmente em um idioma só.

---

## Formulários

O GitHub Pages não executa backend. Os formulários validam os campos, mostram
o erro ao lado de cada um, colocam o foco no primeiro campo inválido e abrem o
**WhatsApp** do cliente com a mensagem pronta (ou o e-mail, se não houver
WhatsApp configurado). Nenhum dado é armazenado ou enviado a terceiros.

Para receber por e-mail com backend, troque `bindForm` em `js/app.js` por um
endpoint de Formspree, Basin ou similar.

---

## Acessibilidade e desempenho

- Marcos semânticos, link de pular conteúdo e foco visível em todo elemento interativo.
- `prefers-reduced-motion` respeitado: as animações desligam.
- Menu do celular controlado por `aria-expanded`, fechável com `Esc`.
- Alvos de toque de no mínimo 44 px e nenhum rolamento horizontal em 390 px de largura.
- Campos com `autocomplete`, `inputmode` e validação com mensagem ao lado.
- Zero dependências em tempo de execução. Ícones em SVG embutido, sem biblioteca.
- Imagens com `width` e `height` para evitar deslocamento de layout.

Revisado contra o
[Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)
da Vercel.

---

## Créditos de direção visual

Sistema de design adaptado (não copiado) de **airbnb**, via
[awesome-design-md](https://github.com/voltagent/awesome-design-md). Foram
reaproveitadas a estrutura da escala tipográfica, o ritmo de espaçamento e a
linguagem de raio e movimento — nunca cores de marca, logotipos ou ativos de
terceiros.
