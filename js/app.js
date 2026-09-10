/* ============================================================
   app.js — motor white-label
   Nao edite este arquivo para personalizar um cliente.
   Toda a personalizacao vive em js/brand.js
   ============================================================ */
(function () {
  'use strict';

  var B = window.BRAND;
  if (!B) {
    console.error('[white-label] js/brand.js nao foi carregado antes de js/app.js');
    return;
  }

  /* ---------- helpers ---------- */

  // Le "contato.whatsapp" dentro do objeto BRAND.
  function get(path) {
    return path.split('.').reduce(function (acc, key) {
      if (acc === null || acc === undefined) return undefined;
      // suporta indice numerico: servicos.0.titulo
      return acc[key];
    }, B);
  }

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Substitui {{campo}} e {{campo.sub}} num trecho de HTML do <template>.
  function fill(tpl, item, index) {
    return tpl.replace(/\{\{\s*([\w.@#]+)\s*\}\}/g, function (_, key) {
      // {{.}} = o proprio item, quando a lista e de strings simples
      if (key === '.') return esc(item);
      if (key === '@index') return String(index);
      if (key === '@n') return String(index + 1);
      if (key === '#pad') return String(index + 1).padStart(2, '0');
      var val = key.split('.').reduce(function (acc, k) {
        return acc == null ? undefined : acc[k];
      }, item);
      // Campos terminados em Html vao crus (permite <br>, <strong>).
      return /Html$/.test(key) ? String(val == null ? '' : val) : esc(val);
    });
  }

  function digits(s) { return String(s || '').replace(/\D/g, ''); }

  /* ---------- 1. tema: injeta as cores do cliente como CSS vars ---------- */

  function applyTheme() {
    var root = document.documentElement;
    var t = B.tema || {};
    Object.keys(t).forEach(function (k) {
      root.style.setProperty('--' + k, t[k]);
    });
    if (B.fontes) {
      if (B.fontes.display) root.style.setProperty('--font-display', B.fontes.display);
      if (B.fontes.corpo) root.style.setProperty('--font-body', B.fontes.corpo);
    }
  }

  /* ---------- 2. links prontos de contato ---------- */

  function buildLinks() {
    var c = B.contato || {};
    var wa = digits(c.whatsapp);
    B._links = {
      whatsapp: wa
        ? 'https://wa.me/' + wa + '?text=' + encodeURIComponent(c.mensagemWhatsapp || 'Ola! Vim pelo site.')
        : '#contato',
      telefone: c.telefone ? 'tel:+' + digits(c.telefone) : '#contato',
      email: c.email ? 'mailto:' + c.email : '#contato',
      mapa: c.endereco
        ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.endereco)
        : '#contato'
    };
  }

  /* ---------- 3. binds de texto, atributo e lista ---------- */

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
      el.getAttribute('data-battr').split(',').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i < 0) return;
        var attr = pair.slice(0, i).trim();
        var path = pair.slice(i + 1).trim();
        var v = path.indexOf('_links.') === 0
          ? B._links[path.slice(7)]
          : get(path);
        if (v !== undefined && v !== null) el.setAttribute(attr, v);
      });
    });
  }

  function bindLists() {
    document.querySelectorAll('[data-list]').forEach(function (host) {
      var items = get(host.getAttribute('data-list'));
      var tplEl = host.querySelector('template');
      if (!Array.isArray(items) || !tplEl) return;
      var tpl = tplEl.innerHTML;
      var limit = parseInt(host.getAttribute('data-limit') || '0', 10);
      var slice = limit > 0 ? items.slice(0, limit) : items;
      host.innerHTML = slice.map(function (item, i) { return fill(tpl, item, i); }).join('');
    });
  }

  // Preenche um <select> a partir de um array de strings do brand.js.
  function bindOptions() {
    document.querySelectorAll('[data-list-options]').forEach(function (sel) {
      var items = get(sel.getAttribute('data-list-options'));
      if (!Array.isArray(items)) return;
      var placeholder = sel.getAttribute('data-placeholder');
      sel.innerHTML =
        (placeholder ? '<option value="">' + esc(placeholder) + '</option>' : '') +
        items.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('');
    });
  }

  // Esteira infinita: duplica o conteudo para o loop nao ter emenda.
  // (Sem elemento [data-marquee] na pagina, nao faz nada.)
  function initMarquee() {
    document.querySelectorAll('[data-marquee]').forEach(function (track) {
      track.insertAdjacentHTML('beforeend', track.innerHTML);
    });
  }

  /* ---------- 4. comportamento de UI ---------- */

  function initNav() {
    var btn = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');
    if (!btn || !menu) return;

    // A visibilidade e responsabilidade do CSS (o menu e permanente no desktop).
    // Aqui so mexemos em estado, nunca em [hidden], para nao brigar com o media query.
    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      menu.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    setOpen(false);

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    // Se voltar para desktop com o menu aberto, destrava o scroll.
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initAccordions() {
    document.querySelectorAll('[data-accordion] .faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  // O formulario nao tem backend (GitHub Pages e estatico):
  // ele monta a mensagem e abre o WhatsApp do cliente.
  function initForm() {
    document.querySelectorAll('[data-form]').forEach(bindForm);
  }

  // Mensagem de erro ao lado do campo, nao so a borda vermelha.
  function showError(control, msg) {
    var field = control.closest('.field');
    if (!field) return;
    field.classList.add('has-error');
    var slot = field.querySelector('.field-error');
    if (!slot) {
      slot = document.createElement('p');
      slot.className = 'field-error';
      slot.id = (control.id || 'f') + '-erro';
      field.appendChild(slot);
    }
    slot.textContent = msg;
    control.setAttribute('aria-invalid', 'true');
    control.setAttribute('aria-describedby', slot.id);
  }

  function clearError(control) {
    var field = control.closest('.field');
    if (field) field.classList.remove('has-error');
    control.removeAttribute('aria-invalid');
    control.removeAttribute('aria-describedby');
  }

  // Valida na submissao e devolve o primeiro campo invalido, ou null.
  function validate(form) {
    var primeiro = null;
    form.querySelectorAll('input, textarea, select').forEach(function (c) {
      clearError(c);
      var v = String(c.value || '').trim();
      var erro = '';
      if (c.hasAttribute('required') && !v) {
        erro = 'Preencha este campo para continuar.';
      } else if (v && c.type === 'tel' && digits(v).length < 10) {
        erro = 'Informe DDD e numero, ex.: (51) 99999-0000.';
      } else if (v && c.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        erro = 'Confira o e-mail, ex.: nome@dominio.com.br.';
      }
      if (erro) {
        showError(c, erro);
        if (!primeiro) primeiro = c;
      }
    });
    return primeiro;
  }

  function bindForm(form) {
    // Limpa o erro assim que a pessoa comeca a corrigir.
    form.addEventListener('input', function (e) {
      if (e.target.closest('.field.has-error')) clearError(e.target);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var invalido = validate(form);
      var status = form.querySelector('[data-form-status]');
      if (invalido) {
        if (status) status.textContent = 'Confira os campos destacados abaixo.';
        invalido.focus();
        return;
      }

      var data = new FormData(form);
      var linhas = [];
      data.forEach(function (value, key) {
        if (String(value).trim()) linhas.push(key + ': ' + value);
      });
      var wa = digits((B.contato || {}).whatsapp);
      var texto = (B.contato && B.contato.tituloMensagem ? B.contato.tituloMensagem : 'Contato pelo site')
        + '\n\n' + linhas.join('\n');
      if (wa) {
        window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        if (status) status.textContent = 'Abrimos o WhatsApp com sua mensagem pronta. E so enviar.';
      } else if (B.contato && B.contato.email) {
        window.location.href = 'mailto:' + B.contato.email
          + '?subject=' + encodeURIComponent('Contato pelo site')
          + '&body=' + encodeURIComponent(texto);
        if (status) status.textContent = 'Abrimos seu e-mail com a mensagem pronta.';
      } else if (status) {
        status.textContent = 'Configure contato.whatsapp ou contato.email em js/brand.js.';
      }
    });
  }

  function initMeta() {
    if (B.nome) document.title = (B.seo && B.seo.titulo) || (B.nome + ' — ' + (B.tagline || ''));
    var desc = document.querySelector('meta[name="description"]');
    if (desc && B.seo && B.seo.descricao) desc.setAttribute('content', B.seo.descricao);
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- boot ---------- */

  applyTheme();
  buildLinks();
  bindLists();   // listas primeiro: os itens novos tambem recebem binds abaixo
  bindOptions();
  initMarquee();
  bindText();
  bindAttrs();
  initMeta();
  initNav();
  initHeaderScroll();
  initAccordions();
  initForm();
  initReveal();

  document.documentElement.classList.add('brand-ready');
})();
