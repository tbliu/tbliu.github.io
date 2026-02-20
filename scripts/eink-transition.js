// E-ink screen refresh effect on same-origin navigation
(function () {
  const BG = '#EDECEA';
  const FG = '#1c364e';

  const reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let animating = false;

  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    pointerEvents: 'none',
    opacity: '0',
    backgroundColor: BG,
    transition: 'none',
  });
  document.documentElement.appendChild(overlay);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const raf = () => new Promise((r) => requestAnimationFrame(r));

  async function preNavRefresh() {
    // Phase 1: invert the actual page content (negative)
    document.documentElement.classList.add('eink-invert');
    await sleep(150);

    // Phase 2: full black flash
    document.documentElement.classList.remove('eink-invert');
    overlay.style.transition = 'none';
    overlay.style.backgroundColor = FG;
    overlay.style.opacity = '1';
    await raf();
    await sleep(180);

    // Phase 3: full white flash (slightly longer, like real e-ink)
    overlay.style.transition = 'none';
    overlay.style.backgroundColor = BG;
    overlay.style.opacity = '1';
    await raf();
    await sleep(250);
  }

  async function postLoadReveal() {
    const marker = sessionStorage.getItem('eink:navigating');
    if (!marker) return;
    sessionStorage.removeItem('eink:navigating');

    // Start with white overlay covering new page
    overlay.style.transition = 'none';
    overlay.style.backgroundColor = BG;
    overlay.style.opacity = '1';
    await raf();

    // Fade out to reveal new content
    if (!reduceMotion) {
      overlay.style.transition = 'opacity 350ms ease-out';
      overlay.style.opacity = '0';
      await sleep(380);
    } else {
      overlay.style.opacity = '0';
    }
  }

  // Reveal on page load (for the newly navigated page)
  window.addEventListener('pageshow', () => {
    postLoadReveal().catch(() => {});
  });

  async function flashAndNavigate(href) {
    if (animating) return;
    animating = true;

    if (reduceMotion) {
      overlay.style.transition = 'none';
      overlay.style.backgroundColor = BG;
      overlay.style.opacity = '1';
      sessionStorage.setItem('eink:navigating', '1');
      await sleep(60);
      window.location.href = href;
      return;
    }

    await preNavRefresh();
    sessionStorage.setItem('eink:navigating', '1');
    window.location.href = href;
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (link.target === '_blank') return;
    if (link.hasAttribute('download')) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

    try {
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
    } catch {
      return;
    }

    e.preventDefault();
    flashAndNavigate(href).catch(() => {
      window.location.href = href;
    });
  });
})();
