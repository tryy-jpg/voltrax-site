/* ═══════════════════════════════════════════════════════════════════════════
   VOLTRAX — main.js
   SPA Router · All Pages · Cart · Auth · i18n · Search · Theme · 3D · Map
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── STATE ──────────────────────────────────────────────────────────────── */
const STATE = {
  lang: 'pt',
  theme: 'dark',
  cart: [],
  user: null,
  currentRoute: '/home',
  map: null,
  threeScene: null,
};

/* ─── I18N ───────────────────────────────────────────────────────────────── */
const I18N = {
  pt: {
    'nav.vehicles':    'Veículos',
    'nav.technology':  'Tecnologia',
    'nav.energy':      'Energia',
    'nav.marketplace': 'Loja',
    'nav.branches':    'Filiais',
    'nav.about':       'Empresa',
    'nav.sponsors':    'Parceiros',
    'nav.support':     'Suporte',
    'nav.contact':     'Contato',
    'nav.login':       'Entrar',
    'nav.mega.agricultural': 'Agrícola',
    'nav.mega.industrial':   'Industrial',
    'nav.mega.new':          'Novidades',
    'search.placeholder': 'Buscar veículos, peças, tecnologia...',
    'footer.tagline': 'Mobilidade elétrica industrial para o agronegócio do futuro.',
    'footer.rights':  'Todos os direitos reservados.',
    'footer.col.products':  'Produtos',
    'footer.col.technology':'Tecnologia',
    'footer.col.company':   'Empresa',
    'footer.col.support':   'Suporte',
    'loading.init':   'Inicializando sistemas...',
    'loading.loading':'Carregando módulos...',
    'loading.ready':  'Sistemas prontos.',
  },
  en: {
    'nav.vehicles':    'Vehicles',
    'nav.technology':  'Technology',
    'nav.energy':      'Energy',
    'nav.marketplace': 'Store',
    'nav.branches':    'Branches',
    'nav.about':       'Company',
    'nav.sponsors':    'Partners',
    'nav.support':     'Support',
    'nav.contact':     'Contact',
    'nav.login':       'Sign In',
    'nav.mega.agricultural': 'Agricultural',
    'nav.mega.industrial':   'Industrial',
    'nav.mega.new':          'New',
    'search.placeholder': 'Search vehicles, parts, technology...',
    'footer.tagline': 'Industrial electric mobility for the agribusiness of the future.',
    'footer.rights':  'All rights reserved.',
    'footer.col.products':  'Products',
    'footer.col.technology':'Technology',
    'footer.col.company':   'Company',
    'footer.col.support':   'Support',
    'loading.init':   'Initializing systems...',
    'loading.loading':'Loading modules...',
    'loading.ready':  'Systems ready.',
  },
};
function t(key) { return (I18N[STATE.lang] || I18N.pt)[key] || key; }
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const VEHICLES = [
  {
    id: 'vx900',  cat: 'tractor',
    name: 'VX-900 PRO',
    desc: 'O trator elétrico mais potente do mercado. Torque imediato e zero emissão.',
    img: 'https://images.unsplash.com/photo-1591093468677-c5a9f77aec5a?w=800&q=80',
    power: '480 kW', range: '18h', charge: '2.5h',
    price: 'R$ 890.000',
    badge: 'Novo',
    specs: {
      'Potência': '480 kW (650 cv)',
      'Autonomia': '18h em carga contínua',
      'Bateria': '420 kWh LFP',
      'Recarga rápida': '150 kW DC (2,5h)',
      'Tração': '4x4 com diferencial eletrônico',
      'Peso': '12.400 kg',
      'Largura': '3,2 m',
      'Capacidade de tração': '32 t',
    },
    features: ['IA de condução autônoma nível 3', 'Telemetria em tempo real', 'Integração solar opcional', 'Sistema antiaderência adaptativo'],
  },
  {
    id: 'vx600',  cat: 'tractor',
    name: 'VX-600',
    desc: 'Potência e eficiência para médias e grandes propriedades.',
    img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
    power: '320 kW', range: '14h', charge: '3h',
    price: 'R$ 620.000',
    badge: null,
    specs: {
      'Potência': '320 kW (435 cv)',
      'Autonomia': '14h em carga contínua',
      'Bateria': '280 kWh LFP',
      'Recarga rápida': '100 kW DC (3h)',
      'Tração': '4x4',
      'Peso': '9.800 kg',
    },
    features: ['Telemetria em tempo real', 'Controle de velocidade adaptativo', 'Display central 12"'],
  },
  {
    id: 'ch800',  cat: 'harvester',
    name: 'CH-800 HARVEST',
    desc: 'Colheitadeira elétrica de alta capacidade para colheitas de grãos e cana.',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    power: '560 kW', range: '10h', charge: '4h',
    price: 'R$ 1.450.000',
    badge: 'Premium',
    specs: {
      'Potência': '560 kW',
      'Autonomia': '10h',
      'Bateria': '500 kWh',
      'Plataforma': '45 pés',
      'Capacidade do graneleiro': '14.000 L',
    },
    features: ['Separação automatizada', 'Monitoramento de perdas em tempo real', 'Piloto automático por GPS RTK'],
  },
  {
    id: 'sp400', cat: 'sprayer',
    name: 'SP-400 SPRAY',
    desc: 'Pulverizador elétrico de precisão com sistema de mapeamento integrado.',
    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    power: '220 kW', range: '12h', charge: '2h',
    price: 'R$ 480.000',
    badge: null,
    specs: {
      'Potência': '220 kW',
      'Autonomia': '12h',
      'Tanque': '5.000 L',
      'Barra': '36 m',
    },
    features: ['Bicos individuais com controle de seção', 'Mapeamento RTK', 'Modo anti-deriva automático'],
  },
  {
    id: 'cl300', cat: 'loader',
    name: 'CL-300 LOADER',
    desc: 'Carregadeira elétrica compacta e silenciosa para operações em galpões e silos.',
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    power: '160 kW', range: '16h', charge: '1.5h',
    price: 'R$ 320.000',
    badge: null,
    specs: {
      'Potência': '160 kW',
      'Capacidade': '6 t',
      'Altura de descarga': '5,2 m',
      'Autonomia': '16h',
    },
    features: ['Zero emissão em ambientes fechados', 'Recarga ultrarrápida', 'Câmera 360°'],
  },
  {
    id: 'ex500', cat: 'excavator',
    name: 'EX-500 DIG',
    desc: 'Escavadeira elétrica de médio porte para obras rurais e terraplenagem.',
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
    power: '280 kW', range: '8h', charge: '3.5h',
    price: 'R$ 750.000',
    badge: null,
    specs: {
      'Potência': '280 kW',
      'Capacidade da caçamba': '1,8 m³',
      'Profundidade máx.': '6,8 m',
      'Autonomia': '8h',
    },
    features: ['Sistema hidráulico elétrico de alta eficiência', 'Pesagem de caçamba integrada', 'Modo eco automático'],
  },
  {
    id: 'fk200', cat: 'forklift',
    name: 'FK-200 LIFT',
    desc: 'Empilhadeira elétrica para armazéns e cooperativas agrícolas.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    power: '60 kW', range: '12h', charge: '1h',
    price: 'R$ 195.000',
    badge: null,
    specs: {
      'Potência': '60 kW',
      'Carga máx.': '5 t',
      'Altura máx.': '7 m',
      'Autonomia': '12h',
    },
    features: ['Operação silenciosa', 'Sensor de peso automático', 'Câmera de ré'],
  },
];

