(() => {
  'use strict';
  const config = window.ATI_SITE || {};
  for (const [key, label] of [['arxiv', 'arXiv'], ['code', 'Code']]) {
    const placeholder = document.getElementById(`${key}-resource`);
    if (!placeholder || !config[key]) continue;
    let url;
    try { url = new URL(config[key], document.baseURI); } catch { continue; }
    const samePage = url.origin === location.origin && url.pathname === location.pathname && url.search === location.search;
    if (!samePage && !['https:', 'http:'].includes(url.protocol)) continue;
    const link = document.createElement('a');
    link.className = 'button resource-button';
    link.id = `${key}-resource`;
    link.href = samePage ? (url.hash || '#top') : url.href;
    if (!samePage) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    const icon = placeholder.querySelector('.icon');
    if (icon) link.append(icon.cloneNode(true));
    const text = document.createElement('span');
    text.textContent = label;
    link.append(text);
    placeholder.replaceWith(link);
  }

})();
