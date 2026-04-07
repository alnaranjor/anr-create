/* ─────────────────────────────────────────
   ANR Creative — main.js
   particles · lang · animations · cursor · form · UI
   ───────────────────────────────────────── */

'use strict';

/* ── LANGUAGE SYSTEM ── */
const LANG_KEY = 'anr_lang';
let currentLang = 'es';

function detectInitialLang() {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored) return stored;
  const url = new URL(window.location.href);
  if (url.searchParams.get('lang')) return url.searchParams.get('lang');
  const browser = (navigator.language || navigator.userLanguage || 'es').slice(0, 2).toLowerCase();
  return browser === 'en' ? 'en' : 'es';
}

function applyLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;

  // Text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = TRANSLATIONS[lang][key];
    if (val !== undefined) el.innerHTML = val;
  });

  // Meta tags
  const t = TRANSLATIONS[lang];
  document.title = t['meta.title'] || document.title;
  setMeta('name', 'description', t['meta.description']);
  setMeta('name', 'keywords',    t['meta.keywords']);
  setMeta('name', 'language',    lang === 'es' ? 'es' : 'en');
  setMeta('property', 'og:title',       t['meta.title']);
  setMeta('property', 'og:description', t['meta.description']);
  setMeta('property', 'og:locale',      lang === 'es' ? 'es_ES' : 'en_GB');
  setMeta('name', 'twitter:title',       t['meta.title']);
  setMeta('name', 'twitter:description', t['meta.description']);

  // Alt attributes
  document.querySelectorAll('[data-alt-es]').forEach(el => {
    el.alt = el.getAttribute(`data-alt-${lang}`) || el.alt;
  });

  // Form hidden lang
  const fl = document.getElementById('form-lang');
  if (fl) fl.value = lang;

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

/* ── PARTICLES ── */
function initParticles() {
  if (typeof tsParticles === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  tsParticles.load('particles-js', {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: false },
        resize: true
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.3 } }
      }
    },
    particles: {
      color: { value: '#c9a96e' },
      links: {
        color: '#c9a96e', distance: 160,
        enable: true, opacity: 0.08, width: 1
      },
      collisions: { enable: false },
      move: {
        direction: 'none', enable: true,
        outModes: { default: 'bounce' },
        random: true, speed: 0.5, straight: false
      },
      number: { density: { enable: true, area: 900 }, value: 55 },
      opacity: { value: 0.25, random: true, animation: { enable: true, speed: 0.5, minimumValue: 0.1 } },
      shape: { type: 'circle' },
      size:  { value: { min: 1, max: 2 } }
    },
    detectRetina: true
  });
}

/* ── REVEAL ANIMATIONS ── */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const ham   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobile-menu');
  if (!ham || !menu) return;

  function toggle(force) {
    const open = force !== undefined ? force : !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  ham.addEventListener('click', () => toggle());
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
}

/* ── SCROLL-TO-TOP ── */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 600), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── CONTACT FORM ── */
function initForm() {
  const form = document.getElementById('contact-form');
  const fb   = document.getElementById('form-feedback');
  const btn  = document.getElementById('submit-btn');
  if (!form || !fb || !btn) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true;
    const label = btn.querySelector('.btn-label');
    const orig  = label ? label.innerHTML : btn.innerHTML;
    if (label) label.innerHTML = '…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        fb.className = 'form-feedback success';
        fb.textContent = TRANSLATIONS[currentLang]['form.success'];
        form.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      fb.className = 'form-feedback error';
      fb.textContent = TRANSLATIONS[currentLang]['form.error'];
    } finally {
      btn.disabled = false;
      if (label) label.innerHTML = orig;
    }
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const lang = detectInitialLang();
  applyLang(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  initNavbar();
  initMobileMenu();
  initReveal();
  initCursor();
  initScrollTop();
  initForm();

  // Particles init — wait for tsParticles CDN to load
  if (typeof tsParticles !== 'undefined') {
    initParticles();
  } else {
    window.addEventListener('load', initParticles);
  }
});