const MARKETPLACE_PRODUCTS = [
  { id: 'bat1', cat: 'batteries', name: 'Bateria LFP 80 kWh', desc: 'Módulo de bateria para expansão de autonomia. Compatível com VX-600 e VX-900.', price: 'R$ 48.000', img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80' },
  { id: 'bat2', cat: 'batteries', name: 'Bateria LFP 40 kWh', desc: 'Módulo compacto para empilhadeiras e carregadeiras.', price: 'R$ 24.000', img: 'https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=400&q=80' },
  { id: 'sol1', cat: 'solar', name: 'Kit Solar 50 kWp', desc: 'Painel bifacial de alta eficiência com inversor dedicado. Para recarga em campo.', price: 'R$ 72.000', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80' },
  { id: 'sol2', cat: 'solar', name: 'Módulo Solar 480W', desc: 'Painel individual de alta performance para complementar o sistema.', price: 'R$ 980', img: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=400&q=80' },
  { id: 'prt1', cat: 'parts', name: 'Controlador de Motor VX', desc: 'Controlador eletrônico de tração para série VX. Garantia 3 anos.', price: 'R$ 18.500', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80' },
  { id: 'prt2', cat: 'parts', name: 'Sensor Telemetria IoT', desc: 'Kit de sensores para monitoramento remoto e diagnóstico preditivo.', price: 'R$ 3.200', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
  { id: 'acc1', cat: 'accessories', name: 'Carregador Rápido 150kW', desc: 'Estação de recarga rápida DC para qualquer modelo da linha VX.', price: 'R$ 85.000', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80' },
  { id: 'acc2', cat: 'accessories', name: 'Cabo de Recarga CCS2', desc: 'Cabo industrial 5m para recarga rápida DC. Certificado IP67.', price: 'R$ 1.850', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 'mnt1', cat: 'maintenance', name: 'Plano Manutenção Anual', desc: 'Visitas técnicas periódicas, diagnóstico remoto e peças de desgaste incluídas.', price: 'R$ 28.000', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80' },
];

const BRANCHES = [
  { id: 1, name: 'Sede — São Paulo', state: 'São Paulo', lat: -23.5505, lng: -46.6333, address: 'Av. Paulista, 2000 — Bela Vista', phone: '(11) 3000-8800', email: 'sp@voltrax.com.br', hours: 'Seg-Sex: 8h–18h' },
  { id: 2, name: 'Filial Mato Grosso', state: 'Mato Grosso', lat: -15.6014, lng: -56.0979, address: 'Rod. BR-364, km 12 — Cuiabá', phone: '(65) 3100-2200', email: 'mt@voltrax.com.br', hours: 'Seg-Sex: 7h–17h' },
  { id: 3, name: 'Filial Rio Grande do Sul', state: 'Rio Grande do Sul', lat: -30.0346, lng: -51.2177, address: 'Av. Protásio Alves, 5500 — Porto Alegre', phone: '(51) 3200-5500', email: 'rs@voltrax.com.br', hours: 'Seg-Sex: 8h–18h' },
  { id: 4, name: 'Filial Goiás', state: 'Goiás', lat: -16.6864, lng: -49.2643, address: 'Av. Anhanguera, 3700 — Goiânia', phone: '(62) 3400-9900', email: 'go@voltrax.com.br', hours: 'Seg-Sex: 7h–17h' },
  { id: 5, name: 'Filial Pará', state: 'Pará', lat: -1.4558, lng: -48.5024, address: 'Av. Almirante Barroso, 700 — Belém', phone: '(91) 3100-4400', email: 'pa@voltrax.com.br', hours: 'Seg-Sex: 8h–17h' },
];

const SPONSORS = [
  { id: 1, name: 'AgriBank', type: 'Financeiro', desc: 'Parceiro financeiro para linhas de crédito especiais em maquinário elétrico.' },
  { id: 2, name: 'SolarBR', type: 'Energia', desc: 'Fornecimento e instalação de sistemas fotovoltaicos integrados.' },
  { id: 3, name: 'TechFarm', type: 'Tecnologia', desc: 'Plataforma de gestão agrícola com integração nativa à telemetria VOLTRAX.' },
  { id: 4, name: 'BattCo', type: 'Baterias', desc: 'Fornecedor exclusivo de células LFP de alta densidade energética.' },
  { id: 5, name: 'Embrapa', type: 'Pesquisa', desc: 'Parceria em pesquisa e desenvolvimento de tecnologias para o campo.' },
  { id: 6, name: 'Neoenergia', type: 'Infraestrutura', desc: 'Rede de carregadores VOLTRAX integrada à malha de energia renovável.' },
  { id: 7, name: 'BNDES', type: 'Fomento', desc: 'Apoio a programas de financiamento de maquinário limpo no Brasil.' },
  { id: 8, name: 'PwC Brasil', type: 'Consultoria', desc: 'Auditoria ESG e suporte à expansão sustentável da operação.' },
];

const FAQ = [
  { q: 'Qual é a autonomia real dos tratores elétricos VOLTRAX?', a: 'Os tratores da linha VX oferecem entre 14h e 18h de autonomia em condições normais de operação. A autonomia pode variar de acordo com o tipo de trabalho, carga e temperatura ambiente. O VX-900 PRO, nosso modelo topo de linha, entrega até 18h com bateria de 420 kWh.' },
  { q: 'Como é feita a recarga em campo?', a: 'Os veículos VOLTRAX suportam recarga AC (tomada rural trifásica) e recarga rápida DC via nossos carregadores de 100–150 kW. Em campo, recomendamos kits de energia solar VOLTRAX para recarga durante a noite ou pausas operacionais.' },
  { q: 'Os veículos têm garantia e suporte técnico?', a: 'Sim. Todos os veículos possuem garantia de 3 anos na bateria e 2 anos nos componentes eletromotores. Oferecemos suporte remoto via telemetria 24/7 e assistência técnica em toda a nossa rede de filiais.' },
  { q: 'É possível financiar a compra?', a: 'Sim. Trabalhamos com linhas de crédito especiais pelo BNDES, Pronaf Mais Alimentos e parceiros bancários como AgriBank, com taxas reduzidas para maquinário de baixa emissão.' },
  { q: 'Qual é o custo de manutenção comparado ao diesel?', a: 'Os veículos elétricos têm custo de manutenção até 60% menor que os equivalentes a diesel, pois eliminam trocas de óleo, filtros e componentes do motor de combustão. O custo energético também é significativamente menor com a integração solar.' },
  { q: 'É possível integrar ao sistema de gestão agrícola já existente?', a: 'Sim. A plataforma VOLTRAX Connect possui APIs abertas e integração nativa com os principais ERP e sistemas de gestão agrícola do mercado. Nosso parceiro TechFarm também oferece integração direta.' },
];

/* ─── ROUTER ─────────────────────────────────────────────────────────────── */
const ROUTES = {
  '/home':        renderHome,
  '/vehicles':    renderVehicles,
  '/technology':  renderTechnology,
  '/energy':      renderEnergy,
  '/marketplace': renderMarketplace,
  '/branches':    renderBranches,
  '/showroom':    renderShowroom,
  '/sponsors':    renderSponsors,
  '/about':       renderAbout,
  '/support':     renderSupport,
  '/contact':     renderContact,
  '/cart':        renderCart,
  '/login':       renderLogin,
  '/account':     renderAccount,
};

function navigate(path, params = {}) {
  const base = path.split('?')[0];
  STATE.currentRoute = base;
  STATE.routeParams = params;
  window.location.hash = '#' + path + (Object.keys(params).length ? '?' + new URLSearchParams(params).toString() : '');
  renderPage(base, params);
  closeAll();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setActiveNav(base);
}

function renderPage(path, params = {}) {
  const app = document.getElementById('app');
  const fn = ROUTES[path];
  if (fn) {
    app.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'page';
    app.appendChild(page);
    fn(page, params);
  } else {
    renderHome(app);
  }
  initReveal();
}

function setActiveNav(path) {
  document.querySelectorAll('.nav-link, .mobile-link').forEach(a => {
    a.classList.toggle('active', a.dataset.route === path);
  });
}

function routeFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return { path: '/home', params: {} };
  const [path, qs] = hash.split('?');
  const params = {};
  if (qs) new URLSearchParams(qs).forEach((v, k) => { params[k] = v; });
  return { path: path || '/home', params };
}

/* ─── LOADING SCREEN ─────────────────────────────────────────────────────── */
function initLoading() {
  const screen = document.getElementById('loading-screen');
  const text   = document.getElementById('loadingText');
  const msgs   = [t('loading.init'), t('loading.loading'), t('loading.ready')];
  let i = 0;
  const iv = setInterval(() => {
    i++;
    if (i < msgs.length) text.textContent = msgs[i];
    else clearInterval(iv);
  }, 700);
  setTimeout(() => {
    screen.classList.add('hidden');
    const { path, params } = routeFromHash();
    renderPage(path, params);
    setActiveNav(path);
  }, 2200);
}

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburger
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });

  // Search
  const searchToggle = document.getElementById('searchToggle');
  const searchBar    = document.getElementById('searchBar');
  const searchInput  = document.getElementById('searchInput');
  const searchClose  = document.getElementById('searchClose');
  const searchResults = document.getElementById('searchResults');

  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) searchInput.focus();
  });
  searchClose.addEventListener('click', () => {
    searchBar.classList.remove('open');
    searchInput.value = '';
    searchResults.innerHTML = '';
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchBar.classList.remove('open');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });
  searchInput.addEventListener('input', debounce(() => doSearch(searchInput.value, searchResults), 200));

  // Theme
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Lang
  document.getElementById('langToggle').addEventListener('click', toggleLang);

  // Cart btn
  document.getElementById('cartBtn').addEventListener('click', () => navigate('/cart'));

  // Delegate nav routes
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-route]');
    if (!a) return;
    e.preventDefault();
    const path = a.dataset.route;
    const cat  = a.dataset.cat;
    const params = cat ? { cat } : {};
    navigate(path, params);
  });
}

function doSearch(query, resultsEl) {
  resultsEl.innerHTML = '';
  if (!query.trim()) return;
  const q = query.toLowerCase();
  const hits = [
    ...VEHICLES.map(v => ({ name: v.name, cat: v.cat, img: v.img, route: '/vehicles', id: v.id })),
    ...MARKETPLACE_PRODUCTS.map(p => ({ name: p.name, cat: p.cat, img: p.img, route: '/marketplace', id: p.id })),
  ].filter(x => x.name.toLowerCase().includes(q));

  if (!hits.length) {
    resultsEl.innerHTML = `<p style="color:var(--clr-text3);font-size:.85rem;padding:.5rem 0;">Nenhum resultado para "${query}"</p>`;
    return;
  }
  hits.slice(0, 5).forEach(h => {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.innerHTML = `
      <div class="search-result-img"><img src="${h.img}" alt="${h.name}" loading="lazy"></div>
      <div>
        <div class="search-result-name">${h.name}</div>
        <div class="search-result-cat">${catLabel(h.cat)}</div>
      </div>`;
    div.addEventListener('click', () => {
      navigate(h.route, h.route === '/vehicles' ? { cat: h.cat } : {});
      document.getElementById('searchBar').classList.remove('open');
    });
    resultsEl.appendChild(div);
  });
}

function catLabel(cat) {
  const map = { tractor:'Trator Elétrico', harvester:'Colheitadeira', sprayer:'Pulverizador', loader:'Carregadeira', excavator:'Escavadeira', forklift:'Empilhadeira', batteries:'Bateria', solar:'Solar', parts:'Componentes', accessories:'Acessórios', maintenance:'Manutenção' };
  return map[cat] || cat;
}

/* ─── THEME ──────────────────────────────────────────────────────────────── */
function toggleTheme() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = STATE.theme;
  localStorage.setItem('vx-theme', STATE.theme);
}
function initTheme() {
  const saved = localStorage.getItem('vx-theme');
  if (saved) { STATE.theme = saved; document.documentElement.dataset.theme = saved; }
}

/* ─── LANG ───────────────────────────────────────────────────────────────── */
function toggleLang() {
  STATE.lang = STATE.lang === 'pt' ? 'en' : 'pt';
  document.documentElement.dataset.lang = STATE.lang;
  document.getElementById('langLabel').textContent = STATE.lang.toUpperCase();
  applyI18n();
}

/* ─── CART ───────────────────────────────────────────────────────────────── */
function addToCart(product, qty = 1) {
  const existing = STATE.cart.find(c => c.id === product.id);
  if (existing) existing.qty += qty;
  else STATE.cart.push({ ...product, qty });
  updateCartCount();
  showToast(`${product.name} adicionado ao carrinho`, 'success');
}
function removeFromCart(id) {
  STATE.cart = STATE.cart.filter(c => c.id !== id);
  updateCartCount();
}
function updateCartQty(id, delta) {
  const item = STATE.cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartCount();
}
function updateCartCount() {
  const count = STATE.cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = count;
  el.classList.toggle('visible', count > 0);
  localStorage.setItem('vx-cart', JSON.stringify(STATE.cart));
}
function loadCart() {
  try { const s = localStorage.getItem('vx-cart'); if (s) STATE.cart = JSON.parse(s); } catch {}
  updateCartCount();
}

