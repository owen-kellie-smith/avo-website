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

document.addEventListener('DOMContentLoaded', async () => {
  await loadImports();
  markActiveMenu();
});

document.querySelector(".menu-toggle").onclick = function(){
  document.querySelector(".site-menu").classList.toggle("open");
};
