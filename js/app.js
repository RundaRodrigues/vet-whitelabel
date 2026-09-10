/* ============================================================
   app.js — motor white-label
   Não edite este arquivo para personalizar um cliente.
   A personalização vive em js/brand.js (configuração) e,
   quando o site é multilíngue, em js/i18n.js (textos).
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = window.BRAND || window.BRAND_CONFIG;
  var I18N = window.I18N || null;

  if (!CONFIG) {
    console.error('[white-label] js/brand.js não foi carregado antes de js/app.js');
    return;
  }

  var STORE_LANG = 'wl.lang';
  var STORE_THEME = 'wl.theme';

  var B;        // objeto ativo: configuração + textos do idioma atual
  var langAtual;

  /* ---------- helpers ---------- */

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function digits(s) { return String(s || '').replace(/\D/g, ''); }

  // Lê "contato.whatsapp" dentro do objeto ativo.
  function get(path) {
    return path.split('.').reduce(function (acc, key) {
      if (acc === null || acc === undefined) return undefined;
      return acc[key];   // aceita índice numérico: servicos.itens.0.titulo
    }, B);
  }

  // Mescla os textos do idioma sobre a configuração, sem alterar os originais.
  // Arrays são mesclados posição a posição: assim js/brand.js guarda o que
  // não traduz (ícone, foto, url) e js/i18n.js guarda só o texto.
  function merge(base, over) {
    if (Array.isArray(base) && Array.isArray(over)) {
      return over.map(function (item, i) {
        var b = base[i];
        return (b && item && typeof b === 'object' && typeof item === 'object')
          ? merge(b, item)
          : item;
      });
    }
    var out = Object.assign({}, base);
    Object.keys(over || {}).forEach(function (k) {
      var a = out[k], b = over[k];
      out[k] = (a && b && typeof a === 'object' && typeof b === 'object')
        ? merge(a, b)
        : b;
    });
    return out;
  }

  // Substitui {{campo}} e {{campo.sub}} num trecho de HTML do <template>.
  function fill(tpl, item, index) {
    return tpl.replace(/\{\{\s*([\w.@#]+)\s*\}\}/g, function (_, key) {
      if (key === '.') return esc(item);          // lista de strings simples
      if (key === '@index') return String(index);
      if (key === '@n') return String(index + 1);
      if (key === '#pad') return String(index + 1).padStart(2, '0');
      var val = key.split('.').reduce(function (acc, k) {
        return acc == null ? undefined : acc[k];
      }, item);
      // Campos terminados em Html vão crus (permitem <em>, <br>).
      return /Html$/.test(key) ? String(val == null ? '' : val) : esc(val);
    });
  }

  /* ---------- idioma ---------- */

  function idiomasDisponiveis() { return I18N ? Object.keys(I18N) : []; }

  function idiomaInicial() {
    if (!I18N) return null;
    var salvo = null;
    try { salvo = localStorage.getItem(STORE_LANG); } catch (e) { /* modo privado */ }
    if (salvo && I18N[salvo]) return salvo;

    // Detecta pelo navegador, nunca por IP.
    var pref = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < pref.length; i++) {
      var codigo = String(pref[i]).slice(0, 2).toLowerCase();
      if (I18N[codigo]) return codigo;
    }
    return idiomasDisponiveis()[0];
  }

  function definirIdioma(lang, rerenderizar) {
    if (!I18N || !I18N[lang]) return;
    langAtual = lang;
    try { localStorage.setItem(STORE_LANG, lang); } catch (e) { /* ignora */ }

    B = merge(CONFIG, I18N[lang]);
    document.documentElement.lang = (I18N[lang].meta && I18N[lang].meta.htmlLang) || lang;

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var ativo = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('is-active', ativo);
      btn.setAttribute('aria-pressed', String(ativo));
    });

    if (rerenderizar) renderizar(true);
  }

  /* ---------- tema claro / escuro ---------- */

  function temaInicial() {
    var salvo = null;
    try { salvo = localStorage.getItem(STORE_THEME); } catch (e) { /* ignora */ }
    if (salvo === 'light' || salvo === 'dark') return salvo;
    // Sem escolha salva, segue o sistema operacional.
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function definirTema(tema, salvar) {
    document.documentElement.setAttribute('data-theme', tema);
    if (salvar) {
      try { localStorage.setItem(STORE_THEME, tema); } catch (e) { /* ignora */ }
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var cor = getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim();
      if (cor) meta.setAttribute('content', cor);
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      var escuro = tema === 'dark';
      btn.setAttribute('aria-pressed', String(escuro));
      var rotulo = get('ui.' + (escuro ? 'temaClaro' : 'temaEscuro'));
      btn.setAttribute('aria-label', rotulo || (escuro ? 'Ativar tema claro' : 'Ativar tema escuro'));
      btn.setAttribute('title', btn.getAttribute('aria-label'));
    });
  }

  function initTema() {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    // Sem botão na página, o site tem um tema fixo: não mexemos em nada.
    if (!btns.length) return;

    definirTema(temaInicial(), false);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var atual = document.documentElement.getAttribute('data-theme');
        definirTema(atual === 'dark' ? 'light' : 'dark', true);
      });
    });
    // Enquanto a pessoa não escolher manualmente, acompanha o sistema.
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      var salvo = null;
      try { salvo = localStorage.getItem(STORE_THEME); } catch (err) { /* ignora */ }
      if (!salvo) definirTema(e.matches ? 'light' : 'dark', false);
    });
  }

  /* ---------- tema da marca e links ---------- */

  function aplicarCores() {
    var root = document.documentElement;
    var t = B.tema || {};
    Object.keys(t).forEach(function (k) { root.style.setProperty('--' + k, t[k]); });
    if (B.fontes) {
      if (B.fontes.display) root.style.setProperty('--font-display', B.fontes.display);
      if (B.fontes.corpo) root.style.setProperty('--font-body', B.fontes.corpo);
    }
  }

  function montarLinks() {
    var c = B.contato || {};
    var wa = digits(c.whatsapp);
    B._links = {
      whatsapp: wa
        ? 'https://wa.me/' + wa + '?text=' + encodeURIComponent(c.mensagemWhatsapp || 'Olá! Vim pelo site.')
        : '#contato',
      telefone: c.telefone ? 'tel:+' + digits(c.telefone) : '#contato',
      email: c.email ? 'mailto:' + c.email : '#contato',
      mapa: c.endereco
        ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.endereco)
        : '#contato'
    };
  }

  /* ---------- binds ---------- */

  function bindText() {
    document.querySelectorAll('[data-b]').forEach(function (el) {
      var v = get(el.getAttribute('data-b'));
      if (v !== undefined && v !== null) el.textContent = v;
    });
    document.querySelectorAll('[data-bhtml]').forEach(function (el) {
      var v = get(el.getAttribute('data-bhtml'));
      if (v !== undefined && v !== null) el.innerHTML = v;
    });
  }

  function bindAttrs() {
    // data-battr="href:_links.whatsapp, aria-label:nome"
    document.querySelectorAll('[data-battr]').forEach(function (el) {
      el.getAttribute('data-battr').split(',').forEach(function (par) {
        var i = par.indexOf(':');
        if (i < 0) return;
        var attr = par.slice(0, i).trim();
        var caminho = par.slice(i + 1).trim();
        var v = caminho.indexOf('_links.') === 0 ? B._links[caminho.slice(7)] : get(caminho);
        if (v !== undefined && v !== null) el.setAttribute(attr, v);
      });
    });
  }

  // Guarda o <template> original: na troca de idioma o host é reescrito.
  var templates = new WeakMap();

  function bindLists() {
    document.querySelectorAll('[data-list]').forEach(function (host) {
      var tpl = templates.get(host);
      if (tpl === undefined) {
        var el = host.querySelector('template');
        if (!el) return;
        tpl = el.innerHTML;
        templates.set(host, tpl);
      }
      var itens = get(host.getAttribute('data-list'));
      if (!Array.isArray(itens)) return;
      var limite = parseInt(host.getAttribute('data-limit') || '0', 10);
      var lista = limite > 0 ? itens.slice(0, limite) : itens;
      host.innerHTML = lista.map(function (item, i) { return fill(tpl, item, i); }).join('');
    });
  }

  function bindOptions() {
    document.querySelectorAll('[data-list-options]').forEach(function (sel) {
      var itens = get(sel.getAttribute('data-list-options'));
      if (!Array.isArray(itens)) return;
      var vazio = sel.getAttribute('data-placeholder');
      sel.innerHTML =
        (vazio ? '<option value="">' + esc(vazio) + '</option>' : '') +
        itens.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('');
    });
  }

  // Esteira infinita: duplica o conteúdo para o laço não ter emenda.
  function initMarquee() {
    document.querySelectorAll('[data-marquee]').forEach(function (track) {
      track.insertAdjacentHTML('beforeend', track.innerHTML);
    });
  }

  /* ---------- comportamento de interface ---------- */

  function initNav() {
    var btn = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');
    if (!btn || !menu) return;

    // A visibilidade é responsabilidade do CSS (no desktop o menu é permanente).
    // Aqui só mexemos em estado, nunca em [hidden], para não brigar com o media query.
    function abrir(estado) {
      document.body.classList.toggle('nav-open', estado);
      menu.classList.toggle('is-open', estado);
      btn.setAttribute('aria-expanded', String(estado));
      var rotulo = get('ui.' + (estado ? 'fecharMenu' : 'abrirMenu'));
      btn.setAttribute('aria-label', rotulo || (estado ? 'Fechar menu' : 'Abrir menu'));
    }
    abrir(false);

    btn.addEventListener('click', function () {
      abrir(btn.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) abrir(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') abrir(false);
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
      if (e.matches) abrir(false);
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var aoRolar = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
  }

  function initReveal(imediato) {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (imediato ||
        !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-visible');
        io.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Delegado: sobrevive à troca de idioma, que recria os itens do FAQ.
  function initAccordions() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-accordion] .faq-q');
      if (!btn) return;
      var item = btn.closest('.faq-item');
      var aberto = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(aberto));
    });
  }

  function initLangSwitch() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        definirIdioma(btn.getAttribute('data-lang-btn'), true);
      });
    });
  }

  /* ---------- formulário ---------- */

  function mostrarErro(campo, msg) {
    var wrap = campo.closest('.field');
    if (!wrap) return;
    wrap.classList.add('has-error');
    var slot = wrap.querySelector('.field-error');
    if (!slot) {
      slot = document.createElement('p');
      slot.className = 'field-error';
      slot.id = (campo.id || 'campo') + '-erro';
      wrap.appendChild(slot);
    }
    slot.textContent = msg;
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', slot.id);
  }

  function limparErro(campo) {
    var wrap = campo.closest('.field');
    if (wrap) wrap.classList.remove('has-error');
    campo.removeAttribute('aria-invalid');
    campo.removeAttribute('aria-describedby');
  }

  function validar(form) {
    var msgs = (B.ui && B.ui.erros) || {};
    var primeiro = null;
    form.querySelectorAll('input, textarea, select').forEach(function (c) {
      limparErro(c);
      var v = String(c.value || '').trim();
      var erro = '';
      if (c.hasAttribute('required') && !v) {
        erro = msgs.obrigatorio || 'Preencha este campo para continuar.';
      } else if (v && c.type === 'tel' && digits(v).length < 10) {
        erro = msgs.telefone || 'Informe DDD e número, ex.: (11) 99999-0000.';
      } else if (v && c.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        erro = msgs.email || 'Confira o e-mail, ex.: nome@dominio.com.br.';
      }
      if (erro) {
        mostrarErro(c, erro);
        if (!primeiro) primeiro = c;
      }
    });
    return primeiro;
  }

  function bindForm(form) {
    form.addEventListener('input', function (e) {
      if (e.target.closest('.field.has-error')) limparErro(e.target);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msgs = (B.ui && B.ui.erros) || {};
      var status = form.querySelector('[data-form-status]');

      var invalido = validar(form);
      if (invalido) {
        if (status) status.textContent = msgs.revisar || 'Confira os campos destacados abaixo.';
        invalido.focus();
        return;
      }

      var linhas = [];
      new FormData(form).forEach(function (valor, chave) {
        if (String(valor).trim()) linhas.push(chave + ': ' + valor);
      });

      var c = B.contato || {};
      var wa = digits(c.whatsapp);
      // data-form-title aponta para um título próprio daquele formulário;
      // sem ele, usa o título geral do contato.
      var chaveTitulo = form.getAttribute('data-form-title');
      var titulo = (chaveTitulo && get(chaveTitulo)) || c.tituloMensagem || 'Contato pelo site';
      var texto = titulo + '\n\n' + linhas.join('\n');

      if (wa) {
        window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        if (status) status.textContent = msgs.enviadoWhatsapp || 'Abrimos o WhatsApp com sua mensagem pronta. É só enviar.';
      } else if (c.email) {
        window.location.href = 'mailto:' + c.email +
          '?subject=' + encodeURIComponent(titulo) +
          '&body=' + encodeURIComponent(texto);
        if (status) status.textContent = msgs.enviadoEmail || 'Abrimos seu e-mail com a mensagem pronta.';
      } else if (status) {
        status.textContent = 'Configure contato.whatsapp ou contato.email em js/brand.js.';
      }
    });
  }

  function initForms() {
    document.querySelectorAll('[data-form]').forEach(bindForm);
  }

  function initMeta() {
    var seo = B.seo || {};
    if (seo.titulo) document.title = seo.titulo;
    else if (B.nome) document.title = B.nome + (B.tagline ? ' — ' + B.tagline : '');

    var desc = document.querySelector('meta[name="description"]');
    if (desc && seo.descricao) desc.setAttribute('content', seo.descricao);

    var og = document.querySelector('meta[property="og:description"]');
    if (og && seo.descricao) og.setAttribute('content', seo.descricao);

    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- render ---------- */

  function renderizar(trocaDeIdioma) {
    aplicarCores();
    montarLinks();
    bindLists();      // listas primeiro: os itens novos também recebem os binds abaixo
    bindOptions();
    initMarquee();
    bindText();
    bindAttrs();
    initMeta();

    // Rótulos assistivos que não são texto visível precisam seguir o idioma.
    var tema = document.documentElement.getAttribute('data-theme');
    if (tema) definirTema(tema, false);

    var navBtn = document.querySelector('[data-nav-toggle]');
    if (navBtn) {
      var aberto = navBtn.getAttribute('aria-expanded') === 'true';
      var rotulo = get('ui.' + (aberto ? 'fecharMenu' : 'abrirMenu'));
      if (rotulo) navBtn.setAttribute('aria-label', rotulo);
    }

    // Ao trocar de idioma o conteúdo já estava visível: não reanima.
    initReveal(trocaDeIdioma === true);
  }

  /* ---------- boot ---------- */

  if (I18N) {
    definirIdioma(idiomaInicial(), false);
  } else {
    B = CONFIG;
  }

  renderizar(false);
  initTema();
  initNav();
  initHeaderScroll();
  initAccordions();
  initLangSwitch();
  initForms();

  document.documentElement.classList.add('brand-ready');
})();