/* ─── TOAST ──────────────────────────────────────────────────────────────── */
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<span class="toast-dot"></span>${msg}`;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ─── MODAL ──────────────────────────────────────────────────────────────── */
function openModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}
function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
}

/* ─── REVEAL ─────────────────────────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ─── CLOSE ALL ──────────────────────────────────────────────────────────── */
function closeAll() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('searchBar').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
function debounce(fn, ms) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}
function fmtPrice(str) { return str; }

/* ─── SVG ICONS ──────────────────────────────────────────────────────────── */
const ICON = {
  bolt:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/></svg>`,
  leaf:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 3s-7 0-12 5-4 13-4 13 8-1 12-6 4-12 4-12z"/><path d="M3 21l7-7"/></svg>`,
  cpu:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>`,
  sun:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  wifi:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>`,
  shield:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6z"/></svg>`,
  map:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  phone:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 11 19.79 19.79 0 01.88 2.38 2 2 0 012.86.21h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  mail:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  clock:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  chat:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  tool:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  book:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
  cart:     `<svg viewBox="0 0 20 20" fill="none"><path d="M3 3h2l2.4 8h8l2-6H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="16" r="1.2" fill="currentColor"/><circle cx="15" cy="16" r="1.2" fill="currentColor"/></svg>`,
  arrow:    `<svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevdown: `<svg viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  user:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  package:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGES
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── HOME ───────────────────────────────────────────────────────────────── */
function renderHome(container) {
  container.innerHTML = `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-video-wrap">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,#0A0805 0%,#1A1208 30%,#2A1A0A 60%,#0A0805 100%);"></div>
        <!-- Animated grid texture -->
        <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(232,98,13,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,98,13,0.04) 1px,transparent 1px);background-size:60px 60px;opacity:.6;"></div>
        <!-- Orange glow -->
        <div style="position:absolute;right:-10%;bottom:-10%;width:70%;height:70%;background:radial-gradient(ellipse,rgba(232,98,13,0.18) 0%,transparent 65%);pointer-events:none;"></div>
        <!-- Industrial lines -->
        <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 3px);pointer-events:none;"></div>
        <div class="hero-video-wrap" style="position:absolute;inset:0;"></div>
      </div>
      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="dot"></span>
          VOLTRAX — Mobilidade Elétrica Industrial
        </div>
        <h1 class="hero-title">
          O Campo<br><span>Elétrico</span><br>Começa Aqui
        </h1>
        <p class="hero-sub">Maquinário agrícola elétrico de alta performance para o agronegócio. Zero emissão, máxima produtividade.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" onclick="navigate('/vehicles')">${ICON.arrow} Ver Veículos</button>
          <button class="btn btn-secondary btn-lg" onclick="navigate('/showroom')">Showroom 3D</button>
        </div>
        <div class="hero-metrics">
          <div class="hero-metric">
            <div class="hero-metric-value">480<span>kW</span></div>
            <div class="hero-metric-label">Potência Máxima</div>
          </div>
          <div class="hero-metric">
            <div class="hero-metric-value">18<span>h</span></div>
            <div class="hero-metric-label">Autonomia</div>
          </div>
          <div class="hero-metric">
            <div class="hero-metric-value">0</div>
            <div class="hero-metric-label">Emissões CO₂</div>
          </div>
          <div class="hero-metric">
            <div class="hero-metric-value">60<span>%</span></div>
            <div class="hero-metric-label">Menos Manutenção</div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-indicator-line"></div>
        <span class="scroll-indicator-text">Scroll</span>
      </div>
    </section>

    <!-- Metrics Strip -->
    <div class="metrics-strip">
      <div class="metrics-strip-inner">
        ${[['7', 'Modelos Disponíveis'],['850+','Produtores Atendidos'],['5','Estados com Filiais'],['12 Mi','Hectares Monitorados']].map(([n,l])=>`
          <div class="metric-item reveal">
            <div class="metric-number">${n}</div>
            <div class="metric-label">${l}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Features -->
    <section class="section">
      <div class="section-header reveal">
        <div class="section-eyebrow">Por que VOLTRAX</div>
        <h2 class="section-title">Tecnologia que<br>transforma o campo</h2>
      </div>
      <div class="features-grid">
        ${[
          [ICON.bolt,   'Potência Imediata',     'Torque máximo desde zero RPM. Os tratores elétricos VOLTRAX entregam força superior aos equivalentes a diesel, sem aquecimento.'],
          [ICON.leaf,   'Zero Emissão',           'Operação completamente limpa. Sem gases, sem fumaça, sem barulho excessivo. Agronegócio sustentável de verdade.'],
          [ICON.cpu,    'IA & Telemetria',        'Monitoramento em tempo real via plataforma VOLTRAX Connect. Diagnóstico preditivo, autonomia calculada e dados agronômicos integrados.'],
          [ICON.sun,    'Integração Solar',       'Sistema de recarga em campo via painéis fotovoltaicos. Custo energético próximo de zero com o kit solar VOLTRAX.'],
          [ICON.wifi,   'Conectividade Total',    'Cada veículo é uma estação de dados. Integração com os principais ERPs agrícolas e APIs abertas para desenvolvedores.'],
          [ICON.shield, 'Garantia Industrial',    '3 anos na bateria, 2 anos nos componentes eletroeletrônicos. Suporte técnico 24/7 e rede nacional de assistência.'],
        ].map(([icon,title,desc])=>`
          <div class="feature-card reveal">
            <div class="feature-icon">${icon}</div>
            <h3 class="feature-title">${title}</h3>
            <p class="feature-desc">${desc}</p>
          </div>`).join('')}
      </div>
    </section>

    <!-- Showcase -->
    <div class="showcase-split">
      <div class="showcase-img">
        <img src="https://images.unsplash.com/photo-1591093468677-c5a9f77aec5a?w=900&q=80" alt="VX-900 PRO" loading="lazy">
      </div>
      <div class="showcase-body">
        <div class="section-eyebrow">Destaque</div>
        <h2 class="section-title">VX-900 PRO</h2>
        <p class="section-sub">O trator elétrico mais potente do Brasil. 480 kW, 18 horas de autonomia e IA de condução autônoma nível 3.</p>
        <div class="showcase-specs">
          ${[['Potência','480 kW','650 cv'],['Autonomia','18 h','Carga contínua'],['Bateria','420 kWh','LFP'],['Recarga','2,5 h','150 kW DC']].map(([l,v,u])=>`
            <div class="spec-row">
              <span class="spec-label">${l}</span>
              <span class="spec-value">${v} <span>${u}</span></span>
            </div>`).join('')}
        </div>
        <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="navigate('/vehicles',{cat:'tractor'})">Ver Detalhes ${ICON.arrow}</button>
          <button class="btn btn-secondary" onclick="navigate('/showroom')">Showroom 3D</button>
        </div>
      </div>
    </div>

    <!-- CTA Band -->
    <div style="background:var(--clr-accent);padding:4rem 2rem;text-align:center;">
      <div style="max-width:700px;margin:0 auto;">
        <h2 style="font-family:var(--ff-display);font-weight:800;font-size:clamp(1.8rem,4vw,2.8rem);color:#fff;line-height:1.1;margin-bottom:1rem;">Pronto para eletrificar sua frota?</h2>
        <p style="color:rgba(255,255,255,.8);font-size:1.05rem;margin-bottom:2rem;">Fale com nossos consultores e descubra a solução certa para o seu agronegócio.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
          <button class="btn" style="background:#fff;color:var(--clr-accent);border-color:#fff;" onclick="navigate('/contact')">Falar com Consultor</button>
          <button class="btn" style="border:1.5px solid rgba(255,255,255,.4);color:#fff;background:transparent;" onclick="navigate('/branches')">Ver Filiais</button>
        </div>
      </div>
    </div>
  `;
}

/* ─── VEHICLES ───────────────────────────────────────────────────────────── */
function renderVehicles(container, params = {}) {
  const cats = [
    { key: 'all',       label: 'Todos' },
    { key: 'tractor',   label: 'Tratores' },
    { key: 'harvester', label: 'Colheitadeiras' },
    { key: 'sprayer',   label: 'Pulverizadores' },
    { key: 'loader',    label: 'Carregadeiras' },
    { key: 'excavator', label: 'Escavadeiras' },
    { key: 'forklift',  label: 'Empilhadeiras' },
    { key: 'new',       label: 'Novidades' },
  ];
  let activeCat = params.cat || 'all';

  function getFiltered() {
    if (activeCat === 'all') return VEHICLES;
    if (activeCat === 'new') return VEHICLES.filter(v => v.badge);
    return VEHICLES.filter(v => v.cat === activeCat);
  }

  function renderGrid() {
    const filtered = getFiltered();
    return filtered.map(v => `
      <div class="vehicle-card" onclick="openVehicleModal('${v.id}')">
        <div class="vehicle-card-img">
          <img src="${v.img}" alt="${v.name}" loading="lazy">
          ${v.badge ? `<span class="vehicle-card-badge">${v.badge}</span>` : ''}
        </div>
        <div class="vehicle-card-body">
          <div class="vehicle-card-cat">${catLabel(v.cat)}</div>
          <h3 class="vehicle-card-name">${v.name}</h3>
          <p class="vehicle-card-desc">${v.desc}</p>
          <div class="vehicle-card-stats">
            <div class="v-stat"><div class="v-stat-value">${v.power.split(' ')[0]}<span> ${v.power.split(' ')[1]||''}</span></div><div class="v-stat-label">Potência</div></div>
            <div class="v-stat"><div class="v-stat-value">${v.range}<span> h</span></div><div class="v-stat-label">Autonomia</div></div>
            <div class="v-stat"><div class="v-stat-value">${v.charge}<span> h</span></div><div class="v-stat-label">Recarga</div></div>
          </div>
          <div class="vehicle-card-footer">
            <div class="vehicle-price">A partir de <strong>${v.price}</strong></div>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openVehicleModal('${v.id}')">Ver mais</button>
          </div>
        </div>
      </div>`).join('') || `<p style="color:var(--clr-text3);grid-column:1/-1;padding:4rem;text-align:center;">Nenhum veículo nesta categoria.</p>`;
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-inner">
        <div class="breadcrumb"><a href="#" onclick="navigate('/home');return false;">Home</a><span>/</span><span>Veículos</span></div>
        <h1 class="section-title">Linha Completa de<br>Veículos Elétricos</h1>
        <p class="section-sub">Do trator ao pulverizador, cada máquina foi projetada para maximizar produtividade com zero emissão.</p>
      </div>
    </div>
    <section class="section">
      <div class="filter-bar" id="filterBar">
        ${cats.map(c=>`<button class="filter-btn${c.key===activeCat?' active':''}" data-cat="${c.key}">${c.label}</button>`).join('')}
      </div>
      <div class="vehicles-grid" id="vehicleGrid">${renderGrid()}</div>
    </section>`;

  // Filter events
  container.querySelector('#filterBar').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeCat = btn.dataset.cat;
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === activeCat));
    container.querySelector('#vehicleGrid').innerHTML = renderGrid();
  });
}

