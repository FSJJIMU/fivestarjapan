/* =====================================================
   FIVE-STAR JAPAN GROUP — main.js
   アニメーション・ナビ・フォーム動作
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  buildPage();
  initNav();
  initParticles();
  initScrollReveal();
  initForm();

});

/* ──────────────────────────────────────────────────────
   ページ全体をcontents.jsから動的構築
────────────────────────────────────────────────────── */
function buildPage() {
  const c = SITE_CONTENTS;

  // document title
  document.title = `${c.company.name} | ロードサービス・蜂駆除`;

  // nav logo
  document.getElementById('nav-logo').textContent = c.company.name;

  // nav links
  const navUl = document.getElementById('nav-links');
  const drawerUl = document.getElementById('drawer-links');
  c.nav.forEach(item => {
    navUl.innerHTML += `<li><a href="${item.href}">${item.label}</a></li>`;
    drawerUl.innerHTML += `<li><a href="${item.href}">${item.label}</a></li>`;
  });

  // hero background
  if (c.company.heroBg) {
    document.querySelector('.hero-bg-img').style.backgroundImage = `url('${c.company.heroBg}')`;
  }

  // hero logo image
  if (c.company.logoImg) {
    const emblem = document.querySelector('.hero-emblem');
    emblem.classList.add('has-image');
    emblem.innerHTML = `<img src="${c.company.logoImg}" alt="${c.company.name} ロゴ" style="width:100%;height:100%;object-fit:contain;">`;
    // CSS キャッシュ回避：pseudo-element を強制非表示
    const st = document.createElement('style');
    st.textContent = '.hero-emblem.has-image{background:none!important;border:none!important;box-shadow:none!important;}' +
                     '.hero-emblem.has-image::before{display:none!important;content:""!important;}';
    document.head.appendChild(st);
  }

  // hero text
  document.getElementById('hero-title').textContent = c.company.name;
  document.getElementById('hero-tagline').textContent = c.company.tagline;

  // QRコード
  const qrWrap = document.getElementById('hero-qr-wrap');
  if (qrWrap && c.company.qrImg) {
    qrWrap.innerHTML = `<img src="${c.company.qrImg}" alt="QRコード">`;
  }

  // car services
  const carDescEl = document.getElementById('car-services-desc');
  if (carDescEl && c.carServicesDesc) carDescEl.textContent = c.carServicesDesc;
  buildServiceGrid('car-services-grid', c.carServices, '');

  // bee services
  const beeDescEl = document.getElementById('bee-services-desc');
  if (beeDescEl && c.beeServicesDesc) beeDescEl.innerHTML = c.beeServicesDesc;
  buildServiceGrid('bee-services-grid', c.beeServices, '');

  // organic bee section
  buildBeeOrganic('bee-organic', c.beeOrganic);

  // rescue updates
  buildUpdates('updates-car', c.updates.car, 'ロードサービス');
  buildUpdates('updates-bee', c.updates.bee, 'ハチ駆除');

  // about
  document.getElementById('about-body').textContent = c.about.body;
  const sigEl = document.getElementById('about-signature');
  if (sigEl && c.about.signature) sigEl.textContent = c.about.signature;

  // about logo image
  const logoEl = document.getElementById('about-logo');
  if (c.company.logoImg) {
    logoEl.innerHTML = `<img src="${c.company.logoImg}" alt="${c.company.name} ロゴ">`;
  }

  // company info table
  const tableEl = document.getElementById('company-table');
  c.companyInfo.forEach(row => {
    tableEl.innerHTML += `
      <div class="company-row reveal">
        <div class="company-label">${row.label}</div>
        <div class="company-value">${row.value}</div>
      </div>`;
  });

  // partner regions
  buildPartnerRegions('partners-regions', c.partnerRegions);

  // partners
  const partnersEl = document.getElementById('partners-grid');
  if (c.partnersCombinedLogo) {
    partnersEl.classList.add('has-combined');
    const mobileImg = c.partnersCombinedLogoMobile || c.partnersCombinedLogo;
    partnersEl.innerHTML =
      `<img src="${c.partnersCombinedLogo}" alt="協力店ロゴ一覧" class="partners-combined-img reveal partners-logo-desktop">` +
      `<img src="${mobileImg}"              alt="協力店ロゴ一覧" class="partners-combined-img reveal partners-logo-mobile">`;
  } else {
    c.partners.forEach(p => {
      partnersEl.innerHTML += `
        <div class="partner-card reveal">
          ${p.logo
            ? `<img src="${p.logo}" alt="${p.name}">`
            : `<span class="partner-name">${p.name}</span>`}
        </div>`;
    });
  }

  // footer
  document.getElementById('footer-copy').textContent = c.footer.copy;
  document.getElementById('footer-logo').textContent = c.company.name;
  const footerLinks = document.getElementById('footer-links');
  c.footer.links.forEach(l => {
    footerLinks.innerHTML += `<li><a href="${l.href}">${l.label}</a></li>`;
  });

  // tel
  document.querySelectorAll('.js-tel').forEach(el => {
    el.textContent = c.company.tel;
    el.href = `tel:${c.company.tel.replace(/-/g, '')}`;
  });

  // アイコンを SVG に変換
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function buildServiceGrid(containerId, services, defaultIcon) {
  const el = document.getElementById(containerId);
  if (!el) return;
  services.forEach((s, i) => {
    el.innerHTML += `
      <div class="service-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="service-card-img">
          ${s.img
            ? `<img src="${s.img}" alt="${s.title}" loading="lazy">`
            : `<div class="img-placeholder">${defaultIcon}</div>`}
        </div>
        <div class="service-card-body">
          <div class="service-card-title">${s.title}</div>
          <div class="service-card-desc">${s.desc}</div>
        </div>
      </div>`;
  });
}

function buildUpdates(containerId, items, catLabel) {
  const wrapper = document.getElementById(containerId);
  if (!wrapper) return;
  wrapper.innerHTML = `<div class="cat-tag reveal">${catLabel}</div>`;
  const grid = document.createElement('div');
  grid.className = 'updates-grid';
  items.forEach((item, i) => {
    grid.innerHTML += `
      <div class="update-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="update-before-after">
          <div class="ba-col">
            <span class="ba-label before">BEFORE</span>
            ${item.before
              ? `<img class="ba-img" src="${item.before}" alt="before" loading="lazy">`
              : `<div class="ba-img img-placeholder" style="aspect-ratio:4/3"><i data-lucide="image"></i></div>`}
          </div>
          <div class="ba-col">
            <span class="ba-label after">AFTER</span>
            ${item.after
              ? `<img class="ba-img" src="${item.after}" alt="after" loading="lazy">`
              : `<div class="ba-img img-placeholder" style="aspect-ratio:4/3">✅</div>`}
          </div>
        </div>
        <div class="update-card-footer">
          <button class="update-card-title" aria-expanded="false">
            ${item.title}
            <span class="update-card-chevron" aria-hidden="true">▼</span>
          </button>
          ${item.desc ? `<div class="update-card-desc"><p>${item.desc}</p></div>` : ''}
        </div>
      </div>`;
  });
  wrapper.appendChild(grid);
  // アコーディオン（タイトルボタン＋画像エリア両方で開閉）
  grid.querySelectorAll('.update-card').forEach(card => {
    const btn  = card.querySelector('.update-card-title');
    const desc = card.querySelector('.update-card-desc');
    const imgs = card.querySelector('.update-before-after');
    if (!btn) return;

    const toggle = () => {
      if (!desc) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      desc.style.maxHeight = open ? '0' : desc.scrollHeight + 'px';
    };

    btn.addEventListener('click', toggle);
    if (imgs) imgs.addEventListener('click', toggle);
  });
}


function buildPartnerRegions(containerId, regions) {
  const el = document.getElementById(containerId);
  if (!el || !regions) return;
  regions.forEach((r, i) => {
    const icons = r.services.map(s => {
      if (s === 'car') return `<img src="画像データ/iconcar.png" alt="ロードサービス" class="region-icon-img">`;
      if (s === 'bee') return `<img src="画像データ/iconbee.png" alt="蜂駆除" class="region-icon-img">`;
      return '';
    }).join('');
    const companies = r.companies.map(c => `<li>${c}</li>`).join('');
    el.innerHTML += `
      <div class="partner-region-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="partner-region-header">
          <div>
            <div class="partner-region-name">${r.region}</div>
            <div class="partner-region-area">${r.area}</div>
          </div>
          <div class="partner-region-icons">${icons}</div>
        </div>
        <hr class="partner-region-divider">
        <ul class="partner-region-list">${companies}</ul>
      </div>`;
  });
}


function buildBeeOrganic(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el || !data) return;

  const concerns = data.concerns.map(c =>
    `<li class="bee-organic-concern"><i data-lucide="check-circle" class="bee-organic-check"></i><span>${c}</span></li>`
  ).join('');

  const tools = data.tools.map(t => `
    <div class="bee-organic-tool-card reveal">
      ${t.img
        ? `<img src="${t.img}" alt="${t.name}" class="bee-organic-tool-img">`
        : `<div class="bee-organic-tool-img-placeholder">IMAGE</div>`}
      <div class="bee-organic-tool-body">
        <div class="bee-organic-tool-name">${t.name}</div>
        <p class="bee-organic-tool-desc">${t.desc}</p>
      </div>
    </div>`
  ).join('');

  el.innerHTML = `
    <div class="bee-organic-wrap reveal">
      <div class="bee-organic-header">
        <span class="bee-organic-badge">弊社独自技術</span>
        <h3 class="bee-organic-title">${data.title}</h3>
        <p class="bee-organic-lead">${data.lead}</p>
      </div>
      <div class="bee-organic-body">
        <div class="bee-organic-concerns-col">
          <div class="bee-organic-col-label">よくあるご心配</div>
          <ul class="bee-organic-concerns">${concerns}</ul>
        </div>
        <div class="bee-organic-bridge">
          <p class="bee-organic-bridge-text">上記のようなご心配を解消するべく弊社は<br class="sp-br">スプレーを使用しない方法も採用しております。</p>
        </div>
        <div class="bee-organic-tools-col">
          <div class="bee-organic-col-label">弊社の解決策</div>
          <div class="bee-organic-tools">${tools}</div>
        </div>
      </div>
      <p class="bee-organic-note">※緊急性の内容や、場所によってはご相談の上駆除剤や忌避剤でのご対応をさせていただくことがございます。</p>
    </div>`;

  if (typeof lucide !== 'undefined') lucide.createIcons();
}


