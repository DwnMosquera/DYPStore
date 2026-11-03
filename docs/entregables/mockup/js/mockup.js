/**
 * ============================================================================
 * DYPSTORE — LÓGICA DEL MOCKUP FUNCIONAL INTERACTIVO
 * ============================================================================
 * Simula todas las pantallas y flujos de negocio sin conexión a base de datos.
 * Incluye gestión de catálogo, carrito, órdenes, checkout, auth y chatbot.
 */

// 1. BASE DE DATOS DEMO EN MEMORIA (17 Productos idénticos a DbInitializer)
const DEMO_PRODUCTS = [
  { id: 1, name: "Guantes de Boxeo Pro", brand: "Everlast", price: 89.99, stock: 50, category: "boxing", description: "Guantes profesionales de cuero genuino con relleno triple de espuma de alta densidad. Ideales para sparring y saco.", image: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=500&q=80" },
  { id: 2, name: "Casco de Boxeo Elite", brand: "Cleto Reyes", price: 65.00, stock: 30, category: "boxing", description: "Casco con máxima protección facial. Cuero genuino, acolchado triple y visor panorámico.", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80" },
  { id: 3, name: "Vendas para Boxeo", brand: "Venum", price: 12.99, stock: 100, category: "boxing", description: "Vendas elásticas de 4.5m. Protección de manos y muñecas. Lavables.", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80" },
  { id: 4, name: "Saco Heavy Bag 70lb", brand: "Title Boxing", price: 149.99, stock: 15, category: "boxing", description: "Saco relleno de trapo 100% algodón. Incluye cadena y giratorio.", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80" },
  { id: 5, name: "Protector Bucal Pro", brand: "Shock Doctor", price: 18.50, stock: 80, category: "boxing", description: "Protector bucal Gel-Fit. Se moldea en agua caliente.", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80" },
  { id: 6, name: "Skipping Rope Profesional", brand: "Title", price: 24.99, stock: 60, category: "boxing", description: "Cuerda de saltar de acero recubierto con mangos ergonómicos.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80" },
  { id: 7, name: "Nike Air Max 270", brand: "Nike", price: 120.00, stock: 45, category: "shoes", description: "Zapatilla con cámara Air Max 270. Amortiguación superior y comodidad todo el día.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { id: 8, name: "Adidas Ultraboost 23", brand: "Adidas", price: 180.00, stock: 30, category: "shoes", description: "Running con tecnología Boost. Devuelve energía en cada zancada.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80" },
  { id: 9, name: "Under Armour HOVR Sonic", brand: "Under Armour", price: 95.00, stock: 50, category: "shoes", description: "Running con tecnología HOVR para amortiguación sin peso.", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80" },
  { id: 10, name: "New Balance Fresh Foam", brand: "New Balance", price: 110.00, stock: 35, category: "shoes", description: "Foam Fresh X de última generación. Para largas distancias.", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80" },
  { id: 11, name: "Puma Velocity Nitro 2", brand: "Puma", price: 130.00, stock: 40, category: "shoes", description: "Placa de carbono + espuma Nitro para running de competición.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { id: 12, name: "Asics Gel-Nimbus 25", brand: "Asics", price: 160.00, stock: 25, category: "shoes", description: "Gel en talón y antepié. Máxima amortiguación para corredores.", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80" },
  { id: 13, name: "Whey Protein Gold Standard", brand: "Optimum Nutrition", price: 55.99, stock: 80, category: "supplements", description: "5 lb de proteína whey aislada. 24g de proteína por servicio.", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&q=80" },
  { id: 14, name: "Pre-Workout C4 Original", brand: "Cellucor", price: 35.99, stock: 60, category: "supplements", description: "Pre-entreno con 150mg de cafeína, beta-alanina y creatina.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80" },
  { id: 15, name: "Creatina Monohidrato 500g", brand: "BulkSupplements", price: 25.00, stock: 100, category: "supplements", description: "Creatina micronizada de grado farmacéutico. Aumenta fuerza y masa muscular.", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&q=80" },
  { id: 16, name: "BCAA 2:1:1 Powder", brand: "MusclePharm", price: 28.50, stock: 70, category: "supplements", description: "Aminoácidos esenciales. Acelera recuperación muscular.", image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=500&q=80" },
  { id: 17, name: "Multivitamínico Sport", brand: "Animal Pak", price: 42.00, stock: 55, category: "supplements", description: "Pack completo de vitaminas y minerales para atletas.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80" }
];

// Estado global de la aplicación mockup
let productsState = [...DEMO_PRODUCTS];

let cartState = [
  { productId: 1, quantity: 1 },
  { productId: 13, quantity: 2 }
];

let ordersState = [
  {
    id: 101,
    date: "01 Nov 2026",
    status: "completed",
    total: 201.97,
    items: [
      { name: "Guantes de Boxeo Pro", quantity: 1, price: 89.99 },
      { name: "Whey Protein Gold Standard", quantity: 2, price: 55.99 }
    ]
  },
  {
    id: 102,
    date: "02 Nov 2026",
    status: "processing",
    total: 180.00,
    items: [
      { name: "Adidas Ultraboost 23", quantity: 1, price: 180.00 }
    ]
  }
];

let selectedProductId = 1;
let currentCategoryFilter = "all";
let currentSearchTerm = "";

// 2. NAVEGADOR DE PANTALLAS (SWITCHER)
function showScreen(screenId) {
  document.querySelectorAll('.dyp-mockup-view').forEach(view => {
    view.classList.add('d-none');
  });

  const targetView = document.getElementById(`view-${screenId}`);
  if (targetView) {
    targetView.classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Actualizar botones de la barra de navegación del mockup
  document.querySelectorAll('.dyp-screen-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });

  // Renderizadores específicos de vista
  if (screenId === 'home') renderHomeFeatured();
  if (screenId === 'catalog') renderCatalog();
  if (screenId === 'details') renderProductDetails(selectedProductId);
  if (screenId === 'cart') renderCart();
  if (screenId === 'orders') renderOrders();
  if (screenId === 'admin-dashboard') renderAdminDashboard();
  if (screenId === 'admin-products') renderAdminProductsTable();

  updateCartBadges();
}

// 3. RENDERIZADO DE PANTALLA: INICIO
function renderHomeFeatured() {
  const container = document.getElementById('home-featured-products');
  if (!container) return;

  const featured = productsState.slice(0, 4);
  container.innerHTML = featured.map(p => createProductCardHtml(p)).join('');
}

// 4. RENDERIZADO DE PANTALLA: CATÁLOGO
function renderCatalog() {
  const container = document.getElementById('catalog-products-grid');
  const countLabel = document.getElementById('catalog-products-count');
  if (!container) return;

  let filtered = productsState.filter(p => {
    const matchesCat = currentCategoryFilter === 'all' || p.category === currentCategoryFilter;
    const matchesSearch = !currentSearchTerm || 
      p.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) || 
      p.brand.toLowerCase().includes(currentSearchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (countLabel) countLabel.innerText = `${filtered.length} productos disponibles`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <i class="bi bi-search fs-1 text-secondary mb-3 d-block"></i>
        <h4 class="text-white">No se encontraron productos</h4>
        <p class="text-secondary">Intenta con otros términos o limpia los filtros.</p>
        <button class="btn btn-outline-light btn-sm" onclick="clearCatalogFilters()">Restablecer filtros</button>
      </div>`;
  } else {
    container.innerHTML = filtered.map(p => `<div class="col-6 col-md-4 mb-4">${createProductCardHtml(p)}</div>`).join('');
  }
}

function filterCatalogCategory(category) {
  currentCategoryFilter = category;
  document.querySelectorAll('.dyp-cat-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderCatalog();
}

function searchCatalog(term) {
  currentSearchTerm = term;
  renderCatalog();
}

function clearCatalogFilters() {
  currentCategoryFilter = 'all';
  currentSearchTerm = '';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  filterCatalogCategory('all');
}

// 5. RENDERIZADO DE PANTALLA: DETALLE DE PRODUCTO
function viewProductDetails(productId) {
  selectedProductId = productId;
  showScreen('details');
}

function renderProductDetails(productId) {
  const p = productsState.find(prod => prod.id === productId) || productsState[0];
  selectedProductId = p.id;

  const imgEl = document.getElementById('details-img');
  const brandEl = document.getElementById('details-brand');
  const nameEl = document.getElementById('details-name');
  const catBadge = document.getElementById('details-cat-badge');
  const priceEl = document.getElementById('details-price');
  const descEl = document.getElementById('details-desc');
  const stockEl = document.getElementById('details-stock');
  const liveViewersEl = document.getElementById('details-live-viewers');

  if (imgEl) imgEl.src = p.image;
  if (brandEl) brandEl.innerText = p.brand;
  if (nameEl) nameEl.innerText = p.name;
  if (priceEl) priceEl.innerText = `$${p.price.toFixed(2)}`;
  if (descEl) descEl.innerText = p.description;
  if (catBadge) {
    catBadge.innerText = p.category.toUpperCase();
    catBadge.className = `dyp-badge-cat position-static ${p.category}`;
  }

  if (stockEl) {
    if (p.stock > 5) {
      stockEl.innerHTML = `<span class="dyp-stock-pill">${p.stock} unidades en stock</span>`;
    } else if (p.stock > 0) {
      stockEl.innerHTML = `<span class="dyp-stock-pill low">¡Solo quedan ${p.stock} unidades!</span>`;
    } else {
      stockEl.innerHTML = `<span class="dyp-stock-pill out">Agotado</span>`;
    }
  }

  if (liveViewersEl) {
    liveViewersEl.innerText = Math.floor(Math.random() * 25) + 8;
  }
}

// 6. RENDERIZADO DE PANTALLA: CARRITO
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const itemsCountEl = document.getElementById('cart-items-count');

  if (!container) return;

  if (cartState.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-bag-x fs-1 text-secondary mb-3 d-block"></i>
        <h4 class="text-white">Tu carrito está vacío</h4>
        <p class="text-secondary">Explora la tienda y empieza a entrenar como un profesional.</p>
        <button class="btn btn-danger" onclick="showScreen('catalog')">Ir al Catálogo</button>
      </div>`;
    if (subtotalEl) subtotalEl.innerText = "$0.00";
    if (totalEl) totalEl.innerText = "$0.00";
    if (itemsCountEl) itemsCountEl.innerText = "0 items";
    return;
  }

  let subtotal = 0;
  let totalCount = 0;

  const html = cartState.map(item => {
    const prod = productsState.find(p => p.id === item.productId);
    if (!prod) return '';
    const itemSubtotal = prod.price * item.quantity;
    subtotal += itemSubtotal;
    totalCount += item.quantity;

    return `
      <div class="dyp-cart-item mb-3">
        <img src="${prod.image}" alt="${prod.name}" class="dyp-cart-img" />
        <div class="flex-grow-1 min-w-0">
          <div class="dyp-brand mb-1">${prod.brand}</div>
          <h5 class="text-white mb-1 fs-6">${prod.name}</h5>
          <div class="text-secondary small mb-2">$${prod.price.toFixed(2)} c/u</div>
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div class="dyp-qty">
              <button onclick="updateCartQuantity(${item.productId}, -1)">−</button>
              <input type="number" value="${item.quantity}" readonly />
              <button onclick="updateCartQuantity(${item.productId}, 1)">+</button>
            </div>
            <div class="d-flex align-items-center gap-3">
              <span class="dyp-price fs-5">$${itemSubtotal.toFixed(2)}</span>
              <button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(${item.productId})">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = html;
  if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.innerText = `$${subtotal.toFixed(2)}`;
  if (itemsCountEl) itemsCountEl.innerText = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
}

function addToCart(productId, quantity = 1) {
  const prod = productsState.find(p => p.id === productId);
  if (!prod) return;

  const existing = cartState.find(item => item.productId === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, prod.stock);
  } else {
    cartState.push({ productId, quantity: Math.min(quantity, prod.stock) });
  }

  updateCartBadges();
  showToast(`¡${prod.name} añadido al carrito!`);
}

function updateCartQuantity(productId, delta) {
  const prod = productsState.find(p => p.id === productId);
  const item = cartState.find(i => i.productId === productId);
  if (!item || !prod) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeCartItem(productId);
  } else if (newQty <= prod.stock) {
    item.quantity = newQty;
    renderCart();
    updateCartBadges();
  } else {
    showToast(`Stock máximo disponible alcanzado (${prod.stock})`, "warning");
  }
}

function removeCartItem(productId) {
  cartState = cartState.filter(i => i.productId !== productId);
  renderCart();
  updateCartBadges();
  showToast("Producto eliminado del carrito.");
}

function checkout() {
  if (cartState.length === 0) {
    showToast("Tu carrito está vacío", "error");
    return;
  }

  // Descontar inventario atómicamente y armar orden
  let orderTotal = 0;
  const orderItems = [];

  for (const item of cartState) {
    const prod = productsState.find(p => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
      orderTotal += prod.price * item.quantity;
      orderItems.push({
        name: prod.name,
        quantity: item.quantity,
        price: prod.price
      });
    }
  }

  const newOrder = {
    id: 100 + ordersState.length + 1,
    date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: "pending",
    total: orderTotal,
    items: orderItems
  };

  ordersState.unshift(newOrder);
  cartState = [];
  updateCartBadges();

  showToast("¡Compra completada con éxito! Pedido generado.");
  showScreen('orders');
}

function openWompiModal() {
  if (cartState.length === 0) {
    showToast("Tu carrito está vacío", "error");
    return;
  }

  const subtotal = cartState.reduce((sum, item) => {
    const p = productsState.find(prod => prod.id === item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const totalEl = document.getElementById('wompiModalTotal');
  if (totalEl) totalEl.innerText = `$${subtotal.toFixed(2)} COP`;

  // Resetear estados visuales del modal Wompi
  const tabs = document.getElementById('wompiMockupTabs');
  const tabsContent = document.getElementById('wompiMockupTabsContent');
  const proc = document.getElementById('mockWompiProcessing');
  const succ = document.getElementById('mockWompiSuccess');
  const nequiPush = document.getElementById('mockNequiPushSim');
  const btnNequi = document.getElementById('btnMockNequiPay');

  if (tabs) tabs.classList.remove('d-none');
  if (tabsContent) tabsContent.classList.remove('d-none');
  if (proc) proc.classList.add('d-none');
  if (succ) succ.classList.add('d-none');
  if (nequiPush) nequiPush.classList.add('d-none');
  if (btnNequi) {
    btnNequi.innerText = "Generar Cobro Nequi";
    btnNequi.disabled = false;
  }

  const modal = new bootstrap.Modal(document.getElementById('wompiMockupModal'));
  modal.show();
}

function iniciarNequiPushMockup() {
  const nequiPush = document.getElementById('mockNequiPushSim');
  const btnNequi = document.getElementById('btnMockNequiPay');
  if (nequiPush) nequiPush.classList.remove('d-none');
  if (btnNequi) {
    btnNequi.innerText = "Esperando confirmación en Nequi...";
    btnNequi.disabled = true;
  }
}

function confirmarPagoMockup(metodo) {
  const tabs = document.getElementById('wompiMockupTabs');
  const tabsContent = document.getElementById('wompiMockupTabsContent');
  const proc = document.getElementById('mockWompiProcessing');
  const succ = document.getElementById('mockWompiSuccess');
  const refEl = document.getElementById('mockWompiRef');

  if (tabs) tabs.classList.add('d-none');
  if (tabsContent) tabsContent.classList.add('d-none');
  if (proc) proc.classList.remove('d-none');

  setTimeout(() => {
    if (proc) proc.classList.add('d-none');
    if (succ) succ.classList.remove('d-none');
    if (refEl) refEl.innerText = 'WMP-' + Math.floor(100000 + Math.random() * 900000);

    setTimeout(() => {
      const modalEl = document.getElementById('wompiMockupModal');
      const instance = bootstrap.Modal.getInstance(modalEl);
      if (instance) instance.hide();
      checkout();
      showToast(`¡Pago de $${(ordersState[0]?.total || 0).toFixed(2)} aprobado por Wompi (${metodo})!`);
    }, 1500);
  }, 1600);
}

// 7. RENDERIZADO DE PANTALLA: PEDIDOS
function renderOrders() {
  const container = document.getElementById('orders-container');
  if (!container) return;

  if (ordersState.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-box-seam fs-1 text-secondary mb-3 d-block"></i>
        <h4 class="text-white">Aún no tienes pedidos registrados</h4>
        <button class="btn btn-danger mt-3" onclick="showScreen('catalog')">Ir a Comprar</button>
      </div>`;
    return;
  }

  const html = ordersState.map(order => {
    const stepStates = order.status === 'cancelled'
      ? ['done', 'cancelled', 'cancelled', 'cancelled']
      : order.status === 'pending'
      ? ['current', '', '', '']
      : order.status === 'processing'
      ? ['done', 'current', '', '']
      : ['done', 'done', 'done', 'done'];

    return `
      <div class="dyp-order-card mb-4">
        <div class="dyp-order-header d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div class="d-flex gap-4 flex-wrap">
            <div>
              <div class="text-secondary small">Pedido</div>
              <div class="fw-bold text-danger">#${String(order.id).padStart(6, '0')}</div>
            </div>
            <div>
              <div class="text-secondary small">Fecha</div>
              <div class="text-white fw-semibold">${order.date}</div>
            </div>
            <div>
              <div class="text-secondary small">Total</div>
              <div class="dyp-price fs-6">$${order.total.toFixed(2)}</div>
            </div>
          </div>
          <div>
            <span class="badge ${order.status === 'completed' ? 'bg-success' : order.status === 'pending' ? 'bg-warning text-dark' : 'bg-primary'} text-uppercase">
              ${order.status}
            </span>
          </div>
        </div>

        <div class="px-4 pt-3">
          <div class="dyp-timeline">
            <div class="dyp-timeline-step ${stepStates[0]}"><div class="dot"><i class="bi bi-bag-check"></i></div><small class="text-secondary">Recibido</small></div>
            <div class="dyp-timeline-line ${stepStates[1] ? 'done' : ''}"></div>
            <div class="dyp-timeline-step ${stepStates[1]}"><div class="dot"><i class="bi bi-box-seam"></i></div><small class="text-secondary">Procesando</small></div>
            <div class="dyp-timeline-line ${stepStates[2] ? 'done' : ''}"></div>
            <div class="dyp-timeline-step ${stepStates[2]}"><div class="dot"><i class="bi bi-truck"></i></div><small class="text-secondary">En envío</small></div>
            <div class="dyp-timeline-line ${stepStates[3] ? 'done' : ''}"></div>
            <div class="dyp-timeline-step ${stepStates[3]}"><div class="dot"><i class="bi bi-house-check"></i></div><small class="text-secondary">Entregado</small></div>
          </div>
        </div>

        <div class="px-4 pb-4">
          <div class="text-secondary small mb-2 text-uppercase fw-bold">Productos del pedido</div>
          ${order.items.map(it => `
            <div class="d-flex justify-content-between align-items-center py-2 border-bottom border-dark">
              <div><span class="badge bg-secondary me-2">${it.quantity}x</span><span class="text-white">${it.name}</span></div>
              <div class="text-secondary font-monospace">$${(it.price * it.quantity).toFixed(2)}</div>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = html;
}

// 8. RENDERIZADO DE PANTALLA: DASHBOARD ADMIN
function renderAdminDashboard() {
  const totalProducts = productsState.length;
  const totalOrders = ordersState.length;
  const totalUsers = 4; // Mock Users (Admin + 3 clientes)
  const totalRevenue = ordersState
    .filter(o => o.status === 'completed')
    .reduce((acc, o) => acc + o.total, 0);

  const elP = document.getElementById('admin-stat-products');
  const elO = document.getElementById('admin-stat-orders');
  const elU = document.getElementById('admin-stat-users');
  const elR = document.getElementById('admin-stat-revenue');

  if (elP) elP.innerText = totalProducts;
  if (elO) elO.innerText = totalOrders;
  if (elU) elU.innerText = totalUsers;
  if (elR) elR.innerText = `$${totalRevenue.toFixed(0)}`;
}

// 9. RENDERIZADO DE PANTALLA: GESTIÓN DE PRODUCTOS ADMIN
function renderAdminProductsTable(searchTerm = "") {
  const tbody = document.getElementById('admin-products-tbody');
  const totalBadge = document.getElementById('admin-products-total-badge');
  if (!tbody) return;

  let filtered = productsState;
  if (searchTerm) {
    filtered = productsState.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (totalBadge) totalBadge.innerText = `${filtered.length} productos`;

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-3">
          <img src="${p.image}" alt="${p.name}" style="width:42px; height:42px; border-radius:8px; object-fit:cover;" />
          <div>
            <div class="text-white fw-bold text-truncate" style="max-width:260px;">${p.name}</div>
            <small class="dyp-brand">${p.brand}</small>
          </div>
        </div>
      </td>
      <td><span class="dyp-badge-cat position-static ${p.category}">${p.category}</span></td>
      <td class="text-danger fw-bold font-monospace">$${p.price.toFixed(2)}</td>
      <td>
        <span class="dyp-stock-pill ${p.stock <= 0 ? 'out' : p.stock <= 10 ? 'low' : ''}">${p.stock}</span>
      </td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-light me-1" onclick="openEditProductModal(${p.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.id})"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>`).join('');
}

function deleteProduct(id) {
  if (confirm("¿Estás seguro de eliminar este producto del inventario?")) {
    productsState = productsState.filter(p => p.id !== id);
    renderAdminProductsTable();
    showToast("Producto eliminado exitosamente.");
  }
}

function openCreateProductModal() {
  document.getElementById('modalProductForm').reset();
  document.getElementById('modalProductId').value = '';
  document.getElementById('modalProductTitle').innerText = 'Crear Nuevo Producto';
  const modal = new bootstrap.Modal(document.getElementById('productFormModal'));
  modal.show();
}

function openEditProductModal(id) {
  const p = productsState.find(prod => prod.id === id);
  if (!p) return;

  document.getElementById('modalProductId').value = p.id;
  document.getElementById('modalProductName').value = p.name;
  document.getElementById('modalProductBrand').value = p.brand;
  document.getElementById('modalProductCategory').value = p.category;
  document.getElementById('modalProductPrice').value = p.price;
  document.getElementById('modalProductStock').value = p.stock;
  document.getElementById('modalProductDesc').value = p.description;
  document.getElementById('modalProductImage').value = p.image;
  document.getElementById('modalProductTitle').innerText = `Editar Producto: ${p.name}`;

  const modal = new bootstrap.Modal(document.getElementById('productFormModal'));
  modal.show();
}

function saveProductFromModal(e) {
  e.preventDefault();
  const idStr = document.getElementById('modalProductId').value;
  const name = document.getElementById('modalProductName').value;
  const brand = document.getElementById('modalProductBrand').value;
  const category = document.getElementById('modalProductCategory').value;
  const price = parseFloat(document.getElementById('modalProductPrice').value);
  const stock = parseInt(document.getElementById('modalProductStock').value);
  const description = document.getElementById('modalProductDesc').value;
  const image = document.getElementById('modalProductImage').value || "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80";

  if (price < 0 || stock < 0) {
    alert("Error de validación: El precio y el stock no pueden ser negativos (Restricción CHECK).");
    return;
  }

  if (idStr) {
    const id = parseInt(idStr);
    const prod = productsState.find(p => p.id === id);
    if (prod) {
      prod.name = name;
      prod.brand = brand;
      prod.category = category;
      prod.price = price;
      prod.stock = stock;
      prod.description = description;
      prod.image = image;
      showToast("Producto actualizado exitosamente.");
    }
  } else {
    const newId = Math.max(...productsState.map(p => p.id)) + 1;
    productsState.unshift({ id: newId, name, brand, category, price, stock, description, image });
    showToast("Nuevo producto añadido al catálogo.");
  }

  bootstrap.Modal.getInstance(document.getElementById('productFormModal')).hide();
  renderAdminProductsTable();
}

// 10. SIMULADOR DE FACE ID BIOMETRIC LOGIN
function simulateFaceId() {
  const faceModal = new bootstrap.Modal(document.getElementById('faceIdSimModal'));
  faceModal.show();

  const statusText = document.getElementById('faceSimStatus');
  const progressBar = document.getElementById('faceSimBar');

  statusText.innerText = "Inicializando cámara y modelos convolucionales...";
  progressBar.style.width = "20%";

  setTimeout(() => {
    statusText.innerText = "Rostro detectado. Extrayendo descriptor 128D...";
    progressBar.style.width = "65%";
  }, 1000);

  setTimeout(() => {
    statusText.innerText = "Calculando distancia euclidiana (d=0.28 < 0.42)...";
    progressBar.style.width = "95%";
  }, 2000);

  setTimeout(() => {
    statusText.innerText = "¡Identidad verificada exitosamente! Accediendo...";
    progressBar.style.width = "100%";
    setTimeout(() => {
      faceModal.hide();
      showToast("¡Autenticación biométrica Face ID exitosa! Bienvenido de nuevo.");
      showScreen('home');
    }, 700);
  }, 2700);
}

// 11. ASISTENTE VIRTUAL IA (CHATBOT SIMULADOR)
function toggleChatbot() {
  const panel = document.getElementById('dypChatPanel');
  panel.classList.toggle('d-none');
  if (!panel.classList.contains('d-none')) {
    const input = document.getElementById('dypChatInput');
    if (input) input.focus();
  }
}

function sendChatMessage() {
  const input = document.getElementById('dypChatInput');
  const msg = input.value.trim();
  if (!msg) return;

  const messagesContainer = document.getElementById('dypChatMessages');
  messagesContainer.innerHTML += `<div class="dyp-chat-bubble user">${escapeHtml(msg)}</div>`;
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Lógica de respuesta inteligente simulada (Reglas + IA)
  setTimeout(() => {
    const reply = generateChatbotReply(msg);
    messagesContainer.innerHTML += `<div class="dyp-chat-bubble bot">${reply}</div>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 600);
}

function generateChatbotReply(query) {
  const q = query.toLowerCase();

  if (q.includes("hola") || q.includes("buenas") || q.includes("saludos")) {
    return "¡Hola! Soy el asistente virtual inteligente de <strong>DYPStore</strong>. ¿En qué te puedo asesorar hoy? Tenemos equipamiento de Boxeo, Calzado y Suplementos.";
  }
  if (q.includes("guante") || q.includes("boxeo")) {
    return "En la categoría de Boxeo disponemos de los reconocidos <strong>Guantes de Boxeo Pro Everlast ($89.99)</strong> y <strong>Cascos Cleto Reyes ($65.00)</strong>. ¿Deseas que te lleve a la sección de boxeo?";
  }
  if (q.includes("proteina") || q.includes("suplemento") || q.includes("creatina")) {
    return "Nuestros suplementos top son la <strong>Whey Protein Gold Standard ($55.99)</strong> y la <strong>Creatina Monohidrato 500g BulkSupplements ($25.00)</strong> con grado farmacéutico.";
  }
  if (q.includes("tenis") || q.includes("calzado") || q.includes("zapatilla")) {
    return "Tenemos zapatillas premium como <strong>Nike Air Max 270 ($120.00)</strong> y <strong>Adidas Ultraboost 23 ($180.00)</strong>.";
  }
  if (q.includes("stock") || q.includes("inventario") || q.includes("agotado")) {
    return "El inventario se sincroniza en tiempo real con nuestra base de datos PostgreSQL. Actualmente contamos con 17 artículos con existencias garantizadas.";
  }
  return `He procesado tu consulta «${escapeHtml(query)}» consultando nuestro catálogo deportivo. Si necesitas comprar un producto específico, puedes buscarlo en el catálogo o ingresar a tu cuenta.`;
}

// 12. UTILIDADES GENERALES
function createProductCardHtml(p) {
  return `
    <div class="dyp-product-card">
      <div class="img-wrap">
        <span class="dyp-badge-cat ${p.category}">${p.category}</span>
        <img src="${p.image}" alt="${p.name}" />
      </div>
      <div class="dyp-product-body">
        <span class="dyp-brand">${p.brand}</span>
        <a href="javascript:void(0)" class="dyp-prod-title" onclick="viewProductDetails(${p.id})">${p.name}</a>
        <div class="d-flex align-items-center justify-content-between mt-auto pt-2">
          <span class="dyp-price">$${p.price.toFixed(2)}</span>
          <button class="btn btn-sm btn-danger px-3" onclick="addToCart(${p.id})">
            <i class="bi bi-bag-plus"></i> Añadir
          </button>
        </div>
      </div>
    </div>`;
}

function updateCartBadges() {
  const count = cartState.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.dyp-cart-count').forEach(el => {
    el.innerText = count;
  });
}

function showToast(message, type = "success") {
  const toastContainer = document.getElementById('dyp-toast');
  if (!toastContainer) return;

  toastContainer.innerText = message;
  toastContainer.className = `alert alert-${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'success'} dyp-toast show`;
  setTimeout(() => {
    toastContainer.className = "dyp-toast";
  }, 3200);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  showToast(`Tema cambiado a modo ${target}.`);
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
  const chatInput = document.getElementById('dypChatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }
});

