
const LOGO = 'images/chiribi-studios-logo2.png';
const DEMO = { name: 'Coco Tuneado', email: 'uncorreojsjjs@gmail.com' };
const VALIDAR_PAGO = true;

const PRODUCTS = [
  { id: 'juego-1', type: 'juego', name: 'Juego 1', tag: 'RPG de Acción', price: 79900, img: 'images/game-1.png', r: 'tall' },
  { id: 'juego-2', type: 'juego', name: 'Juego 2', tag: 'RPG de Acción', price: 79900, img: 'images/game-2.png', r: 'tall' },
  { id: 'gardens-run', type: 'juego', name: "Garden's Run", tag: 'Gestión de Recursos', price: 40900, img: 'images/logo-gardens-run.png', bg: 'tan', r: 'tall', url: 'producto.html' },
  { id: 'juego-3', type: 'juego', name: 'Juego 3', tag: 'RPG de Acción', price: 79900, img: 'images/game-3.png', r: 'tall' },

  { id: 'comic-1', type: 'comic', name: "Garden's Run", tag: 'Precuela', price: 69900, img: 'images/cover-gardens-run.png', bg: 'sage' },
  { id: 'comic-2', type: 'comic', name: 'Cómic', tag: 'Secuela', price: 69900, bg: 'g-green' },
  { id: 'comic-3', type: 'comic', name: 'Cómic', tag: 'Historia Adicional', price: 59900, bg: 'g-blue' },
  { id: 'comic-4', type: 'comic', name: 'Cómic', tag: 'Precuela', price: 69900, bg: 'g-purple' },
  { id: 'comic-5', type: 'comic', name: 'Cómic', tag: 'Secuela', price: 69900, bg: 'g-red' },
  { id: 'comic-6', type: 'comic', name: 'Cómic', tag: 'Historia Adicional', price: 69900, bg: 'g-green' },
  { id: 'comic-7', type: 'comic', name: 'Cómic', tag: 'Precuela', price: 59900, bg: 'g-blue' },
  { id: 'comic-8', type: 'comic', name: 'Cómic', tag: 'Secuela', price: 69900, bg: 'g-purple' },

  { id: 'camiseta', type: 'merch-marca', name: 'Camiseta Chiribi', tag: 'Merch de marca', price: 59900, img: 'images/merch-camiseta.png' },
  { id: 'juego-de-mesa', type: 'merch-juego', name: '¡Frutas al cesto!', tag: 'Juego de mesa', price: 10000, img: 'images/merch-juego-de-mesa.png' },
  { id: 'gorra', type: 'merch-marca', name: 'Gorra Chiribi Studios', tag: 'Merch de marca', price: 49900, img: 'images/merch-gorra.png' },
  { id: 'taza', type: 'merch-marca', name: 'Taza Chiribi', tag: 'Merch de marca', price: 60900, img: 'images/merch-taza.png' },
  { id: 'peluche-limon', type: 'merch-juego', name: 'Peluche Limón', tag: 'Merch de juego', price: 29900, img: 'images/merch-peluche-limon.png' },
  { id: 'pin', type: 'merch-marca', name: 'Pin Chiribi', tag: 'Merch de marca', price: 10900, img: 'images/merch-pin.png' },
  { id: 'peluche-zanahoria', type: 'merch-juego', name: 'Peluche Zanahoria', tag: 'Merch de juego', price: 29900, img: 'images/merch-peluche-zanahoria.png' },
  { id: 'peluche-sandia', type: 'merch-juego', name: 'Peluche Sandía', tag: 'Merch de juego', price: 49900, img: 'images/merch-peluche-sandia.png' },

  { id: 'libro', type: 'Box', name: 'Mystery Box Chiribi', tag: 'Merch de marca', price: 59900, img: 'images/mystery-box.png' },

  { id: 'nov-1', type: 'novedad', name: 'Juego', tag: 'RPG de Acción', price: 79900, bg: 'g-red', r: 'short' },
  { id: 'nov-2', type: 'novedad', name: 'Cómic', tag: 'Acción', price: 69900, bg: 'g-green', r: 'short' },
  { id: 'nov-3', type: 'novedad', name: 'Cómic', tag: 'Aventura', price: 59900, bg: 'g-blue', r: 'short' },
  { id: 'nov-4', type: 'novedad', name: 'Juego', tag: 'Puzzle Narrativo', price: 49900, bg: 'g-purple', r: 'short' },

  { id: 'gardens-comic', type: 'hidden', name: "Garden's Run", tag: 'Precuela', price: 0, img: 'images/cover-gardens-run.png', bg: 'sage' }
];