/* ──────────────────────────────────────────────────────
   Navigation
────────────────────────────────────────────────────── */
function initNav() {
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('nav-hamburger');
  const drawer  = document.getElementById('nav-drawer');

  // scroll → background
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // hamburger toggle
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // drawer links → close
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


/* ──────────────────────────────────────────────────────
   Hero particles
────────────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const span = document.createElement('span');
    span.textContent = '★';
    const isMobile = window.innerWidth <= 900;
    const size = isMobile
      ? Math.random() * 2.5 + 1.8   // モバイル: 1.8〜4.3px
      : Math.random() * 7 + 4;    // デスクトップ: 4〜11px
    span.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * -20}%;
      font-size: ${size}px;
      animation-duration:  ${9 + Math.random() * 14}s;
      animation-delay:     ${Math.random() * 14}s;
      opacity: 0;
    `;
    container.appendChild(span);
  }
}


/* ──────────────────────────────────────────────────────
   Scroll reveal (Intersection Observer)
────────────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 80px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Re-observe dynamically added elements
  const mo = new MutationObserver(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  });
  mo.observe(document.body, { childList: true, subtree: true });
}


/* ──────────────────────────────────────────────────────
   Contact Form (Netlify Forms対応)
────────────────────────────────────────────────────── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Netlify Forms: data-netlify="true" を付けておけばそのまま動く
  // ローカルテスト中はsubmitしてもページ遷移しないように制御
  form.addEventListener('submit', async (e) => {
    const isNetlify = form.getAttribute('data-netlify') === 'true';
    if (!isNetlify) {
      // ローカル確認用：送信シミュレーション
      e.preventDefault();
      showSuccess();
      return;
    }
    // Netlify本番：デフォルト送信に任せる（e.preventDefault()しない）
  });
}

function showSuccess() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  form.style.display    = 'none';
  success.style.display = 'block';
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
