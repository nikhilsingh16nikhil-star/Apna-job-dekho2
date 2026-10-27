(() => {
  const sidebar = document.querySelector('.admin-sidebar nav');
  const search = document.getElementById('company-search');
  const recordTable = document.getElementById('admin-table');
  const resultCount = document.getElementById('admin-company-result-count');

  document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const setActiveNavigation = () => {
    if (!sidebar) return;
    const activeSection = window.location.hash || '#overview';
    sidebar.querySelectorAll('a[href^="#"]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === activeSection);
    });
  };

  window.addEventListener('hashchange', setActiveNavigation);
  setActiveNavigation();

  const updateResultCount = () => {
    if (!recordTable || !resultCount) return;
    const visibleRows = [...recordTable.querySelectorAll('tr')].filter(row =>
      row.querySelector('td') && row.style.display !== 'none' && !row.querySelector('td[colspan]')
    );
    const noData = recordTable.querySelector('td[colspan]');
    resultCount.textContent = noData
      ? '0 companies'
      : `${visibleRows.length} ${visibleRows.length === 1 ? 'company' : 'companies'}`;
  };

  if (search && recordTable) {
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      recordTable.querySelectorAll('tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
      updateResultCount();
    });
  }

  if (recordTable) {
    new MutationObserver(updateResultCount).observe(recordTable, { childList: true });
    updateResultCount();
  }

  if (recordTable) {
    recordTable.addEventListener('click', event => {
      const button = event.target.closest('[data-action="delete"]');
      if (button && !window.confirm('Delete this company from the local directory? This cannot be undone.')) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    }, true);
  }

  if (recordTable && typeof Storage !== 'undefined') {
    window.addEventListener('storage', event => {
      if (event.key === 'apnaCompanies') window.location.reload();
    });
  }
})();
