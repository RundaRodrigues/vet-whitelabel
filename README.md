# Clinica Veterinaria — modelo white label

Modelo white label para clinicas veterinarias. Quente, arredondado, conduzido por foto.

Site **100% estatico**: HTML, CSS e um JS sem dependencias. Sem build, sem npm,
sem backend. Publica direto no GitHub Pages.

---

## Personalizar para um cliente (o unico passo obrigatorio)

Edite **`js/brand.js`**. Nada mais. Esse arquivo controla nome, cores, fontes,
contato, textos, servicos, equipe, depoimentos, FAQ e rodape.

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
    whatsapp: '+55 51 99999-0000',   // qualquer formato; o codigo normaliza
    telefone: '+55 51 3333-0000',
    email:    'contato@cliente.com.br',
    endereco: 'Rua Exemplo, 100 — Bairro, Cidade/UF'
  },
  // ...
};
```

Trocar `tema.primary` re-tematiza a pagina inteira, incluindo botoes, icones,
foco de teclado e destaques.

### Trocar as imagens

Substitua os arquivos em `assets/` mantendo os nomes:

| Arquivo | Onde aparece |
|---|---|
| `favicon.svg` | aba do navegador |
| `hero-1..3.svg`, `hero-wide.svg` | area principal |
| `card-1..6.svg` | cartoes de conteudo |
| `equipe-1..4.svg` | fotos da equipe |

Os SVGs atuais sao placeholders gerados localmente. Pode trocar por `.webp` ou
`.jpg` — nesse caso ajuste a extensao nos caminhos dentro de `js/brand.js`
(equipe e cartoes) e em `index.html` (hero).

---

## Publicar no GitHub Pages

1. Crie o repositorio no GitHub e faca push da branch `main`.
2. No repositorio: **Settings › Pages › Source: GitHub Actions**.
3. O workflow em `.github/workflows/pages.yml` publica a cada push.

O site sobe em `https://<usuario>.github.io/<repositorio>/`.

Como todos os caminhos sao relativos (`css/...`, `js/...`, `assets/...`),
funciona tanto em subpasta quanto em dominio proprio — nao precisa de `basePath`.

Para dominio proprio: crie um arquivo `CNAME` na raiz com o dominio, e aponte o
DNS para o GitHub Pages.

---

## Rodar localmente

Abrir o `index.html` direto no navegador funciona. Para ficar igual a producao:

```bash
npx --yes serve .
```

---

## Estrutura

```
index.html          marcacao + sprite de icones SVG inline
css/tokens.css      design tokens do vertical (cores, tipo, espaco, forma)
css/base.css        reset e primitivas compartilhadas (identico nos 4 modelos)
css/site.css        componentes especificos deste vertical
js/brand.js         >>> unico arquivo a editar por cliente <<<
js/app.js           motor de white label (identico nos 4 modelos)
assets/             imagens e favicon
.nojekyll           impede o Jekyll de ignorar arquivos
```

**Secoes da pagina:** hero com colagem, servicos, numeros, equipe, depoimentos, faixa de emergencia, horarios, FAQ, formulario.

---

## Como o motor funciona

`js/app.js` le `window.BRAND` e preenche a pagina:

| Atributo no HTML | Efeito |
|---|---|
| `data-b="hero.subtitulo"` | escreve o texto do caminho no elemento |
| `data-bhtml="hero.tituloHtml"` | idem, aceitando HTML (`<em>`, `<br>`) |
| `data-battr="href:_links.whatsapp"` | define atributos; `_links` sao links prontos |
| `data-list="servicos.itens"` | repete o `<template>` interno para cada item |
| `data-list-options="busca.tipos"` | preenche um `<select>` |
| `data-year` | ano corrente no rodape |

Dentro de um `<template>`, use `{{campo}}`, `{{campo.sub}}`, `{{.}}` (item
simples), `{{@index}}` e `{{#pad}}` (01, 02, ...).

**Links automaticos** montados a partir de `contato`: `_links.whatsapp`,
`_links.telefone`, `_links.email`, `_links.mapa`.

---

## Formularios

GitHub Pages nao executa backend. Os formularios montam a mensagem com os campos
preenchidos e abrem o **WhatsApp** do cliente (ou o e-mail, se nao houver
WhatsApp configurado). Nenhum dado e armazenado ou enviado a terceiros.

Para receber por e-mail com backend, troque `initForm` em `js/app.js` por um
endpoint de Formspree, Basin ou similar.

---

## Acessibilidade e performance

- Marcos semanticos, `skip link`, foco visivel em todo elemento interativo.
- `prefers-reduced-motion` respeitado: animacoes desligam.
- Menu mobile controlado por `aria-expanded`, fechavel com `Esc`.
- Zero dependencias de runtime. Icones em SVG inline, sem biblioteca.
- Imagens com `width`/`height` para evitar deslocamento de layout.

---

## Creditos de direcao visual

Sistema de design adaptado (nao copiado) de **airbnb**, via
[awesome-design-md](https://github.com/voltagent/awesome-design-md). Foram
reaproveitadas a estrutura da escala tipografica, o ritmo de espacamento e a
linguagem de raio e movimento — nunca cores de marca, logotipos ou ativos de
terceiros.
