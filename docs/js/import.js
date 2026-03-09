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

function markActiveMenu() {
  const page = document.body.dataset.page;
  if (!page) return;

  document.querySelectorAll('.site-menu a[data-page]').forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadImports();
  markActiveMenu();
  initMenu();   // ← IMPORTANT
});