/* ---------- Ayudas ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const load = (key, fallback) => JSON.parse(localStorage.getItem(key)) ?? fallback;
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const money = (n) => '$' + String(n).replace(/\B(?=(\d{3})+$)/g, '.');
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const byType = (type) => PRODUCTS.filter((p) => p.type === type);
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t.timer);
  t.timer = setTimeout(() => t.classList.remove('show'), 2500);
}

/*Carrito y sesión*/
let cart = load('cart', []);
const user = load('user', null);
const ownedKey = () => 'owned_' + user.email;
const getOwned = () => (user ? load(ownedKey(), []) : []);
const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
const cartTotal = () => cart.reduce((sum, i) => sum + byId(i.id).price * i.qty, 0);

function saveCart() {
  save('cart', cart);
  $$('[data-badge]').forEach((b) => { b.textContent = cartCount(); b.hidden = !cartCount(); });
}
function addToCart(id) {
  const line = cart.find((i) => i.id === id);
  line ? line.qty++ : cart.push({ id, qty: 1 });
  saveCart();
  toast(`«${byId(id).name}» se agregó al carrito`);
}
function changeQty(id, delta) {
  const line = cart.find((i) => i.id === id);
  line.qty += delta;
  cart = cart.filter((i) => i.qty > 0);
  saveCart();
}