window.openVehicleModal = function(id) {
  const v = VEHICLES.find(x => x.id === id);
  if (!v) return;
  const html = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;">
      <div>
        <img src="${v.img}" alt="${v.name}" style="width:100%;border-radius:var(--r-lg);object-fit:cover;aspect-ratio:4/3;">
      </div>
      <div>
        <div class="product-cat">${catLabel(v.cat)}</div>
        <h2 class="product-name" style="font-size:2rem;">${v.name}</h2>
        <p style="color:var(--clr-text2);margin-bottom:1.5rem;line-height:1.7;">${v.desc}</p>
        <div class="product-specs-quick">
          <div class="qs"><div class="qs-label">Potência</div><div class="qs-value">${v.power}</div></div>
          <div class="qs"><div class="qs-label">Autonomia</div><div class="qs-value">${v.range}<span class="qs-unit">h</span></div></div>
          <div class="qs"><div class="qs-label">Recarga</div><div class="qs-value">${v.charge}<span class="qs-unit">h</span></div></div>
          <div class="qs"><div class="qs-label">Categoria</div><div class="qs-value" style="font-size:1rem;font-family:var(--ff-body);">${catLabel(v.cat)}</div></div>
        </div>
        <div class="product-price-block">
          <div class="product-price-label">Preço base</div>
          <div class="product-price-value">${v.price}</div>
        </div>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="closeModal();navigate('/contact')">Solicitar Proposta</button>
          <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <h3 style="font-family:var(--ff-display);font-weight:700;margin-bottom:1rem;">Especificações Técnicas</h3>
      <div class="tab-spec-list">
        ${Object.entries(v.specs||{}).map(([k,val])=>`<div class="tab-spec-row"><span class="tab-spec-key">${k}</span><span class="tab-spec-val">${val}</span></div>`).join('')}
      </div>
    </div>
    ${v.features?.length ? `
    <div style="margin-top:1.5rem;">
      <h3 style="font-family:var(--ff-display);font-weight:700;margin-bottom:1rem;">Recursos Incluídos</h3>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.5rem;">
        ${v.features.map(f=>`<li style="display:flex;align-items:center;gap:.75rem;font-size:.9rem;color:var(--clr-text2);"><span style="color:var(--clr-accent);font-weight:700;">✓</span>${f}</li>`).join('')}
      </ul>
    </div>` : ''}`;
  openModal(html);
};

/* ─── TECHNOLOGY ─────────────────────────────────────────────────────────── */
function renderTechnology(container) {
  container.innerHTML = `
    <div class="tech-hero-split">
      <div class="tech-hero-img">
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80" alt="Tecnologia" loading="lazy">
      </div>
      <div class="tech-hero-body">
        <div class="section-eyebrow">Inovação</div>
        <h1 class="section-title">Tecnologia que<br>redefine o agro</h1>
        <p class="section-sub">Cada veículo VOLTRAX é uma plataforma de dados e automação. IA embarcada, telemetria 24/7 e conectividade total.</p>
        <div style="margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="navigate('/showroom')">Ver em 3D</button>
          <button class="btn btn-secondary" onclick="navigate('/contact')">Falar com Engenheiro</button>
        </div>
      </div>
    </div>

    <!-- Telemetry preview -->
    <section class="section">
      <div class="section-header reveal">
        <div class="section-eyebrow">VOLTRAX Connect</div>
        <h2 class="section-title">Telemetria em tempo real</h2>
        <p class="section-sub">Monitore sua frota de qualquer lugar. Diagnóstico preditivo e alertas automáticos mantêm suas máquinas operando.</p>
      </div>
      <div class="telemetry-preview reveal">
        <div class="telemetry-header">
          <span class="telemetry-title">VX-900 PRO — UNIDADE #4721</span>
          <span class="telemetry-status" id="telemStatus">Conectado</span>
        </div>
        <div class="telemetry-grid" id="telemGrid">
          ${[
            ['--','kW','Potência Atual'],['--','%','Bateria'],['--','h','Autonomia Est.'],
            ['--','°C','Temp. Bateria'],['--','km/h','Velocidade'],['--','rpm','Motor'],
          ].map(([v,u,l])=>`
            <div class="telemetry-metric">
              <div class="telemetry-val" data-telem="${l}">${v}<span>${u}</span></div>
              <div class="telemetry-lbl">${l}</div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Tech Cards -->
    <section class="section" style="padding-top:0;">
      <div class="tech-grid">
        ${[
          ['01','IA Embarcada','Algoritmos de machine learning analisam padrões de operação para otimizar consumo, prever manutenção e sugerir rotas de menor gasto energético.'],
          ['02','Bateria LFP','Células de fosfato de ferro-lítio de última geração. Mais ciclos, mais segurança, zero efeito memória e degradação mínima em climas tropicais.'],
          ['03','Recarga Inteligente','O sistema identifica horários de menor tarifa e condições solares para programar recargas automáticas. ROI energético maximizado.'],
          ['04','Over-the-Air Updates','Atualizações de firmware e novas funcionalidades entregues remotamente. Seu veículo evolui sem precisar ir à oficina.'],
          ['05','API Aberta','Integre a telemetria VOLTRAX ao seu ERP, plataforma de gestão ou sistema de rastreamento via API RESTful com documentação completa.'],
          ['06','Segurança Cibernética','Comunicação criptografada end-to-end, autenticação multifator e isolamento de rede por veículo. Dados protegidos por padrão.'],
        ].map(([n,t,d])=>`
          <div class="tech-card reveal">
            <div class="tech-card-number">${n}</div>
            <h3 class="tech-card-title">${t}</h3>
            <p class="tech-card-body">${d}</p>
          </div>`).join('')}
      </div>
    </section>`;

  // Animate telemetry values
  setTimeout(() => {
    const data = [
      ['Potência Atual','312','kW'],['Bateria','78','%'],['Autonomia Est.','14,2','h'],
      ['Temp. Bateria','34','°C'],['Velocidade','8','km/h'],['Motor','1240','rpm'],
    ];
    data.forEach(([label, value, unit]) => {
      const el = container.querySelector(`[data-telem="${label}"]`);
      if (el) el.innerHTML = `${value}<span>${unit}</span>`;
    });
  }, 800);
}

/* ─── ENERGY ─────────────────────────────────────────────────────────────── */
function renderEnergy(container) {
  container.innerHTML = `
    <div class="energy-hero">
      <div class="energy-hero-content">
        <div class="section-eyebrow">Energia</div>
        <h1 class="section-title" style="max-width:700px;">Da luz do sol<br>ao campo em movimento</h1>
        <p class="section-sub" style="max-width:560px;">O ecossistema energético VOLTRAX integra solar, armazenamento e recarga inteligente para custo operacional perto de zero.</p>
        <div class="energy-stats-grid" style="margin-top:3rem;max-width:900px;">
          ${[['95%','Eficiência Painéis'],['2,5h','Recarga Rápida'],['0','Emissões de CO₂'],['25 anos','Vida Útil Painéis']].map(([v,l])=>`
            <div class="energy-stat">
              <div class="energy-stat-value">${v}</div>
              <div class="energy-stat-label">${l}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <section class="section">
      <div class="section-header reveal">
        <div class="section-eyebrow">Como Funciona</div>
        <h2 class="section-title">Do painel ao trator</h2>
      </div>
      <div class="solar-diagram reveal">
        <div class="solar-diagram-title">Fluxo de Energia VOLTRAX</div>
        <div class="solar-steps">
          ${[
            [ICON.sun,   'Geração Solar', 'Painéis bifaciais em campo'],
            [ICON.bolt,  'Inversor Smart','Conversão e gestão DC/AC'],
            [ICON.shield,'Armazenamento', 'Banco de baterias estacionário'],
            [ICON.bolt,  'Carregador',    'Estação de recarga rápida'],
            [ICON.cpu,   'Veículo',       'Frota 100% elétrica operando'],
          ].map(([icon,l,d])=>`
            <div class="solar-step">
              <div class="solar-step-icon">${icon}</div>
              <div class="solar-step-label">${l}</div>
              <div class="solar-step-desc">${d}</div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
        <div class="reveal">
          <div class="section-eyebrow">Performance</div>
          <h2 class="section-title" style="font-size:2.2rem;">Eficiência em números</h2>
          <p class="section-sub">Os painéis VOLTRAX SolarBR alcançam os maiores índices de eficiência em condições tropicais.</p>
          <div class="efficiency-bar-list" style="margin-top:2rem;" id="effBars">
            ${[['Eficiência Painel Mono','95',95],['Taxa de Recarga DC','98',98],['Rendimento Inversor','97',97],['Ciclos Bateria LFP','96',96]].map(([l,v,w])=>`
              <div class="eff-bar">
                <div class="eff-bar-header"><span class="eff-bar-label">${l}</span><span class="eff-bar-val">${v}%</span></div>
                <div class="eff-bar-track"><div class="eff-bar-fill" style="--target-w:${w}%" data-w="${w}"></div></div>
              </div>`).join('')}
          </div>
        </div>
        <div class="reveal reveal-delay-2">
          <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80" alt="Solar" loading="lazy" style="width:100%;border-radius:var(--r-xl);object-fit:cover;aspect-ratio:4/3;">
        </div>
      </div>
    </section>`;

  // Animate bars on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        container.querySelectorAll('.eff-bar-fill').forEach(b => b.classList.add('animated'));
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const bars = container.querySelector('#effBars');
  if (bars) io.observe(bars);
}

/* ─── MARKETPLACE ────────────────────────────────────────────────────────── */
function renderMarketplace(container, params = {}) {
  const cats = [
    { key: 'all', label: 'Todos' },
    { key: 'batteries', label: 'Baterias' },
    { key: 'solar', label: 'Solar' },
    { key: 'parts', label: 'Componentes' },
    { key: 'accessories', label: 'Acessórios' },
    { key: 'maintenance', label: 'Serviços' },
  ];
  let activeCat = params.cat || 'all';

  function renderGrid() {
    const items = activeCat === 'all' ? MARKETPLACE_PRODUCTS : MARKETPLACE_PRODUCTS.filter(p => p.cat === activeCat);
    return items.map(p => `
      <div class="product-card">
        <div class="product-card-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card-body">
          <div class="product-card-cat">${catLabel(p.cat)}</div>
          <div class="product-card-name">${p.name}</div>
          <p class="product-card-desc">${p.desc}</p>
          <div class="product-card-footer">
            <div class="product-card-price">${p.price}</div>
            <button class="add-to-cart-btn" onclick='addToCartById("${p.id}")'>${ICON.cart}</button>
          </div>
        </div>
      </div>`).join('') || `<p style="color:var(--clr-text3);grid-column:1/-1;padding:4rem;text-align:center;">Nenhum produto nesta categoria.</p>`;
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-inner">
        <div class="breadcrumb"><a href="#" onclick="navigate('/home');return false;">Home</a><span>/</span><span>Loja</span></div>
        <h1 class="section-title">Peças, Energia &<br>Acessórios</h1>
        <p class="section-sub">Tudo que sua frota elétrica precisa para operar no máximo da eficiência.</p>
      </div>
    </div>
    <section class="section">
      <div class="filter-bar" id="mktFilterBar">
        ${cats.map(c=>`<button class="filter-btn${c.key===activeCat?' active':''}" data-cat="${c.key}">${c.label}</button>`).join('')}
      </div>
      <div class="marketplace-grid" id="mktGrid">${renderGrid()}</div>
    </section>`;

  container.querySelector('#mktFilterBar').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeCat = btn.dataset.cat;
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === activeCat));
    container.querySelector('#mktGrid').innerHTML = renderGrid();
  });
}

window.addToCartById = function(id) {
  const p = MARKETPLACE_PRODUCTS.find(x => x.id === id);
  if (p) addToCart(p);
};

/* ─── BRANCHES ───────────────────────────────────────────────────────────── */
function renderBranches(container) {
  let activeBranch = BRANCHES[0];

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-inner">
        <div class="breadcrumb"><a href="#" onclick="navigate('/home');return false;">Home</a><span>/</span><span>Filiais</span></div>
        <h1 class="section-title">Nossa Rede<br>de Filiais</h1>
        <p class="section-sub">Presença em 5 estados com assistência técnica, showroom e estoque de peças.</p>
      </div>
    </div>
    <section class="section">
      <div class="branches-layout">
        <div>
          <div class="branches-list" id="branchList">
            ${BRANCHES.map(b => `
              <div class="branch-item${b.id===activeBranch.id?' active':''}" data-id="${b.id}">
                <div class="branch-item-name">${b.name}</div>
                <div class="branch-item-state">${b.state}</div>
              </div>`).join('')}
          </div>
          <div class="branch-detail" id="branchDetail">
            ${renderBranchDetail(activeBranch)}
          </div>
        </div>
        <div class="branch-map-wrap">
          <div id="leaflet-map"></div>
        </div>
      </div>
    </section>`;

  // Branch list click
  container.querySelector('#branchList').addEventListener('click', e => {
    const item = e.target.closest('.branch-item');
    if (!item) return;
    const id = parseInt(item.dataset.id);
    activeBranch = BRANCHES.find(b => b.id === id);
    container.querySelectorAll('.branch-item').forEach(el => el.classList.toggle('active', parseInt(el.dataset.id) === id));
    container.querySelector('#branchDetail').innerHTML = renderBranchDetail(activeBranch);
    panMapTo(activeBranch.lat, activeBranch.lng);
  });

  // Init map
  setTimeout(() => initLeafletMap(container, activeBranch), 100);
}

function renderBranchDetail(b) {
  return `
    <h3>${b.name}</h3>
    <div class="branch-info-list">
      <div class="branch-info-row">${ICON.map}<span>${b.address}</span></div>
      <div class="branch-info-row">${ICON.phone}<span>${b.phone}</span></div>
      <div class="branch-info-row">${ICON.mail}<span>${b.email}</span></div>
      <div class="branch-info-row">${ICON.clock}<span>${b.hours}</span></div>
    </div>
    <button class="btn btn-primary btn-sm" style="margin-top:1.25rem;" onclick="navigate('/contact')">Contato direto</button>`;
}

let leafletMap = null;
let leafletMarkers = [];
function initLeafletMap(container, active) {
  if (typeof L === 'undefined') return;
  const mapEl = container.querySelector('#leaflet-map');
  if (!mapEl) return;
  if (leafletMap) { leafletMap.remove(); leafletMap = null; }
  leafletMap = L.map(mapEl, { zoomControl: true, scrollWheelZoom: false }).setView([-15.5, -52], 4);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '©OpenStreetMap ©CartoDB', subdomains: 'abcd', maxZoom: 19
  }).addTo(leafletMap);

  const icon = L.divIcon({ className: '', html: `<div style="width:14px;height:14px;background:#E8620D;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 2px #E8620D;"></div>`, iconSize: [14,14], iconAnchor: [7,7] });

  leafletMarkers = BRANCHES.map(b => {
    const m = L.marker([b.lat, b.lng], { icon }).addTo(leafletMap);
    m.bindPopup(`<strong>${b.name}</strong><br>${b.address}`);
    return { id: b.id, marker: m };
  });
}
function panMapTo(lat, lng) {
  if (!leafletMap) return;
  leafletMap.setView([lat, lng], 8, { animate: true });
}

/* ─── SHOWROOM ───────────────────────────────────────────────────────────── */
function renderShowroom(container) {
  const models = [
    { key: 'vx900', label: 'VX-900 PRO' },
    { key: 'vx600', label: 'VX-600' },
    { key: 'ch800', label: 'CH-800 HARVEST' },
  ];
  let activeModel = 'vx900';

  container.innerHTML = `
    <div class="showroom-hero">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(232,98,13,0.15) 0%,transparent 70%);"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,#060402,#1A1008 50%,#060402);opacity:.95;"></div>
      <div class="showroom-hero-content">
        <div class="section-eyebrow" style="justify-content:center;margin-bottom:1.5rem;">Showroom Virtual</div>
        <h1 class="section-title" style="font-size:clamp(2.5rem,8vw,6rem);text-align:center;letter-spacing:-.04em;">Experimente<br>em 3D</h1>
        <p style="color:var(--clr-text2);margin:1.5rem auto;max-width:500px;text-align:center;line-height:1.7;">Interaja com os modelos, gire, explore cada detalhe. Clique e arraste para navegar.</p>
        <div class="showroom-model-switcher" style="margin-bottom:2rem;">
          ${models.map(m=>`<button class="model-btn${m.key===activeModel?' active':''}" data-key="${m.key}">${m.label}</button>`).join('')}
        </div>
      </div>
    </div>

    <!-- 3D Section -->
    <div class="threejs-section">
      <div class="threejs-inner">
        <div>
          <canvas id="threejs-canvas"></canvas>
          <div class="threejs-controls">
            <button class="threejs-btn" id="btnWire">Wireframe</button>
            <button class="threejs-btn" id="btnSolid">Sólido</button>
            <button class="threejs-btn" id="btnReset">Resetar</button>
            <button class="threejs-btn" id="btnAuto">Auto-Rotação</button>
          </div>
        </div>
        <div class="threejs-info">
          <div class="section-eyebrow">Modelo 3D</div>
          <h2 class="section-title" style="font-size:2rem;" id="modelTitle">VX-900 PRO</h2>
          <p style="color:var(--clr-text2);line-height:1.7;margin-bottom:2rem;" id="modelDesc">
            Explore o trator elétrico mais potente do Brasil em total detalhe. Arraste para girar, scroll para zoom.
          </p>
          <div class="product-specs-quick" id="modelSpecs">
            <div class="qs"><div class="qs-label">Potência</div><div class="qs-value">480<span class="qs-unit">kW</span></div></div>
            <div class="qs"><div class="qs-label">Autonomia</div><div class="qs-value">18<span class="qs-unit">h</span></div></div>
            <div class="qs"><div class="qs-label">Bateria</div><div class="qs-value">420<span class="qs-unit">kWh</span></div></div>
            <div class="qs"><div class="qs-label">Recarga</div><div class="qs-value">2,5<span class="qs-unit">h</span></div></div>
          </div>
          <button class="btn btn-primary" onclick="navigate('/contact')">Solicitar Demonstração</button>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div class="showroom-gallery">
      <div class="showroom-gallery-inner">
        <div class="section-header reveal">
          <div class="section-eyebrow">Galeria</div>
          <h2 class="section-title">Cada ângulo conta</h2>
        </div>
        <div class="showroom-grid">
          ${[
            {img:'https://images.unsplash.com/photo-1591093468677-c5a9f77aec5a?w=900&q=80',label:'VX-900 PRO — Vista lateral'},
            {img:'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80',label:'VX-600 — Campo'},
            {img:'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',label:'CH-800 — Colheita'},
            {img:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',label:'SP-400 — Pulverização'},
            {img:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',label:'CL-300 — Galpão'},
          ].map(({img,label})=>`
            <div class="showroom-grid-item">
              <img src="${img}" alt="${label}" loading="lazy">
              <div class="showroom-grid-item-overlay"><span class="showroom-grid-label">${label}</span></div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Comparison Table -->
    <section class="section">
      <div class="section-header reveal">
        <div class="section-eyebrow">Comparativo</div>
        <h2 class="section-title">Compare a linha</h2>
      </div>
      <div style="overflow-x:auto;">
        <table class="comparison-table reveal">
          <thead>
            <tr>
              <th>Especificação</th>
              <th>VX-600</th>
              <th class="comparison-highlight">VX-900 PRO</th>
              <th>CH-800</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['Potência','320 kW','480 kW','560 kW'],
              ['Autonomia','14h','18h','10h'],
              ['Bateria','280 kWh','420 kWh','500 kWh'],
              ['Recarga rápida','3h','2,5h','4h'],
              ['IA embarcada','Básica','Avançada (Nv.3)','Avançada'],
              ['Autonomia autônoma','Não','Sim','Sim'],
              ['Preço base','R$ 620.000','R$ 890.000','R$ 1.450.000'],
            ].map(([k,...vals])=>`
              <tr>
                <td>${k}</td>
                ${vals.map((v,i)=>`<td${i===1?' class="comparison-highlight"':''}>${v}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;

  // Model switcher
  container.querySelectorAll('.model-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.model-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeModel = btn.dataset.key;
      updateShowroomInfo(container, activeModel);
    });
  });

  // Init Three.js after DOM is ready
  setTimeout(() => initThreeJS(container), 200);
}

