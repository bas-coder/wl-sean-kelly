// Progressive enhancement: every chapter and its image link work without JS.
const tour = document.querySelector('[data-product-tour]');
if (tour && !tour.hasAttribute('data-tour-ready')) {
  const tabs = [...tour.querySelectorAll('[data-tour-tab]')];
  const panels = [...tour.querySelectorAll('[data-tour-panel]')];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 700px)');
  const animations = new Set();
  let selected = 0;
  let entered = false;

  function animate(element, keyframes, options) {
    if (preference.matches || !element?.animate) return null;
    const animation = element.animate(keyframes, { easing: 'cubic-bezier(.22,.68,.2,1)', ...options });
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
    return animation;
  }
  function settle() {
    animations.forEach(animation => animation.cancel());
    animations.clear();
    panels.forEach((panel, index) => { panel.hidden = index !== selected; });
  }
  function setSemantics() {
    tabs.forEach((tab, index) => {
      const active = index === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].setAttribute('aria-hidden', String(!active));
      panels[index].inert = !active;
    });
  }
  function select(index) {
    if (index === selected) return;
    const previous = selected;
    settle();
    selected = index;
    setSemantics();
    const old = panels[previous];
    const next = panels[selected];
    next.hidden = false;
    const exit = animate(old, [{ opacity: 1 }, { opacity: 0 }], { duration: 180 });
    if (exit) exit.finished.then(() => { if (selected !== previous) old.hidden = true; }).catch(() => {});
    else old.hidden = true;
    animate(next, [{ opacity: 0, translate: '0 8px' }, { opacity: 1, translate: '0 0' }], { duration: compact.matches ? 240 : 350 });
    animate(next.querySelector('.tour-spotlight'), [{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: 140, fill: 'backwards' });
  }

  tour.querySelector('.tour-tabs').setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    tab.addEventListener('click', event => { event.preventDefault(); select(index); });
    tab.addEventListener('keydown', event => {
      const destinations = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (!(event.key in destinations)) return;
      event.preventDefault();
      const next = destinations[event.key];
      select(next);
      tabs[next].focus();
    });
  });
  setSemantics();
  settle();
  tour.setAttribute('data-tour-ready', '');

  const heading = document.querySelector('#features .section-heading');
  function entrance() {
    if (entered) return;
    entered = true;
    animate(heading, [{ opacity: 0, translate: '0 16px' }, { opacity: 1, translate: '0 0' }], { duration: 550 });
    animate(panels[selected].querySelector('.tour-frame'), [
      { opacity: 0, translate: `0 ${compact.matches ? 10 : 24}px`, scale: '.985' },
      { opacity: 1, translate: '0 0', scale: '1' },
    ], { duration: compact.matches ? 420 : 650, delay: 100, fill: 'backwards' });
    animate(panels[selected].querySelector('.tour-spotlight'), [{ opacity: 0 }, { opacity: 1 }], { duration: 350, delay: 500, fill: 'backwards' });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); entrance(); }
    }, { threshold: .2 });
    observer.observe(heading);
  }
  preference.addEventListener('change', () => { if (preference.matches) settle(); });
}