/*Header y footer*/
const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${d}</svg>`;
const logo = `<a class="brand" href="tienda.html"><img src="${LOGO}" alt="Chiribi Studios"></a>`;
const page = document.body.dataset.page;
const here = { productos: 'productos', producto: 'productos', mercancia: 'mercancia', contacto: 'contacto' }[page];
const link = (href, text, key) => `<a href="${href}"${key === here ? ' class="active"' : ''}>${text}</a>`;

$('#siteHeader').outerHTML = `
  <header class="top"><div class="wrap bar">
    ${logo}
    <nav class="nav" id="mainNav">${link('productos.html', 'Productos', 'productos')}${link('mercancia.html', 'Mercancía', 'mercancia')}${link('contacto.html', 'Contacto', 'contacto')}</nav>
    <div class="icons">
      <a href="buscar.html" aria-label="Buscar">${svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>')}</a>
      <a href="${user ? 'perfil.html' : 'login.html'}" aria-label="Perfil">${svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/>')}</a>
      <a href="carrito.html" aria-label="Carrito">${svg('<circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/>')}<span class="badge" data-badge hidden></span></a>
      <button class="menu-btn" id="menuBtn" aria-label="Menú">${svg('<path d="M4 7h16M4 12h16M4 17h16"/>')}</button>
    </div>
  </div></header>`;

$('#siteFooter').outerHTML = `
  <footer class="foot-site"><div class="wrap cols">
    <div>${logo}</div>
    <div>
    <h4>Explorar</h4>
    <a href="productos.html">Productos</a>
    <a href="mercancia.html">Mercancía</a>
    </div>
    <div><h4>Cuenta</h4>${user ? '' : '<a href="login.html">Iniciar sesión</a>'}<a href="perfil.html">Mi perfil</a><a href="carrito.html">Carrito</a></div>
    <div><h4>Ayuda</h4><a href="contacto.html">Contacto</a></div>
  </div></footer>`;

$('#menuBtn').onclick = () => $('#mainNav').classList.toggle('open');
saveCart();

/*Tarjetas de producto*/
function card(p, mode = 'buy') {
  const media = `<div class="media ${p.r || 'wide'} ${p.bg || ''}">${p.img ? `<img src="${p.img}" alt="">` : ''}</div>`;
  const button = mode === 'owned' ? '' : mode === 'leer'
    ? '<div class="foot"><button class="btn" data-leer>Leer</button></div>'
    : `<div class="foot"><b>${money(p.price)}</b><button class="btn" data-add="${p.id}">Agregar</button></div>`;
  const name = p.url ? `<a href="${p.url}">${p.name}</a>` : p.name;
  return `<article class="card">${media}<div class="info"><h3>${name}</h3><p class="tag">${p.tag}</p>${button}</div></article>`;
}
const show = (selector, list, mode) => { $(selector).innerHTML = list.map((p) => card(p, mode)).join(''); };

document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) addToCart(add.dataset.add);
  if (e.target.closest('[data-leer]')) toast('El lector de cómics llegará muy pronto');
});

/*Pestañas (Productos y Mercancía)*/
function tabs(options) {
  const buttons = $$('[data-tab]');
  const draw = () => {
    const key = options[location.hash.slice(1)] ? location.hash.slice(1) : buttons[0].dataset.tab;
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.tab === key));
    show('#catalogGrid', options[key](), key === 'expansiones' ? 'leer' : 'buy');
  };
  buttons.forEach((b) => { b.onclick = () => { location.hash = b.dataset.tab; }; });
  addEventListener('hashchange', draw);
  draw();
}

/*PÁGINAS*/
const pages = {
  tienda() {
    show('#novedades', byType('novedad'));
    if (location.hash === '#cuenta-eliminada') toast('Tu cuenta fue eliminada');
  },

  productos() {
    tabs({ juegos: () => byType('juego'), expansiones: () => byType('comic') });
  },

  mercancia() {
    tabs({
      todo: () => PRODUCTS.filter((p) => p.type.startsWith('merch')),
      juegos: () => byType('merch-juego'),
      marca: () => byType('merch-marca')
    });
  },

  producto() {
    $('#productPrice').textContent = money(byId('gardens-run').price);
    $('#buyBtn').onclick = () => {
      if (!cart.some((i) => i.id === 'gardens-run')) addToCart('gardens-run');
      location.href = 'carrito.html';
    };
    $('#relatedGrid').innerHTML = ['gardens-comic', 'peluche-limon', 'peluche-arandano', 'peluche-sandia']
      .map((id) => card({ ...byId(id), r: 'wide' }, id === 'gardens-comic' ? 'leer' : 'buy')).join('');
  },

  buscar() {
    const sugeridos = ['peluche-zanahoria', 'gardens-run', 'libro', 'gorra'].map(byId);
    const draw = () => {
      const q = norm($('#q').value);
      const list = q ? PRODUCTS.filter((p) => !['hidden', 'novedad'].includes(p.type) && norm(p.name + ' ' + p.tag).includes(q)) : sugeridos;
      $('#resultsTitle').textContent = q ? 'Resultados' : 'Sugerencias';
      $('#resultsGrid').innerHTML = list.length ? list.map((p) => card(p)).join('') : '<p class="empty">No encontramos resultados.</p>';
    };
    $('#q').oninput = draw;
    draw();
  },

  carrito() {
    const draw = () => {
      $('#cartList').innerHTML = cart.length ? cart.map((i) => {
        const p = byId(i.id);
        return `<div class="cart-item" data-id="${p.id}">
          <div class="thumb ${p.bg || ''}">${p.img ? `<img src="${p.img}" alt="">` : ''}</div>
          <div><h3>${p.name}</h3><p class="tag">${p.tag}</p>
            <div class="qty"><button data-d="-1" aria-label="Quitar uno">−</button>${i.qty}<button data-d="1" aria-label="Agregar uno">+</button></div></div>
          <b>${money(p.price * i.qty)}</b>
          <button class="x" data-d="-99" aria-label="Eliminar">×</button></div>`;
      }).join('') : '<p class="empty">Tu carrito está vacío. <a href="productos.html">Ver productos</a></p>';
      $('#subtotal').textContent = $('#total').textContent = money(cartTotal());
    };
    $('#cartList').onclick = (e) => {
      const b = e.target.closest('[data-d]');
      if (!b) return;
      changeQty(b.closest('.cart-item').dataset.id, +b.dataset.d);
      draw();
    };
    $('#goPay').onclick = () => {
      if (!cart.length) return toast('Tu carrito está vacío');
      location.href = user ? 'pago.html' : 'login.html?next=pago.html';
    };
    draw();
  },

  pago() {
    if (!cart.length) return (location.href = 'carrito.html');
    if (!user) return (location.href = 'login.html?next=pago.html');
    $('#subtotal').textContent = $('#total').textContent = money(cartTotal());

    let method = 'tarjeta';
    $$('[data-method]').forEach((b) => {
      b.onclick = () => {
        method = b.dataset.method;
        $$('[data-method]').forEach((x) => x.classList.toggle('active', x === b));
        $('#paneCard').hidden = method !== 'tarjeta';
        $('#panePse').hidden = method !== 'pse';
        $$('.err').forEach((p) => (p.textContent = ''));
      };
    });

    /* Formato automático al escribir */
    const digits = (el, max) => el.value.replace(/\D/g, '').slice(0, max);
    $('#cardNumber').oninput = (e) => { e.target.value = digits(e.target, 19).replace(/(.{4})/g, '$1 ').trim(); };
    $('#cardExp').oninput = (e) => { const v = digits(e.target, 4); e.target.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; };
    $('#cardCvv').oninput = (e) => { e.target.value = digits(e.target, 4); };

    /*comprueba que el número de tarjeta sea válido */
    const luhn = (num) => {
      let sum = 0, alt = false;
      for (let i = num.length - 1; i >= 0; i--) {
        let d = +num[i];
        if (alt) { d *= 2; if (d > 9) d -= 9; }
        sum += d; alt = !alt;
      }
      return sum % 10 === 0;
    };

    /* Devuelve con los errores encontrados */
    const errors = () => {
      const e = {};
      if (method === 'tarjeta') {
        const num = $('#cardNumber').value.replace(/\s/g, '');
        if (num.length < 13 || !luhn(num)) e.cardNumber = 'Número de tarjeta no válido. Para probar usa 4242 4242 4242 4242.';
        if ($('#cardName').value.trim().length < 3) e.cardName = 'Escribe el nombre como aparece en la tarjeta.';
        const m = /^(\d{2})\/(\d{2})$/.exec($('#cardExp').value);
        const now = new Date();
        if (!m || +m[1] < 1 || +m[1] > 12 || (2000 + +m[2]) * 12 + +m[1] < now.getFullYear() * 12 + now.getMonth() + 1) e.cardExp = 'Fecha no válida (MM/AA) o tarjeta vencida.';
        if (!/^\d{3,4}$/.test($('#cardCvv').value)) e.cardCvv = 'CVV de 3 o 4 dígitos.';
      } else {
        if (!$('#bank').value) e.bank = 'Elige un banco.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#pseMail').value.trim())) e.pseMail = 'Escribe un correo válido.';
      }
      return e;
    };

    /* Pago */
    $('#payForm').onsubmit = (e) => {
      e.preventDefault();
      $$('.err').forEach((p) => (p.textContent = ''));
      const found = errors();
      const ids = Object.keys(found);
      if (VALIDAR_PAGO && ids.length) {
        ids.forEach((id) => ($('#' + id + 'Err').textContent = found[id]));
        return $('#' + ids[0]).focus();
      }
      const digital = cart.map((i) => i.id).filter((id) => ['juego', 'comic'].includes(byId(id).type));
      save('order', { id: 'CH-' + Math.floor(10000 + Math.random() * 90000), count: cartCount(), total: cartTotal() });
      save(ownedKey(), [...new Set([...getOwned(), ...digital])]);
      save('cart', []);
      location.href = 'pago-realizado.html';
    };
  },

  'pago-realizado'() {
    const order = load('order', null);
    if (!order) return (location.href = 'tienda.html');
    $('#orderId').textContent = 'Orden #' + order.id;
    $('#orderInfo').textContent = `${order.count} ${order.count === 1 ? 'producto' : 'productos'} · ${money(order.total)}`;
  },

  login() {
    const next = new URLSearchParams(location.search).get('next');
    const goTo = /^[\w-]+\.html$/.test(next) ? next : 'perfil.html';
    if (user) return (location.href = goTo);

    /* Login, ventana "Elige una cuenta"*/
    const dialog = $('#googleDialog');
    $('#demoName').textContent = DEMO.name;
    $('#demoMail').textContent = DEMO.email;
    $('#demoAvatar').textContent = DEMO.name[0];

    const enter = (account) => {
      save('user', account);
      if (load('owned_' + account.email, null) === null && account.email === DEMO.email) {
        save('owned_' + account.email, ['gardens-run', 'gardens-comic']);
      }
      location.href = goTo;
    };

    $('#googleBtn').onclick = () => { $('#otherForm').hidden = true; dialog.showModal(); };
    $('#googleCancel').onclick = () => dialog.close();
    $('#demoAccount').onclick = () => enter(DEMO);
    $('#otherBtn').onclick = () => { $('#otherForm').hidden = false; $('#otherName').focus(); };
    $('#otherForm').onsubmit = (e) => {
      e.preventDefault();
      const name = $('#otherName').value.trim();
      const email = $('#otherMail').value.trim().toLowerCase();
      if (name.length < 2) return ($('#otherErr').textContent = 'Escribe tu nombre.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ($('#otherErr').textContent = 'Escribe un correo válido.');
      enter({ name, email });
    };
  },

  perfil() {
    if (!user) return (location.href = 'login.html?next=perfil.html');
    $('#profileName').textContent = user.name;
    $('#profileMail').textContent = user.email;
    $('#avatar').textContent = user.name[0];

    const owned = getOwned().map(byId);
    $('#ownedGrid').innerHTML = owned.length
      ? owned.map((p) => card({ ...p, r: 'wide' }, 'owned')).join('')
      : '<p class="empty">Aún no tienes productos. <a href="productos.html">Explorar el catálogo</a></p>';

    $('#logoutBtn').onclick = () => { localStorage.removeItem('user'); location.href = 'tienda.html'; };
    $('#deleteOpen').onclick = () => $('#deleteDialog').showModal();
    $('#deleteCancel').onclick = () => $('#deleteDialog').close();
    $('#deleteConfirm').onclick = () => {
      [ownedKey(), 'user', 'cart', 'order'].forEach((k) => localStorage.removeItem(k));
      location.href = 'tienda.html#cuenta-eliminada';
    };
  }
};

pages[page]?.();
