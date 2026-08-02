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
