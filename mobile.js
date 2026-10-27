/* Apna Job Dekho — mobile helpers (menu, bottom tab bar, collapsible filters, tables) */
(function () {
  'use strict';
  var script = document.currentScript;
  var base = script && script.src ? script.src.replace(/mobile\.js.*$/, '') : '';
  var body = document.body;
  var isAdmin = body.classList.contains('admin-page');
  var path = location.pathname.split('/').pop() || 'index.html';
  var inUser = /\/user\/[^/]*$/.test(location.pathname);

  /* 1. Mobile menu: add Login/Register + portals, close on tap/escape/outside */
  var panel = document.getElementById('mobile-nav');
  var toggle = document.querySelector('.mobile-menu-toggle');
  if (panel && toggle) {
    body.classList.add('has-mobile-nav');
    var actions = document.createElement('div');
    actions.className = 'mobile-nav-actions';
    document.querySelectorAll('.header-actions > a.btn').forEach(function (a) {
      var c = a.cloneNode(true);
      c.className = 'btn ' + (/register/i.test(a.href) ? 'btn-primary' : 'btn-outline-primary');
      actions.appendChild(c);
    });
    if (actions.children.length) panel.appendChild(actions);
    var portals = document.querySelectorAll('.portal-dropdown a');
    if (portals.length) {
      var wrap = document.createElement('div');
      wrap.className = 'mobile-nav-portals';
      portals.forEach(function (a) { wrap.appendChild(a.cloneNode(true)); });
      panel.appendChild(wrap);
    }
    var icon = toggle.querySelector('i');
    var sync = function () {
      var open = panel.classList.contains('open');
      if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    var close = function () { panel.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); sync(); };
    toggle.addEventListener('click', function () { setTimeout(sync, 0); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('open') && !panel.contains(e.target) && !toggle.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 992) close(); });
  }

  /* 2. Desktop "Portals" dropdown also opens on tap */
  var pm = document.querySelector('.portal-menu');
  if (pm) {
    var pb = pm.querySelector('.portal-toggle');
    if (pb) pb.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = pm.querySelector('.portal-dropdown');
      dd.style.display = dd.style.display === 'flex' ? '' : 'flex';
    });
    document.addEventListener('click', function () {
      var dd = pm.querySelector('.portal-dropdown'); if (dd) dd.style.display = '';
    });
  }

  /* 3. Bottom tab bar (public + user pages, phones only via CSS) */
  if (!isAdmin) {
    var root = inUser ? base.replace(/user\/$/, '') : base;
    var items = [
      ['index.html', 'fa-house', 'Home', root + 'index.html'],
      ['jobs.html', 'fa-briefcase', 'Jobs', root + 'jobs.html'],
      ['companies.html', 'fa-building', 'Companies', root + 'companies.html'],
      ['resume.html', 'fa-file-lines', 'Resume', root + 'resume.html'],
      ['dashboard.html', 'fa-user', 'Account', root + 'user/dashboard.html']
    ];
    var nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.setAttribute('aria-label', 'Quick navigation');
    items.forEach(function (it) {
      var a = document.createElement('a');
      a.href = it[3];
      a.innerHTML = '<i class="fa-solid ' + it[1] + '"></i><span>' + it[2] + '</span>';
      var userPage = inUser && it[0] === 'dashboard.html';
      if (it[0] === path || userPage) { a.className = 'active'; a.setAttribute('aria-current', 'page'); }
      nav.appendChild(a);
    });
    body.appendChild(nav);
    body.classList.add('has-bottom-nav');
  }

  /* 4. Collapsible filters on small screens */
  document.querySelectorAll('.filter-card').forEach(function (card) {
    var list = card.querySelector('.filter-list');
    if (!list) return;
    card.classList.add('is-collapsible');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-toggle';
    btn.innerHTML = '<span><i class="fa-solid fa-sliders"></i> More filters</span><i class="fa-solid fa-chevron-down"></i>';
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('span').innerHTML = '<i class="fa-solid fa-sliders"></i> ' + (open ? 'Hide filters' : 'More filters');
    });
    list.parentNode.insertBefore(btn, list.nextSibling);
  });

  /* 5. Wide tables scroll sideways */
  document.querySelectorAll('table').forEach(function (t) {
    if (t.closest('.table-responsive') || t.parentNode.style.overflowX) return;
    var w = document.createElement('div');
    w.className = 'table-responsive';
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });
})();
