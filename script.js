(function () {
  'use strict';

  var P = '201042811502';
  function wa(t) {
    return 'https://wa.me/' + P + '?text=' + encodeURIComponent(t);
  }

  // ضبط روابط الواتساب
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = wa(a.dataset.wa);
  });

  // القائمة في الشاشات الصغيرة (Mobile Menu)
  var mb = document.getElementById('menu-btn'),
      menu = document.getElementById('menu');

  mb.addEventListener('click', function () {
    var o = menu.classList.toggle('open');
    mb.setAttribute('aria-expanded', o);
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('open');
      mb.setAttribute('aria-expanded', 'false');
    }
  });

  // التبديل بين شاشات النظام (Tabs)
  var tabs = [].slice.call(document.querySelectorAll('[role=tab]'));

  function show(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      var p = document.getElementById(x.getAttribute('aria-controls'));
      p.hidden = !on;
      p.classList.toggle('on', on);
    });
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(t); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowLeft' ? i + 1 : e.key === 'ArrowRight' ? i - 1 : null;
      if (n === null) return;
      n = (n + tabs.length) % tabs.length;
      tabs[n].focus();
      show(tabs[n]);
      e.preventDefault();
    });
  });

  // النافذة المنبثقة (Modal)
  var d = document.getElementById('order');
  document.getElementById('open-order').addEventListener('click', function () { d.showModal(); });
  document.getElementById('close-order').addEventListener('click', function () { d.close(); });
  d.addEventListener('click', function (e) { if (e.target === d) d.close(); });

  document.getElementById('order-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var msg = 'أهلاً، أريد تفعيل برنامج Pharmacia بسعر 2800 جنيه.\nالاسم: ' + v('f-name') + '\nالصيدلية: ' + v('f-pharma') + '\nالموبايل: ' + v('f-phone') + '\nالمدينة: ' + v('f-city');
    window.open(wa(msg), '_blank', 'noopener');
    d.close();
    e.target.reset();
  });

  // مؤثرات الظهور عند التمرير (Intersection Observer)
  var ob = window.IntersectionObserver && new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ob.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  if (ob) {
    document.querySelectorAll('.sec-head,.step,.feat,.tbl-wrap,.price-card,.trust>div,.dev,.dl article,details,[role=tablist]').forEach(function (el) {
      el.setAttribute('data-r', '');
      el.style.transitionDelay = ([].indexOf.call(el.parentNode.children, el) % 4) * 90 + 'ms';
      ob.observe(el);
    });
  }

  // تفاعل الفأرة مع بطاقات المزايا
  document.querySelectorAll('.feat').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--x', e.clientX - r.left + 'px');
      c.style.setProperty('--y', e.clientY - r.top + 'px');
    });
  });

  // عدادات الإحصائيات الحركية
  var cu = window.IntersectionObserver && new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      cu.unobserve(e.target);
      var el = e.target,
          n = +el.dataset.n,
          s = el.dataset.s,
          t0 = null;
      function f(t) {
        t0 = t0 || t;
        var p = Math.min((t - t0) / 1200, 1);
        el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + s;
        if (p < 1) requestAnimationFrame(f);
      }
      requestAnimationFrame(f);
    });
  }, { threshold: 0.6 });

  if (cu) {
    document.querySelectorAll('[data-n]').forEach(function (el) { cu.observe(el); });
  }

  // شريط تقدم التمرير العلوي
  var bar = document.getElementById('bar');
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    bar.style.transform = 'scaleX(' + (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) + ')';
  }, { passive: true });

  // تفاعل خلفية الـ Hero مع حركة الماوس
  var hero = document.getElementById('top');
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(2));
    hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(2));
  });
})();