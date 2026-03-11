const VALID_PAGES = ['latest', 'about', 'conductor', 'leader', 'charter', 'contact'];

const PAGE_TITLES = {
  latest:    'Axe Vale Orchestra | Latest',
  about:     'Axe Vale Orchestra',
  conductor: 'Axe Vale Orchestra - Conductor',
  leader:    'Axe Vale Orchestra - Leader',
  charter:   'Axe Vale Orchestra - Charter',
  contact:   'Axe Vale Orchestra - Contact',
};

async function loadImports(root = document) {
  const nodes = [...root.querySelectorAll('[data-import]')];

  for (const node of nodes) {
    const path = node.getAttribute('data-import');

    const response = await fetch(path);

    if (!response.ok) {
      node.innerHTML = `<!-- failed to load ${path} -->`;
      continue;
    }

    node.innerHTML = await response.text();
    node.removeAttribute('data-import');

    await loadImports(node);
  }
}

function runScripts(container) {
  container.querySelectorAll('script:not([data-redirect])').forEach(function (oldScript) {
    const newScript = document.createElement('script');
    for (const attr of oldScript.attributes) {
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

function getPageFromHash() {
  const hash = (location.hash || '').replace(/^#/, '').toLowerCase();
  return VALID_PAGES.includes(hash) ? hash : 'latest';
}

async function loadPage(page) {
  if (!VALID_PAGES.includes(page)) page = 'latest';

  if (typeof window.__pageCleanup === 'function') {
    window.__pageCleanup();
    window.__pageCleanup = null;
  }

  const main = document.getElementById('main-content');
  if (!main) return;

  if (page === 'latest') {
    const tpl = document.getElementById('page-latest');
    if (tpl) {
      main.innerHTML = '';
      main.appendChild(tpl.content.cloneNode(true));
      runScripts(main);
    }
  } else {
    try {
      const response = await fetch(page + '.html');
      if (!response.ok) {
        return loadPage('latest');
      }
      main.innerHTML = await response.text();
      runScripts(main);
    } catch (e) {
      return loadPage('latest');
    }
  }

  document.title = PAGE_TITLES[page] || 'Axe Vale Orchestra';
  markActiveMenu(page);
}

function markActiveMenu(page) {
  document.querySelectorAll('.site-menu a').forEach(function (link) {
    const href = link.getAttribute('href') || '';
    const linkPage = href.startsWith('#') ? (href.slice(1) || 'latest') : null;
    const isActive = linkPage === page;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadImports();
  initMenu();

  const initialPage = getPageFromHash();
  await loadPage(initialPage);

  window.addEventListener('hashchange', function () {
    const page = getPageFromHash();
    loadPage(page);
    const menu = document.querySelector('.site-menu');
    if (menu) menu.classList.remove('open');
  });
});
