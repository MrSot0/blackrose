import { site } from '../data/site';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Entrance (hero line reveals) ---------- */
function initEntrance() {
  requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
}

/* ---------- Navbar: hide on scroll down ---------- */
function initNavbar() {
  const nav = $('#navbar');
  if (!nav) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (!nav.classList.contains('menu-open')) {
      const goingDown = y > lastY && y > 120;
      if (Math.abs(y - lastY) > 6) nav.classList.toggle('is-hidden', goingDown);
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  // reveal the bar when keyboard focus lands in it
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));
  update();
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const nav = $('#navbar');
  const btn = $<HTMLButtonElement>('#menu-toggle');
  const menu = $('#mobile-menu');
  if (!nav || !btn || !menu) return;

  const setOpen = (open: boolean) => {
    nav.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.inert = !open;
    document.body.classList.toggle('is-locked', open);
    if (open) setTimeout(() => $('a', menu)?.focus(), 60);
  };

  btn.addEventListener('click', () => setOpen(!nav.classList.contains('menu-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
      setOpen(false);
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && setOpen(false));
}

/* ---------- Scroll reveals ---------- */
function initReveals() {
  const items = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Gallery: staggered curtain reveals ---------- */
const revealTile = (tile: HTMLElement, delay: number) => {
  tile.style.setProperty('--d', `${delay}ms`);
  const img = $<HTMLImageElement>('img', tile);
  const go = () => tile.classList.add('is-in');
  if (!img || img.complete) go();
  else {
    img.addEventListener('load', go, { once: true });
    img.addEventListener('error', go, { once: true });
  }
};

function initTiles() {
  const tiles = $$('.tile');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    tiles.forEach((t) => t.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      const batch = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement)
        .sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return ra.top - rb.top || ra.left - rb.left;
        });
      batch.forEach((tile, i) => {
        revealTile(tile, i * 120);
        io.unobserve(tile);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  );
  tiles.forEach((t) => io.observe(t));
}

/* ---------- Portfolio filter ---------- */
function initFilter() {
  const buttons = $$<HTMLButtonElement>('.filter-btn');
  const items = $$('.work-item');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let n = 0;
      items.forEach((item) => {
        const show = cat === 'All' || item.dataset.category === cat;
        item.hidden = !show;
        item.classList.remove('is-in');
        if (show) {
          const delay = n++ * 90;
          requestAnimationFrame(() => requestAnimationFrame(() => revealTile(item, delay)));
        }
      });
    }),
  );
}

/* ---------- Process: scroll-linked nodes + card flips ---------- */
function initProcess() {
  const section = $('[data-process]');
  if (!section) return;
  const steps = $$('.process-step', section);
  const track = $('ol', section)!;
  if (reduceMotion) {
    section.style.setProperty('--p', '1');
    steps.forEach((s) => s.classList.add('is-active'));
    return;
  }
  const desktop = window.matchMedia('(min-width: 1024px)');
  let ticking = false;

  const update = () => {
    ticking = false;
    const r = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.8;
    const end = vh * 0.55;
    const span = desktop.matches ? vh * 0.35 : r.height + start - end;
    const p = Math.min(1, Math.max(0, (start - r.top) / span));
    section.style.setProperty('--p', p.toFixed(3));
    steps.forEach((step, i) => {
      const threshold = desktop.matches ? (i + 0.35) / steps.length : (i + 0.1) / steps.length;
      step.classList.toggle('is-active', p >= threshold);
    });
  };
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* ---------- Contact: rotating word ---------- */
function initRotator() {
  const el = $('#rotator');
  if (!el || reduceMotion) return;
  const words: string[] = JSON.parse(el.dataset.words ?? '[]');
  if (words.length < 2) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    el.textContent = words[i];
    el.classList.remove('swap');
    void el.offsetWidth;
    el.classList.add('swap');
  }, 2200);
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const dialog = $<HTMLDialogElement>('#lightbox');
  const stage = $('#lb-stage');
  if (!dialog || !stage) return;
  const title = $('#lb-title')!;
  const cat = $('#lb-cat')!;
  const desc = $('#lb-desc')!;
  const count = $('#lb-count')!;
  const prev = $<HTMLButtonElement>('#lb-prev')!;
  const next = $<HTMLButtonElement>('#lb-next')!;

  let images: HTMLImageElement[] = [];
  let index = 0;

  const show = (i: number) => {
    index = (i + images.length) % images.length;
    stage.replaceChildren(images[index]);
    count.textContent = images.length > 1 ? `${index + 1} / ${images.length}` : '';
  };

  $$<HTMLButtonElement>('[data-project]').forEach((trigger) =>
    trigger.addEventListener('click', () => {
      const tpl = $<HTMLTemplateElement>(`template[data-lb="${trigger.dataset.project}"]`);
      if (!tpl) return;
      images = $$<HTMLImageElement>('img', tpl.content.cloneNode(true) as DocumentFragment);
      title.textContent = tpl.dataset.title ?? '';
      cat.textContent = tpl.dataset.cat ?? '';
      desc.textContent = tpl.dataset.desc ?? '';
      const multi = images.length > 1;
      prev.hidden = next.hidden = !multi;
      show(0);
      dialog.showModal();
      document.body.classList.add('is-locked');
    }),
  );

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  $('#lb-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('is-locked'));
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target === stage) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (images.length < 2) return;
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
}

/* ---------- Contact form → WhatsApp ---------- */
function initContactForm() {
  const form = $<HTMLFormElement>('#contact-form');
  if (!form) return;
  const status = $('#cf-status', form)!;
  const name = $<HTMLInputElement>('#cf-name', form)!;
  const company = $<HTMLInputElement>('#cf-company', form)!;
  const email = $<HTMLInputElement>('#cf-email', form)!;
  const message = $<HTMLTextAreaElement>('#cf-message', form)!;
  const serviceGroup = $('#cf-service', form)!;
  const radios = $$<HTMLInputElement>('input[name="service"]', form);
  const service = () => radios.find((r) => r.checked)?.value ?? '';

  const setError = (el: HTMLElement, errId: string, bad: boolean) => {
    el.setAttribute('aria-invalid', String(bad));
    $(`#${errId}`)?.classList.toggle('hidden', !bad);
    return bad;
  };

  const validate = () => {
    const errors = [
      setError(serviceGroup, 'cf-service-err', service() === ''),
      setError(name, 'cf-name-err', name.value.trim().length < 2),
      setError(email, 'cf-email-err', email.value.trim() !== '' && !email.checkValidity()),
      setError(message, 'cf-message-err', message.value.trim().length < 5),
    ];
    return !errors.some(Boolean);
  };

  [name, email, message, ...radios].forEach((el) =>
    el.addEventListener('input', () => form.querySelector('[aria-invalid="true"]') && validate()),
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    if (!validate()) {
      const bad = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      (bad === serviceGroup ? radios[0] : bad)?.focus();
      return;
    }
    const text = [
      `Hi Blackrose, I'd like a quote.`,
      ``,
      `*Name:* ${name.value.trim()}`,
      company.value.trim() ? `*Company:* ${company.value.trim()}` : null,
      email.value.trim() ? `*Email:* ${email.value.trim()}` : null,
      `*Service:* ${service()}`,
      ``,
      message.value.trim(),
    ]
      .filter((l): l is string => l !== null)
      .join('\n');
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    status.textContent = 'WhatsApp is open with your message. Press send there to reach us.';
    form.reset();
  });
}

initEntrance();
initNavbar();
initMenu();
initReveals();
initTiles();
initFilter();
initProcess();
initRotator();
initLightbox();
initContactForm();
