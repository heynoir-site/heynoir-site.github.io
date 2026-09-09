/* Minimal vanilla JS — mobile nav + FAQ accordion. No deps. */
(function () {
  // Mobile burger
  const burger = document.getElementById('burger');
  const links = document.getElementById('nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // FAQ accordion
  const items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
    });
  });
})();

/* Язык: предложение, но никогда не редирект. Человек, пришедший на русскую
   страницу, не должен оказаться на английской без своего клика. */
(function () {
  var KEY = 'noir_lang';
  var here = (document.documentElement.getAttribute('lang') || 'ru').slice(0, 2);
  var other = here === 'ru' ? 'en' : 'ru';

  function remember(lang) { try { localStorage.setItem(KEY, lang); } catch (e) {} }
  function chosen() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  document.querySelectorAll('[data-lang-to]').forEach(function (a) {
    a.addEventListener('click', function () { remember(a.getAttribute('data-lang-to')); });
  });

  if (chosen()) return;

  var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
  var wants = String(prefs[0] || '').slice(0, 2).toLowerCase();
  if (!wants || wants === here) return;
  if (here === 'en' && wants !== 'ru') return;

  var COPY = {
    en: { title: 'This page is available in English', sub: 'Same site, English copy.', go: 'Read in English', close: 'Dismiss', href: '/en/' },
    ru: { title: 'Есть русская версия', sub: 'Тот же сайт, русский текст.', go: 'Читать по-русски', close: 'Закрыть', href: '/' }
  }[other];

  /* адрес берём у переключателя в шапке: на внутренней странице он ведёт
     на её же перевод, а не на главную */
  var pair = document.querySelector('[data-lang-to="' + other + '"]');
  if (pair && pair.getAttribute('href')) COPY.href = pair.getAttribute('href');

  var bar = document.createElement('div');
  bar.className = 'langbar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', COPY.title);
  bar.innerHTML =
    '<div class="langbar-tx"><b></b><i></i>' +
    '<a class="langbar-go" href="' + COPY.href + '" hreflang="' + other + '" data-lang-to="' + other + '"></a></div>' +
    '<button class="langbar-x" type="button"></button>';
  bar.querySelector('b').textContent = COPY.title;
  bar.querySelector('i').textContent = COPY.sub;
  bar.querySelector('.langbar-go').textContent = COPY.go;
  var x = bar.querySelector('.langbar-x');
  x.textContent = '×';
  x.setAttribute('aria-label', COPY.close);

  document.body.appendChild(bar);
  bar.querySelector('.langbar-go').addEventListener('click', function () { remember(other); });
  x.addEventListener('click', function () {
    remember(here);
    bar.classList.remove('in');
    setTimeout(function () { bar.remove(); }, 280);
  });

  setTimeout(function () {
    bar.classList.add('show');
    requestAnimationFrame(function () { bar.classList.add('in'); });
  }, 900);
})();
