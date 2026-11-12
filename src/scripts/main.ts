import { site } from '../data/site';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Loader ---------- */
function initLoader() {
  const loader = $('#loader');
  const done = () => {
    document.body.classList.remove('is-locked');
    document.documentElement.classList.add('is-loaded');
    if (!loader) return;
    loader.style.opacity = '0';
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    setTimeout(() => loader.remove(), 1000);
  };
  const minTime = reduceMotion ? 0 : 900;
  const start = performance.now();
  const finish = () => setTimeout(done, Math.max(0, minTime - (performance.now() - start)));
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
  // safety net on slow networks
  setTimeout(done, 3500);
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

/* ---------- Portfolio filter ---------- */
function initFilter() {
  const buttons = $$<HTMLButtonElement>('.filter-btn');
  const items = $$('.work-item');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      items.forEach((item) => {
        const show = cat === 'All' || item.dataset.category === cat;
        item.hidden = !show;
        if (show) item.classList.add('is-in');
      });
    }),
  );
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

  const fields = {
    name: $<HTMLInputElement>('#cf-name', form)!,
    company: $<HTMLInputElement>('#cf-company', form)!,
    email: $<HTMLInputElement>('#cf-email', form)!,
    service: $<HTMLSelectElement>('#cf-service', form)!,
    message: $<HTMLTextAreaElement>('#cf-message', form)!,
  };

  const setError = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, bad: boolean) => {
    el.setAttribute('aria-invalid', String(bad));
    el.classList.toggle('!border-[#f08a7e]', bad);
    $(`#${el.id}-err`)?.classList.toggle('hidden', !bad);
    return bad;
  };

  const validate = () => {
    const errors = [
      setError(fields.name, fields.name.value.trim().length < 2),
      setError(fields.email, fields.email.value.trim() !== '' && !fields.email.checkValidity()),
      setError(fields.service, fields.service.value === ''),
      setError(fields.message, fields.message.value.trim().length < 5),
    ];
    return !errors.some(Boolean);
  };

  Object.values(fields).forEach((el) =>
    el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && validate()),
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      status.textContent = '';
      return;
    }
    const company = fields.company.value.trim();
    const email = fields.email.value.trim();
    const text = [
      `Hi Blackrose, I'd like a quote.`,
      ``,
      `*Name:* ${fields.name.value.trim()}`,
      company ? `*Company:* ${company}` : null,
      email ? `*Email:* ${email}` : null,
      `*Service:* ${fields.service.value}`,
      ``,
      fields.message.value.trim(),
    ]
      .filter((l): l is string => l !== null)
      .join('\n');
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    status.textContent = 'WhatsApp is open with your message. Press send there to reach us.';
    form.reset();
  });
}

initLoader();
initNavbar();
initMenu();
initReveals();
initFilter();
initLightbox();
initContactForm();
