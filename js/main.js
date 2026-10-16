(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const header = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav-menu]');

  const setExpanded = (expanded) => {
    if (!toggle || !header || !nav) {
      return;
    }

    toggle.setAttribute('aria-expanded', String(expanded));
    header.dataset.open = String(expanded);
    nav.hidden = !expanded;
  };

  if (toggle && header && nav) {
    const isMobile = window.matchMedia('(max-width: 47.999rem)');
    const syncNav = () => {
      if (isMobile.matches) {
        setExpanded(false);
      } else {
        header.dataset.open = 'true';
        nav.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
      }
    };

    toggle.addEventListener('click', () => {
      const next = toggle.getAttribute('aria-expanded') !== 'true';
      setExpanded(next);
    });

    nav.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement && isMobile.matches) {
        setExpanded(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setExpanded(false);
        toggle.focus();
      }
    });

    isMobile.addEventListener('change', syncNav);
    syncNav();
  }

  const yearNodes = document.querySelectorAll('[data-year]');
  if (yearNodes.length) {
    const year = new Date().getFullYear();
    yearNodes.forEach((node) => {
      node.textContent = String(year);
    });
  }
})();