function updateShowroomInfo(container, key) {
  const info = {
    vx900: { title:'VX-900 PRO', desc:'O trator elétrico mais potente do Brasil. IA de condução autônoma nível 3.', specs:[['480','kW','Potência'],['18','h','Autonomia'],['420','kWh','Bateria'],['2,5','h','Recarga']] },
    vx600: { title:'VX-600', desc:'Potência e eficiência para médias propriedades. Ideal para cultivo contínuo.', specs:[['320','kW','Potência'],['14','h','Autonomia'],['280','kWh','Bateria'],['3','h','Recarga']] },
    ch800: { title:'CH-800 HARVEST', desc:'Colheitadeira elétrica de alta capacidade. Grãos e cana-de-açúcar.', specs:[['560','kW','Potência'],['10','h','Autonomia'],['500','kWh','Bateria'],['4','h','Recarga']] },
  }[key];
  if (!info) return;
  container.querySelector('#modelTitle').textContent = info.title;
  container.querySelector('#modelDesc').textContent = info.desc;
  container.querySelector('#modelSpecs').innerHTML = info.specs.map(([v,u,l])=>`<div class="qs"><div class="qs-label">${l}</div><div class="qs-value">${v}<span class="qs-unit">${u}</span></div></div>`).join('');
  // Rebuild 3D shape
  initThreeJS(container);
}

