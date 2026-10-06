// Apply the saved theme before first paint. Storage can be disabled in private browsing.
(() => {
  let theme = 'dark';
  try { if (localStorage.getItem('bjcrum-theme') === 'light') theme = 'light'; } catch {}
  document.documentElement.classList.add(theme);
  document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
  document.documentElement.setAttribute('toggle-theme', theme);
})();