function initThreeJS(container) {
  if (typeof THREE === 'undefined') return;
  const canvas = container.querySelector('#threejs-canvas');
  if (!canvas) return;

  // Cleanup previous
  if (STATE.threeScene && STATE.threeScene._animId) {
    cancelAnimationFrame(STATE.threeScene._animId);
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  const W = canvas.offsetWidth || 600;
  const H = canvas.offsetHeight || 450;
  renderer.setSize(W, H);
  renderer.setClearColor(0x1A1510, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.set(0, 1.5, 5);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 8, 5);
  scene.add(dir);
  const orange = new THREE.PointLight(0xe8620d, 1.5, 10);
  orange.position.set(-3, 2, 2);
  scene.add(orange);

  // Build a stylized tractor-like shape from primitives
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1A1510, metalness: 0.6, roughness: 0.4 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xe8620d, metalness: 0.3, roughness: 0.5 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0A0805, metalness: 0.8, roughness: 0.2 });

  // Main body (cab + engine)
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1, 3), bodyMat);
  body.position.set(0, 0.5, 0);
  group.add(body);

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.6), bodyMat);
  cab.position.set(0, 1.45, -0.5);
  group.add(cab);

  // Cab accent top
  const cabTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 1.6), accentMat);
  cabTop.position.set(0, 1.9, -0.5);
  group.add(cabTop);

  // Hood
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 1.4), bodyMat);
  hood.position.set(0, 0.85, 0.9);
  group.add(hood);

  // Orange stripe
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.21, 0.15, 3.01), accentMat);
  stripe.position.set(0, 0.55, 0);
  group.add(stripe);

  // Rear large wheels
  const rWheelGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.45, 32);
  [[1.35, 0, 0.5], [-1.35, 0, 0.5]].forEach(([x,y,z]) => {
    const w = new THREE.Mesh(rWheelGeo, darkMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(x, y, z);
    group.add(w);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.5, 16), accentMat);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(x, y, z);
    group.add(rim);
  });

  // Front smaller wheels
  const fWheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 32);
  [[1.2, -0.3, -1.2], [-1.2, -0.3, -1.2]].forEach(([x,y,z]) => {
    const w = new THREE.Mesh(fWheelGeo, darkMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(x, y, z);
    group.add(w);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.38, 16), accentMat);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(x, y, z);
    group.add(rim);
  });

  // Grid on windows
  const winMat = new THREE.MeshStandardMaterial({ color: 0x223344, metalness: 0.1, roughness: 0.9, transparent: true, opacity: 0.7 });
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.65, 0.05), winMat);
  win.position.set(0, 1.45, -1.29);
  group.add(win);

  // Exhaust
  const exh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 12), accentMat);
  exh.position.set(0.5, 1.6, 0.8);
  group.add(exh);

  group.position.y = -0.5;
  group.rotation.y = Math.PI / 6;
  scene.add(group);

  // Grid floor
  const gridHelper = new THREE.GridHelper(10, 20, 0xe8620d, 0x231c14);
  gridHelper.position.y = -0.5;
  scene.add(gridHelper);

  // Interaction
  let isDragging = false, prevX = 0, prevY = 0;
  let autoRotate = false;

  canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    group.rotation.y += dx * 0.01;
    group.rotation.x += dy * 0.005;
    group.rotation.x = Math.max(-0.5, Math.min(0.5, group.rotation.x));
    prevX = e.clientX; prevY = e.clientY;
  });
  canvas.addEventListener('mouseup', () => { isDragging = false; });
  canvas.addEventListener('mouseleave', () => { isDragging = false; });
  canvas.addEventListener('wheel', e => {
    camera.position.z = Math.max(2.5, Math.min(9, camera.position.z + e.deltaY * 0.005));
  }, { passive: true });

  // Touch support
  let touchStartX = 0;
  canvas.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  canvas.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - touchStartX;
    group.rotation.y += dx * 0.01;
    touchStartX = e.touches[0].clientX;
  });

  container.querySelector('#btnWire').addEventListener('click', () => {
    group.traverse(c => { if (c.material) c.material.wireframe = true; });
  });
  container.querySelector('#btnSolid').addEventListener('click', () => {
    group.traverse(c => { if (c.material) c.material.wireframe = false; });
  });
  container.querySelector('#btnReset').addEventListener('click', () => {
    group.rotation.set(0, Math.PI / 6, 0);
    camera.position.set(0, 1.5, 5);
  });
  container.querySelector('#btnAuto').addEventListener('click', () => {
    autoRotate = !autoRotate;
    container.querySelector('#btnAuto').classList.toggle('active', autoRotate);
  });

  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    if (autoRotate && !isDragging) group.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  STATE.threeScene = { _animId: animId };
  animate();
  STATE.threeScene._animId = animId;
}

/* ─── SPONSORS ───────────────────────────────────────────────────────────── */
function renderSponsors(container) {
  const allSponsors = [...SPONSORS, ...SPONSORS]; // duplicate for infinite scroll
  container.innerHTML = `
    <div class="sponsors-hero">
      <div class="section-eyebrow" style="justify-content:center;">Parceiros</div>
      <h1 class="section-title">Juntos pelo<br>agro elétrico</h1>
      <p class="section-sub" style="margin:1rem auto 0;text-align:center;">Empresas que acreditam e investem na transformação do campo brasileiro.</p>
    </div>

    <div class="sponsors-carousel">
      <div class="sponsors-track">
        ${allSponsors.map(s=>`<div class="sponsor-logo"><span>${s.name}</span></div>`).join('')}
      </div>
    </div>

    <section class="section">
      <div class="section-header reveal">
        <div class="section-eyebrow">Rede de Parceiros</div>
        <h2 class="section-title">Ecossistema VOLTRAX</h2>
      </div>
      <div class="sponsors-grid">
        ${SPONSORS.map(s=>`
          <div class="sponsor-card reveal">
            <div class="sponsor-card-logo">${s.name}</div>
            <p class="sponsor-card-desc">${s.desc}</p>
            <span class="sponsor-card-type">${s.type}</span>
          </div>`).join('')}
      </div>
    </section>

    <div style="background:var(--clr-surface);border-top:1px solid var(--clr-border);padding:5rem 2rem;text-align:center;">
      <div style="max-width:600px;margin:0 auto;">
        <div class="section-eyebrow" style="justify-content:center;">Seja um Parceiro</div>
        <h2 class="section-title" style="font-size:2.2rem;margin:1rem 0;">Construa o futuro<br>conosco</h2>
        <p style="color:var(--clr-text2);line-height:1.7;margin-bottom:2rem;">Se sua empresa compartilha da visão de um agronegócio mais sustentável e eficiente, queremos conversar.</p>
        <button class="btn btn-primary btn-lg" onclick="navigate('/contact')">Falar sobre parceria</button>
      </div>
    </div>`;
}

/* ─── ABOUT ──────────────────────────────────────────────────────────────── */
function renderAbout(container) {
  container.innerHTML = `
    <div class="about-hero">
      <div class="about-hero-inner">
        <div class="section-eyebrow">Nossa História</div>
        <h1 class="section-title" style="max-width:800px;">Fundada para<br>reinventar o campo</h1>
        <p class="section-sub">VOLTRAX nasceu em 2019 da convicção de que o agronegócio brasileiro merecia uma alternativa ao diesel: mais limpa, mais eficiente e mais inteligente.</p>
        <div class="about-timeline">
          ${[
            ['2019','Fundação em Uberlândia','Três engenheiros decidem que maquinário agrícola elétrico de verdade é possível e necessário.'],
            ['2020','Primeiro Protótipo','O protótipo VX-Alpha percorre 12 horas em uma fazenda experimental no Mato Grosso.'],
            ['2021','Primeira linha de produção','A planta industrial em Sorocaba inicia produção do VX-600 com demanda pré-existente de 80 unidades.'],
            ['2022','Expansão Nacional','Abertura das filiais de RS, GO e MT. Mais de 200 veículos entregues.'],
            ['2023','VOLTRAX Connect','Lançamento da plataforma de telemetria com IA. Mais de 850 produtores conectados.'],
            ['2024','VX-900 PRO & Solar','Modelo top de linha e sistema de energia solar lançados simultaneamente.'],
            ['2025','Expansão Internacional','Início das operações no Uruguai e negociações para Argentina e Paraguai.'],
          ].map(([y,t,d])=>`
            <div class="timeline-item reveal">
              <div class="timeline-year">${y}</div>
              <div class="timeline-title">${t}</div>
              <div class="timeline-desc">${d}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <section class="section">
      <div class="section-header reveal">
        <div class="section-eyebrow">Nosso Time</div>
        <h2 class="section-title">As pessoas<br>que movem o campo</h2>
      </div>
      <div class="team-grid">
        ${[
          ['Felipe Haniel','CEO & Co-fundador',],
          ['Jhonatan ','PEO & Co-fundador',],
          ['Luiz Bonfim','Diretor de Engenharia',],
          ['Gheovanna Machado','Diretora Comercial',],
          ['Heitor Rodrigues','Contador e Programador',]
        ].map(([n,r,img])=>`
          <div class="team-card reveal">
            <div class="team-photo"><img src="${img}" alt="${n}" loading="lazy"></div>
            <div class="team-info">
              <div class="team-name">${n}</div>
              <div class="team-role">${r}</div>
            </div>
          </div>`).join('')}
      </div>
    </section>

    <!-- Values -->
    <section class="section" style="padding-top:0;">
      <div class="features-grid">
        ${[
          ['Sustentabilidade','Zero emissões não é slogan — é requisito de engenharia em cada produto que desenvolvemos.'],
          ['Eficiência Real','Performance que supera o diesel em trabalho real, não apenas em folhas de especificação.'],
          ['Tecnologia Acessível','Inovação que funciona no cerrado, no pampa e na floresta. Robustez brasileira, tecnologia global.'],
          ['Transparência','Dados abertos de telemetria, garantias claras e suporte sem letras miúdas.'],
        ].map(([t,d])=>`
          <div class="feature-card reveal">
            <div class="feature-title" style="font-size:1.3rem;">${t}</div>
            <p class="feature-desc">${d}</p>
          </div>`).join('')}
      </div>
    </section>`;
}

/* ─── SUPPORT ────────────────────────────────────────────────────────────── */
function renderSupport(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-inner">
        <div class="breadcrumb"><a href="#" onclick="navigate('/home');return false;">Home</a><span>/</span><span>Suporte</span></div>
        <h1 class="section-title">Central de<br>Suporte VOLTRAX</h1>
        <p class="section-sub">Estamos aqui para ajudar. Escolha o canal mais rápido para você.</p>
      </div>
    </div>

    <section class="section">
      <div class="support-grid">
        ${[
          [ICON.chat,'Chat ao vivo','Fale agora com um técnico VOLTRAX. Atendimento em tempo real.','Iniciar Chat'],
          [ICON.phone,'Telefone','(11) 3000-8800. Seg-Sex, 7h–20h.','Ligar agora'],
          [ICON.mail,'E-mail','suporte@voltrax.com.br. Resposta em até 4 horas úteis.','Enviar e-mail'],
          [ICON.tool,'Assistência técnica','Agende uma visita do técnico à sua propriedade.','Agendar visita'],
          [ICON.book,'Documentação','Manuais, guias e tutoriais para todos os modelos.','Ver documentação'],
          [ICON.cpu,'Diagnóstico remoto','Conecte seu veículo à plataforma para diagnóstico em tempo real.','Conectar frota'],
        ].map(([icon,t,d,cta])=>`
          <div class="support-card reveal" onclick="navigate('/contact')">
            <div class="support-card-icon">${icon}</div>
            <h3 class="support-card-title">${t}</h3>
            <p class="support-card-desc">${d}</p>
            <button class="btn btn-ghost btn-sm" style="margin-top:1rem;">${cta} ${ICON.arrow}</button>
          </div>`).join('')}
      </div>

      <div class="divider"></div>
      <div class="section-header reveal">
        <div class="section-eyebrow">FAQ</div>
        <h2 class="section-title">Perguntas frequentes</h2>
      </div>
      <div class="faq-list" id="faqList">
        ${FAQ.map((f,i)=>`
          <div class="faq-item" data-faq="${i}">
            <button class="faq-question">
              ${f.q}
              <svg class="faq-arrow" viewBox="0 0 20 20" fill="none"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <div class="faq-answer"><p style="padding-bottom:0;">${f.a}</p></div>
          </div>`).join('')}
      </div>
    </section>`;

  // FAQ accordion
  container.querySelector('#faqList').addEventListener('click', e => {
    const item = e.target.closest('.faq-item');
    if (!item) return;
    const isOpen = item.classList.contains('open');
    container.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
}

/* ─── CONTACT ────────────────────────────────────────────────────────────── */
function renderContact(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-inner">
        <div class="breadcrumb"><a href="#" onclick="navigate('/home');return false;">Home</a><span>/</span><span>Contato</span></div>
        <h1 class="section-title">Fale com<br>a VOLTRAX</h1>
        <p class="section-sub">Nossa equipe responde em até 4 horas úteis. Para urgências, ligue direto.</p>
      </div>
    </div>
    <section class="section">
      <div class="contact-split">
        <div class="contact-info reveal">
          ${[
            [ICON.phone,'Telefone','(11) 3000-8800'],
            [ICON.mail,'E-mail','contato@voltrax.com.br'],
            [ICON.map,'Sede','Av. Paulista, 2000 — São Paulo, SP'],
            [ICON.clock,'Horário','Segunda a Sexta, 8h às 18h'],
          ].map(([icon,label,value])=>`
            <div class="contact-item">
              <div class="contact-item-icon">${icon}</div>
              <div>
                <div class="contact-item-label">${label}</div>
                <div class="contact-item-value">${value}</div>
              </div>
            </div>`).join('')}
          <div style="margin-top:1rem;">
            <p style="font-size:.85rem;color:var(--clr-text2);margin-bottom:1rem;">Ou acesse nossas filiais diretamente:</p>
            <button class="btn btn-secondary btn-sm" onclick="navigate('/branches')">${ICON.map} Ver Filiais</button>
          </div>
        </div>
        <div class="contact-form reveal reveal-delay-2">
          <h3>Envie uma mensagem</h3>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nome</label>
              <input class="form-input" type="text" id="cName" placeholder="Seu nome completo">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input class="form-input" type="text" id="cCompany" placeholder="Nome da fazenda ou empresa">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input class="form-input" type="email" id="cEmail" placeholder="seu@email.com">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input class="form-input" type="tel" id="cPhone" placeholder="(00) 00000-0000">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Assunto</label>
            <select class="form-input" id="cSubject" style="cursor:pointer;">
              <option value="">Selecione o assunto</option>
              <option value="commercial">Proposta Comercial</option>
              <option value="demo">Agendar Demonstração</option>
              <option value="support">Suporte Técnico</option>
              <option value="partnership">Parceria</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Mensagem</label>
            <textarea class="form-textarea" id="cMessage" placeholder="Conte-nos sobre suas necessidades, frota atual e objetivos..."></textarea>
          </div>
          <button class="btn btn-primary" id="cSubmit" style="width:100%;">Enviar mensagem ${ICON.arrow}</button>
        </div>
      </div>
    </section>`;

  container.querySelector('#cSubmit').addEventListener('click', () => {
    const name    = container.querySelector('#cName').value.trim();
    const email   = container.querySelector('#cEmail').value.trim();
    const msg     = container.querySelector('#cMessage').value.trim();
    if (!name || !email || !msg) { showToast('Preencha nome, e-mail e mensagem.', 'error'); return; }
    if (!email.includes('@')) { showToast('E-mail inválido.', 'error'); return; }
    showToast('Mensagem enviada! Retornaremos em até 4h úteis.', 'success');
    ['#cName','#cCompany','#cEmail','#cPhone','#cSubject','#cMessage'].forEach(s => {
      const el = container.querySelector(s);
      if (el) el.value = '';
    });
  });
}

/* ─── CART ───────────────────────────────────────────────────────────────── */
function renderCart(container) {
  function build() {
    if (STATE.cart.length === 0) {
      return `
        <div class="page-header"><div class="page-header-inner">
          <h1 class="section-title">Meu Carrinho</h1>
        </div></div>
        <section class="section">
          <div class="cart-empty">
            ${ICON.cart}
            <h3>Carrinho vazio</h3>
            <p style="margin-bottom:2rem;">Explore nossa loja e adicione produtos.</p>
            <button class="btn btn-primary" onclick="navigate('/marketplace')">Ir para a Loja</button>
          </div>
        </section>`;
    }

    const subtotal = STATE.cart.reduce((s, i) => {
      const num = parseFloat((i.price || '0').replace(/[^\d,]/g,'').replace(',','.')) || 0;
      return s + num * i.qty;
    }, 0);

    return `
      <div class="page-header"><div class="page-header-inner">
        <div class="breadcrumb"><a href="#" onclick="navigate('/home');return false;">Home</a><span>/</span><span>Carrinho</span></div>
        <h1 class="section-title">Meu Carrinho</h1>
        <p class="section-sub">${STATE.cart.length} ${STATE.cart.length === 1 ? 'item' : 'itens'} no carrinho</p>
      </div></div>
      <section class="section">
        <div class="cart-layout">
          <div class="cart-items">
            ${STATE.cart.map(item => `
              <div class="cart-item">
                <div class="cart-item-img"><img src="${item.img || ''}" alt="${item.name}" loading="lazy"></div>
                <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-cat">${catLabel(item.cat || '')}</div>
                  <div class="cart-item-controls">
                    <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                    <span class="qty-display">${item.qty}</span>
                    <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                    <div class="cart-item-price">${item.price}</div>
                    <button class="cart-remove" data-remove="${item.id}" title="Remover">×</button>
                  </div>
                </div>
              </div>`).join('')}
          </div>
          <div class="cart-summary">
            <h3>Resumo do Pedido</h3>
            <div class="cart-summary-row"><span>Subtotal</span><span>${fmtCartTotal(subtotal)}</span></div>
            <div class="cart-summary-row"><span>Frete</span><span>A calcular</span></div>
            <div class="cart-summary-row"><span>Financiamento</span><span>Disponível</span></div>
            <div class="cart-total-row">
              <span>Total</span>
              <span class="cart-total-val">${fmtCartTotal(subtotal)}</span>
            </div>
            <button class="btn btn-primary" style="width:100%;margin-top:1rem;" onclick="navigate('/contact')">Finalizar Pedido</button>
            <button class="btn btn-secondary btn-sm" style="width:100%;margin-top:.75rem;" onclick="navigate('/marketplace')">Continuar comprando</button>
            <p style="font-size:.75rem;color:var(--clr-text3);margin-top:1rem;text-align:center;">Pagamento e entrega confirmados após consulta comercial.</p>
          </div>
        </div>
      </section>`;
  }

  function fmtCartTotal(num) {
    if (!num) return 'R$ 0,00';
    return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  container.innerHTML = build();

  container.addEventListener('click', e => {
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
      const id    = qtyBtn.dataset.id;
      const delta = parseInt(qtyBtn.dataset.delta);
      updateCartQty(id, delta);
      container.innerHTML = build();
      container.addEventListener('click', arguments.callee, { once: true });
      return;
    }
    const rem = e.target.closest('[data-remove]');
    if (rem) {
      removeFromCart(rem.dataset.remove);
      container.innerHTML = build();
    }
  });
}

/* ─── LOGIN / AUTH ───────────────────────────────────────────────────────── */
function renderLogin(container) {
  let activeTab = 'login';

  function build() {
    return `
      <div class="auth-layout">
        <div class="auth-left">
          <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80" alt="VOLTRAX Field">
          <div class="auth-left-overlay">
            <div class="auth-left-quote">"O campo elétrico começa com uma decisão."</div>
          </div>
        </div>
        <div class="auth-right">
          <div class="auth-box">
            <div class="auth-logo">
              <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="28" font-family="Syne" font-weight="800" font-size="28" fill="#E8620D" letter-spacing="-0.5">VOLTRAX</text>
              </svg>
            </div>
            <h1 class="auth-title">${activeTab === 'login' ? 'Bem-vindo' : 'Criar conta'}</h1>
            <p class="auth-sub">${activeTab === 'login' ? 'Acesse sua conta para gerenciar sua frota.' : 'Registre-se e acesse a plataforma VOLTRAX.'}</p>
            <div class="auth-tabs">
              <button class="auth-tab${activeTab==='login'?' active':''}" data-tab="login">Entrar</button>
              <button class="auth-tab${activeTab==='register'?' active':''}" data-tab="register">Criar conta</button>
            </div>
            ${activeTab === 'login' ? `
              <div class="form-group"><label class="form-label">E-mail</label><input class="form-input" type="email" id="aEmail" placeholder="seu@email.com"></div>
              <div class="form-group"><label class="form-label">Senha</label><input class="form-input" type="password" id="aPwd" placeholder="Sua senha"></div>
              <div style="text-align:right;margin-bottom:1.5rem;"><a href="#" style="font-size:.8rem;color:var(--clr-accent);">Esqueceu a senha?</a></div>
              <button class="btn btn-primary" id="aSubmit" style="width:100%;">Entrar</button>
            ` : `
              <div class="form-row">
                <div class="form-group"><label class="form-label">Nome</label><input class="form-input" type="text" id="rName" placeholder="Seu nome"></div>
                <div class="form-group"><label class="form-label">Sobrenome</label><input class="form-input" type="text" id="rLast" placeholder="Sobrenome"></div>
              </div>
              <div class="form-group"><label class="form-label">E-mail</label><input class="form-input" type="email" id="rEmail" placeholder="seu@email.com"></div>
              <div class="form-group"><label class="form-label">Empresa / Fazenda</label><input class="form-input" type="text" id="rCompany" placeholder="Nome da empresa"></div>
              <div class="form-group"><label class="form-label">Senha</label><input class="form-input" type="password" id="rPwd" placeholder="Mínimo 8 caracteres"><div class="form-hint">Use letras, números e símbolos.</div></div>
              <button class="btn btn-primary" id="rSubmit" style="width:100%;margin-top:.5rem;">Criar Conta</button>
            `}
            <div class="auth-divider">ou</div>
            <button class="btn btn-secondary" style="width:100%;" onclick="navigate('/support')">Acesso via suporte técnico</button>
            <div class="auth-links">
              ${activeTab==='login' ? `Não tem conta? <a href="#" data-tab="register">Criar conta</a>` : `Já tem conta? <a href="#" data-tab="login">Entrar</a>`}
            </div>
          </div>
        </div>
      </div>`;
  }

  function attach() {
    container.querySelectorAll('[data-tab]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        activeTab = el.dataset.tab;
        container.innerHTML = build();
        attach();
      });
    });

    const loginBtn = container.querySelector('#aSubmit');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        const email = container.querySelector('#aEmail').value.trim();
        const pwd   = container.querySelector('#aPwd').value;
        if (!email || !pwd) { showToast('Preencha e-mail e senha.', 'error'); return; }
        STATE.user = { name: 'Produtor VOLTRAX', email, initials: email[0].toUpperCase() };
        showToast('Login realizado com sucesso!', 'success');
        setTimeout(() => navigate('/account'), 600);
      });
    }

    const regBtn = container.querySelector('#rSubmit');
    if (regBtn) {
      regBtn.addEventListener('click', () => {
        const email = container.querySelector('#rEmail').value.trim();
        const name  = container.querySelector('#rName').value.trim();
        const pwd   = container.querySelector('#rPwd').value;
        if (!name || !email || !pwd) { showToast('Preencha todos os campos.', 'error'); return; }
        if (pwd.length < 8) { showToast('Senha muito curta. Mínimo 8 caracteres.', 'error'); return; }
        STATE.user = { name, email, initials: name[0].toUpperCase() };
        showToast('Conta criada! Bem-vindo à VOLTRAX.', 'success');
        setTimeout(() => navigate('/account'), 600);
      });
    }
  }

  container.innerHTML = build();
  attach();
}

/* ─── ACCOUNT ────────────────────────────────────────────────────────────── */
function renderAccount(container) {
  if (!STATE.user) { navigate('/login'); return; }

  const panels = {
    orders: `
      <h2 style="font-family:var(--ff-display);font-weight:800;font-size:1.5rem;margin-bottom:1.5rem;">Meus Pedidos</h2>
      <div class="orders-list">
        ${[
          ['#VX-2024-881','VX-900 PRO','R$ 890.000','delivered','15/Jan/2025'],
          ['#VX-2024-442','Kit Solar 50 kWp','R$ 72.000','transit','10/Mar/2025'],
          ['#VX-2025-102','Bateria LFP 80 kWh','R$ 48.000','processing','02/Mai/2025'],
        ].map(([id,prod,val,status,date])=>`
          <div class="order-card">
            <div class="order-card-header">
              <span class="order-id">${id}</span>
              <span class="order-status ${status}">${{delivered:'Entregue',transit:'Em trânsito',processing:'Processando'}[status]}</span>
            </div>
            <div style="font-weight:600;margin-bottom:.5rem;">${prod}</div>
            <div style="display:flex;justify-content:space-between;font-size:.875rem;color:var(--clr-text2);">
              <span>${date}</span><span style="font-weight:600;color:var(--clr-text);">${val}</span>
            </div>
          </div>`).join('')}
      </div>`,
    fleet: `
      <h2 style="font-family:var(--ff-display);font-weight:800;font-size:1.5rem;margin-bottom:1.5rem;">Minha Frota</h2>
      <div class="telemetry-preview">
        <div class="telemetry-header">
          <span class="telemetry-title">VX-900 PRO #4721 — ATIVO</span>
          <span class="telemetry-status">Online</span>
        </div>
        <div class="telemetry-grid">
          ${[['312 kW','Potência'],['78%','Bateria'],['14,2h','Autonomia'],['34°C','Temp.'],['8 km/h','Velocidade'],['1240','RPM']].map(([v,l])=>`
            <div class="telemetry-metric"><div class="telemetry-val">${v}</div><div class="telemetry-lbl">${l}</div></div>`).join('')}
        </div>
      </div>
      <p style="font-size:.85rem;color:var(--clr-text3);margin-top:1.5rem;">Para adicionar veículos à frota, entre em contato com o suporte.</p>`,
    profile: `
      <h2 style="font-family:var(--ff-display);font-weight:800;font-size:1.5rem;margin-bottom:1.5rem;">Meu Perfil</h2>
      <div style="display:flex;flex-direction:column;gap:1.25rem;max-width:480px;">
        <div class="form-group"><label class="form-label">Nome</label><input class="form-input" type="text" value="${STATE.user.name}"></div>
        <div class="form-group"><label class="form-label">E-mail</label><input class="form-input" type="email" value="${STATE.user.email}"></div>
        <div class="form-group"><label class="form-label">Empresa / Fazenda</label><input class="form-input" type="text" placeholder="Nome da empresa"></div>
        <div class="form-group"><label class="form-label">Estado</label><input class="form-input" type="text" placeholder="UF"></div>
        <button class="btn btn-primary" onclick="showToast('Perfil atualizado!','success')">Salvar alterações</button>
      </div>`,
    settings: `
      <h2 style="font-family:var(--ff-display);font-weight:800;font-size:1.5rem;margin-bottom:1.5rem;">Configurações</h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem;max-width:480px;">
        <div style="background:var(--clr-surface);border:1px solid var(--clr-border);border-radius:var(--r-md);padding:1.5rem;">
          <div style="font-weight:600;margin-bottom:.5rem;">Notificações</div>
          <div style="font-size:.85rem;color:var(--clr-text2);">Receba alertas de telemetria, atualizações e ofertas por e-mail.</div>
          <button class="btn btn-secondary btn-sm" style="margin-top:1rem;" onclick="showToast('Configurações salvas','success')">Salvar preferências</button>
        </div>
        <div style="background:var(--clr-surface);border:1px solid var(--clr-border);border-radius:var(--r-md);padding:1.5rem;">
          <div style="font-weight:600;margin-bottom:.5rem;">Alterar senha</div>
          <div class="form-group" style="margin:1rem 0 .75rem;"><input class="form-input" type="password" placeholder="Senha atual"></div>
          <div class="form-group" style="margin-bottom:.75rem;"><input class="form-input" type="password" placeholder="Nova senha"></div>
          <button class="btn btn-primary btn-sm" onclick="showToast('Senha alterada!','success')">Alterar senha</button>
        </div>
      </div>`,
  };

  let activePanel = 'orders';

  function buildPanel() {
    return panels[activePanel] || '';
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-inner">
        <h1 class="section-title">Minha Conta</h1>
      </div>
    </div>
    <section class="section">
      <div class="account-layout">
        <div class="account-sidebar">
          <div class="account-user">
            <div class="account-avatar">${STATE.user.initials}</div>
            <div class="account-name">${STATE.user.name}</div>
            <div class="account-email">${STATE.user.email}</div>
          </div>
          <nav class="account-nav" id="accountNav">
            ${[
              ['orders', ICON.package, 'Pedidos'],
              ['fleet',  ICON.cpu,     'Frota'],
              ['profile',ICON.user,    'Perfil'],
              ['settings',ICON.settings,'Configurações'],
            ].map(([key,icon,label])=>`
              <div class="account-nav-item${key===activePanel?' active':''}" data-panel="${key}">
                ${icon} ${label}
              </div>`).join('')}
            <div class="account-nav-item" id="logoutBtn" style="margin-top:1rem;border-top:1px solid var(--clr-border);padding-top:1rem;color:var(--clr-text3);">${ICON.logout} Sair</div>
          </nav>
        </div>
        <div id="accountPanel">${buildPanel()}</div>
      </div>
    </section>`;

  container.querySelector('#accountNav').addEventListener('click', e => {
    const item = e.target.closest('[data-panel]');
    if (item) {
      activePanel = item.dataset.panel;
      container.querySelectorAll('.account-nav-item').forEach(el => el.classList.toggle('active', el.dataset.panel === activePanel));
      container.querySelector('#accountPanel').innerHTML = buildPanel();
    }
    if (e.target.closest('#logoutBtn')) {
      STATE.user = null;
      showToast('Sessão encerrada.', '');
      setTimeout(() => navigate('/home'), 600);
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════════════════ */
function init() {
  initTheme();
  initNavbar();
  initModal();
  loadCart();
  applyI18n();
  initLoading();

  window.addEventListener('hashchange', () => {
    const { path, params } = routeFromHash();
    renderPage(path, params);
    setActiveNav(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Expose navigate globally for onclick attributes
  window.navigate    = navigate;
  window.closeModal  = closeModal;
  window.showToast   = showToast;
  window.addToCart   = addToCart;
}

document.addEventListener('DOMContentLoaded', init);
