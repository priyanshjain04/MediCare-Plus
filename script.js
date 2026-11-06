/* =============================================
   MediCare+ Pharmacy — script.js
   ============================================= */

'use strict';

/* ============================================================
   DATA — Product Catalog
   ============================================================ */
const PRODUCTS_DEFAULT = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Tablets', price: 24, stock: 150, description: 'Commonly used for mild to moderate pain relief and to reduce fever. Safe for adults and children over 12.', emoji: '💊', requiresRx: false, featured: true },
  { id: 2, name: 'Amoxicillin 250mg', category: 'Tablets', price: 85, stock: 60, description: 'Broad-spectrum antibiotic for bacterial infections. Must be taken as prescribed by a doctor.', emoji: '💊', requiresRx: true, featured: true },
  { id: 3, name: 'Cetirizine 10mg', category: 'Tablets', price: 32, stock: 120, description: 'Antihistamine for allergy relief — hay fever, hives, and allergic rhinitis.', emoji: '💊', requiresRx: false, featured: false },
  { id: 4, name: 'Metformin 500mg', category: 'Tablets', price: 45, stock: 80, description: 'Oral medication to control high blood sugar in type 2 diabetes patients.', emoji: '💊', requiresRx: true, featured: false },
  { id: 5, name: 'Azithromycin 500mg', category: 'Tablets', price: 120, stock: 40, description: 'Antibiotic used for treating bacterial infections including respiratory tract infections.', emoji: '💊', requiresRx: true, featured: false },
  { id: 6, name: 'Vitamin C 1000mg', category: 'Vitamins', price: 89, stock: 200, description: 'Powerful antioxidant that supports immune function, skin health, and iron absorption.', emoji: '🍊', requiresRx: false, featured: true },
  { id: 7, name: 'Vitamin D3 2000IU', category: 'Vitamins', price: 149, stock: 180, description: 'Essential vitamin for bone health, immune system support, and calcium absorption.', emoji: '☀️', requiresRx: false, featured: true },
  { id: 8, name: 'Omega-3 Fish Oil', category: 'Vitamins', price: 299, stock: 90, description: 'Premium fish oil capsules rich in EPA and DHA for heart, brain, and joint health.', emoji: '🐟', requiresRx: false, featured: false },
  { id: 9, name: 'Multivitamin Complex', category: 'Vitamins', price: 199, stock: 110, description: 'Complete daily multivitamin with 23 essential vitamins and minerals for overall wellness.', emoji: '💊', requiresRx: false, featured: true },
  { id: 10, name: 'Cough Syrup Benadryl', category: 'Syrups', price: 95, stock: 70, description: 'Relieves dry and wet cough with a soothing formulation. Suitable for adults and children.', emoji: '🍶', requiresRx: false, featured: false },
  { id: 11, name: 'Ambroxol Syrup', category: 'Syrups', price: 58, stock: 55, description: 'Mucolytic agent that thins and loosens mucus in the airways to ease breathing.', emoji: '🍶', requiresRx: false, featured: false },
  { id: 12, name: 'Iron Tonic Syrup', category: 'Syrups', price: 75, stock: 45, description: 'Liquid iron supplement with folic acid for treating and preventing iron deficiency anaemia.', emoji: '🍶', requiresRx: false, featured: false },
  { id: 13, name: 'Digital Thermometer', category: 'Devices', price: 349, stock: 30, description: 'Fast and accurate digital thermometer with fever alert and memory function.', emoji: '🌡️', requiresRx: false, featured: true },
  { id: 14, name: 'BP Monitor (Digital)', category: 'Devices', price: 1299, stock: 15, description: 'Clinically validated automatic blood pressure monitor with irregular heartbeat detection.', emoji: '🫀', requiresRx: false, featured: false },
  { id: 15, name: 'Pulse Oximeter', category: 'Devices', price: 799, stock: 20, description: 'Portable fingertip pulse oximeter for quick SpO2 and pulse rate measurement.', emoji: '🩺', requiresRx: false, featured: true },
  { id: 16, name: 'Glucometer Kit', category: 'Devices', price: 649, stock: 25, description: 'Easy-to-use blood glucose monitor with 25 test strips for diabetes management.', emoji: '💉', requiresRx: false, featured: false },
  { id: 17, name: 'Sunscreen SPF 50', category: 'Personal Care', price: 249, stock: 85, description: 'Broad-spectrum SPF 50 sunscreen. Lightweight, non-greasy formula suitable for daily use.', emoji: '🧴', requiresRx: false, featured: false },
  { id: 18, name: 'Hand Sanitizer 500ml', category: 'Personal Care', price: 129, stock: 100, description: '70% alcohol-based hand sanitizer with aloe vera for effective germ protection.', emoji: '🧴', requiresRx: false, featured: false },
  { id: 19, name: 'Surgical Masks (50 pcs)', category: 'Personal Care', price: 199, stock: 200, description: '3-ply surgical face masks with nose clip. BFE ≥95%. Box of 50.', emoji: '😷', requiresRx: false, featured: false },
  { id: 20, name: 'Baby Gripe Water', category: 'Baby Care', price: 115, stock: 60, description: 'Natural gripe water for colic, gas, and stomach discomfort in infants. Alcohol-free.', emoji: '👶', requiresRx: false, featured: false },
  { id: 21, name: 'Baby Diaper Rash Cream', category: 'Baby Care', price: 179, stock: 45, description: 'Zinc oxide barrier cream for preventing and treating diaper rash. Hypoallergenic.', emoji: '🧴', requiresRx: false, featured: false },
  { id: 22, name: 'Ibuprofen 400mg', category: 'Tablets', price: 42, stock: 0, description: 'Non-steroidal anti-inflammatory drug (NSAID) for pain, fever, and inflammation.', emoji: '💊', requiresRx: false, featured: false },
];

/* ============================================================
   STATE
   ============================================================ */
let cart = [];
let products = [];
let currentFilter = 'All';
let currentProductId = null;
let editingProductId = null;

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Simulate loading
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);

  // Load data from localStorage (or use defaults)
  loadProducts();
  loadCart();
  renderFeatured();
  renderProducts();
  updateCartBadge();
  renderAdminTable();
  updateAdminStats();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  });
});

/* ============================================================
   LOCAL STORAGE HELPERS
   ============================================================ */
function loadProducts() {
  const stored = localStorage.getItem('medicare_products');
  products = stored ? JSON.parse(stored) : [...PRODUCTS_DEFAULT];
}

function saveProducts() {
  localStorage.setItem('medicare_products', JSON.stringify(products));
}

function loadCart() {
  const stored = localStorage.getItem('medicare_cart');
  cart = stored ? JSON.parse(stored) : [];
}

function saveCart() {
  localStorage.setItem('medicare_cart', JSON.stringify(cart));
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });

  // Close mobile menu
  document.getElementById('navLinks')?.classList.remove('open');

  // Refresh relevant pages
  if (pageId === 'cart') renderCart();
  if (pageId === 'admin') { renderAdminTable(); updateAdminStats(); }
  if (pageId === 'products') { renderProducts(); }
}

function toggleMenu() {
  document.getElementById('navLinks')?.classList.toggle('open');
}

/* ============================================================
   DARK MODE
   ============================================================ */
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.querySelector('#darkModeToggle i');
  if (icon) icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('medicare_theme', isDark ? 'light' : 'dark');
}

// Restore saved theme
(function restoreTheme() {
  const saved = localStorage.getItem('medicare_theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const icon = document.querySelector('#darkModeToggle i');
    if (icon) icon.className = 'fas fa-sun';
  }
})();

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
  toast.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
  toast.className = `toast ${type} show`;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============================================================
   PRODUCT RENDERING
   ============================================================ */
function getProductEmoji(category) {
  const map = { Tablets: '💊', Syrups: '🍶', Vitamins: '🌿', 'Personal Care': '🧴', Devices: '🩺', 'Baby Care': '👶' };
  return map[category] || '💊';
}

function createProductCard(product, compact = false) {
  const inStock = product.stock > 0;
  const featuredBadge = product.featured ? `<span class="product-badge">Featured</span>` : '';
  const rxBadge = product.requiresRx ? `<span class="product-rx-badge">Rx</span>` : '';
  const emoji = product.emoji || getProductEmoji(product.category);
  const stockLabel = inStock
    ? `<span class="product-stock stock-in"><i class="fas fa-check-circle"></i> In Stock</span>`
    : `<span class="product-stock stock-out"><i class="fas fa-times-circle"></i> Out of Stock</span>`;

  return `
    <div class="product-card" onclick="showProductDetail(${product.id})">
      <div class="product-img-wrap">
        ${featuredBadge}${rxBadge}
        <span style="font-size:3.5rem">${emoji}</span>
      </div>
      <div class="product-body">
        <div class="product-cat">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.description}</div>
      </div>
      <div class="product-footer">
        <div>
          <div class="product-price">₹${product.price}</div>
          ${stockLabel}
        </div>
        <button class="btn-add" title="Add to cart"
          onclick="event.stopPropagation(); addToCart(${product.id})"
          ${!inStock ? 'disabled' : ''}>
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>`;
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = products.filter(p => p.featured).slice(0, 8);
  grid.innerHTML = featured.length
    ? featured.map(p => createProductCard(p)).join('')
    : '<p style="color:var(--text-muted)">No featured products.</p>';
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  let filtered = [...products];

  // Category filter
  const catEl = document.querySelector('input[name="cat"]:checked');
  const cat = catEl ? catEl.value : 'All';
  if (cat !== 'All') filtered = filtered.filter(p => p.category === cat);

  // Search
  const search = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
  if (search) filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.category.toLowerCase().includes(search) ||
    p.description.toLowerCase().includes(search)
  );

  // Price range
  const maxPrice = parseInt(document.getElementById('priceRange')?.value || 1000);
  filtered = filtered.filter(p => p.price <= maxPrice);

  // In stock only
  if (document.getElementById('inStockOnly')?.checked) {
    filtered = filtered.filter(p => p.stock > 0);
  }

  // Sort
  const sort = document.getElementById('sortSelect')?.value || 'default';
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));

  grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
  if (countEl) countEl.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
  if (noResults) noResults.classList.toggle('hidden', filtered.length > 0);
}

function applyFilters() { renderProducts(); }

function clearFilters() {
  const allRadio = document.querySelector('input[name="cat"][value="All"]');
  if (allRadio) allRadio.checked = true;
  const search = document.getElementById('searchInput');
  if (search) search.value = '';
  const range = document.getElementById('priceRange');
  if (range) { range.value = 1000; updatePriceLabel(1000); }
  const inStock = document.getElementById('inStockOnly');
  if (inStock) inStock.checked = false;
  const sort = document.getElementById('sortSelect');
  if (sort) sort.value = 'default';
  renderProducts();
}

function updatePriceLabel(val) {
  const el = document.getElementById('priceLabel');
  if (el) el.textContent = val;
}

function filterAndGo(cat) {
  showPage('products');
  setTimeout(() => {
    const radio = document.querySelector(`input[name="cat"][value="${cat}"]`);
    if (radio) { radio.checked = true; applyFilters(); }
  }, 100);
}

/* ============================================================
   PRODUCT DETAIL
   ============================================================ */
function showProductDetail(id) {
  currentProductId = id;
  const product = products.find(p => p.id === id);
  if (!product) return;

  const inStock = product.stock > 0;
  const emoji = product.emoji || getProductEmoji(product.category);

  document.getElementById('productDetail').innerHTML = `
    <div class="product-detail-grid">
      <div class="detail-img">${emoji}</div>
      <div class="detail-info">
        <div class="detail-category">${product.category}</div>
        <h1 class="detail-title">${product.name}</h1>
        <div class="detail-price">₹${product.price}</div>
        <p class="detail-desc">${product.description}</p>
        <div class="detail-tags">
          <span class="detail-tag"><i class="fas fa-shield-alt"></i> 100% Genuine</span>
          <span class="detail-tag"><i class="fas fa-truck"></i> Fast Delivery</span>
          ${product.requiresRx ? `<span class="detail-tag" style="background:rgba(229,57,53,.1);color:var(--danger)"><i class="fas fa-prescription"></i> Prescription Required</span>` : ''}
          ${product.stock > 0 ? `<span class="detail-tag" style="background:var(--primary-light);color:var(--primary)"><i class="fas fa-check"></i> In Stock (${product.stock} units)</span>` : `<span class="detail-tag" style="background:rgba(229,57,53,.1);color:var(--danger)"><i class="fas fa-times"></i> Out of Stock</span>`}
        </div>
        <div class="detail-qty" id="detailQtyControl">
          <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
          <span class="qty-val" id="detailQty">1</span>
          <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
        </div>
        <div class="detail-actions">
          <button class="btn btn-primary" onclick="addToCartFromDetail()" ${!inStock ? 'disabled style="opacity:.5;cursor:not-allowed"' : ''}>
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <button class="btn btn-outline" onclick="showPage('cart')">
            <i class="fas fa-bag-shopping"></i> View Cart
          </button>
        </div>
      </div>
    </div>`;

  showPage('detail');
}

function changeDetailQty(delta) {
  const el = document.getElementById('detailQty');
  if (!el) return;
  let val = parseInt(el.textContent) + delta;
  val = Math.max(1, Math.min(val, 20));
  el.textContent = val;
}

function addToCartFromDetail() {
  const qty = parseInt(document.getElementById('detailQty')?.textContent || 1);
  for (let i = 0; i < qty; i++) addToCart(currentProductId, true);
  if (qty > 1) showToast(`${qty} items added to cart!`);
}

/* ============================================================
   CART
   ============================================================ */
function addToCart(productId, silent = false) {
  const product = products.find(p => p.id === productId);
  if (!product || product.stock === 0) {
    showToast('This item is out of stock.', 'error');
    return;
  }

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  if (!silent) showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
  showToast('Item removed from cart.', 'info');
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = total;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  if (!container || !summaryEl) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <h3>Your cart is empty</h3>
        <p>Add some medicines to get started.</p>
        <button class="btn btn-primary" onclick="showPage('products')"><i class="fas fa-store"></i> Browse Products</button>
      </div>`;
    summaryEl.innerHTML = '';
    return;
  }

  // Cart items
  container.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    const emoji = product.emoji || getProductEmoji(product.category);
    return `
      <div class="cart-item">
        <div class="cart-item-img">${emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-cat">${product.category}</div>
          <div class="cart-item-price">₹${(product.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <div class="detail-qty" style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;display:flex;align-items:center">
            <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)" style="width:34px;height:34px;background:var(--surface2);font-size:1rem">−</button>
            <span class="qty-val" style="width:40px;text-align:center;font-size:.88rem">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)" style="width:34px;height:34px;background:var(--surface2);font-size:1rem">+</button>
          </div>
          <button class="cart-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i> Remove</button>
        </div>
      </div>`;
  }).join('');

  // Summary
  const subtotal = cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const discount = subtotal >= 999 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + delivery - discount;

  summaryEl.innerHTML = `
    <h3>Order Summary</h3>
    <div class="cart-summary-row"><span>Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} items)</span><span>₹${subtotal.toFixed(2)}</span></div>
    <div class="cart-summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:var(--primary)">FREE</span>' : '₹' + delivery}</span></div>
    ${discount > 0 ? `<div class="cart-summary-row" style="color:var(--primary)"><span>Discount (5%)</span><span>−₹${discount}</span></div>` : ''}
    <div class="cart-summary-row total"><span>Total</span><span>₹${total.toFixed(2)}</span></div>
    ${subtotal < 499 ? `<p style="font-size:.78rem;color:var(--text-muted);margin-top:8px">Add ₹${(499-subtotal).toFixed(2)} more for free delivery!</p>` : ''}
    <button class="btn btn-primary btn-full" style="margin-top:20px" onclick="checkout()">
      <i class="fas fa-lock"></i> Proceed to Checkout
    </button>
    <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="showPage('products')">
      <i class="fas fa-arrow-left"></i> Continue Shopping
    </button>`;
}

function checkout() {
  showToast('Redirecting to checkout... (Demo mode)', 'info');
}

/* ============================================================
   AUTH FORMS
   ============================================================ */
function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');

  if (tab === 'login') {
    loginForm?.classList.remove('hidden');
    signupForm?.classList.add('hidden');
    loginTab?.classList.add('active');
    signupTab?.classList.remove('active');
  } else {
    loginForm?.classList.add('hidden');
    signupForm?.classList.remove('hidden');
    loginTab?.classList.remove('active');
    signupTab?.classList.add('active');
  }
}

function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.querySelector('i').className = isText ? 'fas fa-eye' : 'fas fa-eye-slash';
}

function setError(fieldId, msg) {
  const el = document.getElementById(fieldId);
  if (el) el.textContent = msg;
}

function clearErrors(ids) {
  ids.forEach(id => setError(id, ''));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s\-+]/g, ''));
}

function handleLogin(e) {
  e.preventDefault();
  clearErrors(['loginEmailError', 'loginPasswordError']);
  let valid = true;

  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;

  if (!validateEmail(email)) { setError('loginEmailError', 'Please enter a valid email address.'); valid = false; }
  if (!password || password.length < 6) { setError('loginPasswordError', 'Password must be at least 6 characters.'); valid = false; }

  if (valid) {
    showToast('Signed in successfully! Welcome back.', 'success');
    setTimeout(() => showPage('home'), 500);
  }
}

function handleSignup(e) {
  e.preventDefault();
  clearErrors(['firstNameError', 'signupEmailError', 'signupPhoneError', 'signupPasswordError', 'signupConfirmError', 'termsError']);
  let valid = true;

  const first = document.getElementById('signupFirstName')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const phone = document.getElementById('signupPhone')?.value.trim();
  const password = document.getElementById('signupPassword')?.value;
  const confirm = document.getElementById('signupConfirm')?.value;
  const terms = document.getElementById('termsCheck')?.checked;

  if (!first || first.length < 2) { setError('firstNameError', 'First name must be at least 2 characters.'); valid = false; }
  if (!validateEmail(email)) { setError('signupEmailError', 'Please enter a valid email address.'); valid = false; }
  if (!validatePhone(phone)) { setError('signupPhoneError', 'Please enter a valid 10-digit Indian phone number.'); valid = false; }
  if (!password || password.length < 8) { setError('signupPasswordError', 'Password must be at least 8 characters.'); valid = false; }
  if (password !== confirm) { setError('signupConfirmError', 'Passwords do not match.'); valid = false; }
  if (!terms) { setError('termsError', 'Please accept the terms to continue.'); valid = false; }

  if (valid) {
    showToast('Account created successfully! Welcome to MediCare+.', 'success');
    setTimeout(() => { switchAuthTab('login'); }, 800);
  }
}

/* ============================================================
   PRESCRIPTION
   ============================================================ */
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('uploadZone')?.classList.add('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('uploadZone')?.classList.remove('drag-over');
  const file = e.dataTransfer?.files[0];
  if (file) processUploadFile(file);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processUploadFile(file);
}

function processUploadFile(file) {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowed.includes(file.type)) {
    showToast('Please upload JPG, PNG, or PDF files only.', 'error'); return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('File size must be under 10MB.', 'error'); return;
  }
  const preview = document.getElementById('uploadPreview');
  if (preview) {
    const icon = file.type === 'application/pdf' ? 'fa-file-pdf' : 'fa-file-image';
    preview.innerHTML = `<i class="fas ${icon}"></i> ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    preview.classList.remove('hidden');
  }
  showToast('Prescription file selected!', 'success');
}

function handlePrescription(e) {
  e.preventDefault();
  const name = document.getElementById('patientName')?.value.trim();
  const phone = document.getElementById('patientPhone')?.value.trim();
  const file = document.getElementById('prescFile')?.files[0];

  if (!name) { showToast('Please enter patient name.', 'error'); return; }
  if (!validatePhone(phone)) { showToast('Please enter a valid phone number.', 'error'); return; }
  if (!file) { showToast('Please upload your prescription file.', 'error'); return; }

  showToast('Prescription submitted! Our pharmacist will verify within 30 minutes.', 'success');
  e.target.reset();
  const preview = document.getElementById('uploadPreview');
  if (preview) preview.classList.add('hidden');
}

/* ============================================================
   ADMIN DASHBOARD
   ============================================================ */
function updateAdminStats() {
  const statP = document.getElementById('statProducts');
  const statInStock = document.getElementById('statInStock');
  const statLow = document.getElementById('statLow');
  if (statP) statP.textContent = products.length;
  if (statInStock) statInStock.textContent = products.filter(p => p.stock > 10).length;
  if (statLow) statLow.textContent = products.filter(p => p.stock > 0 && p.stock <= 10).length;
}

function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  const noRes = document.getElementById('adminNoResults');
  if (!tbody) return;

  const search = document.getElementById('adminSearch')?.value.toLowerCase().trim() || '';
  let filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    noRes?.classList.remove('hidden');
    return;
  }
  noRes?.classList.add('hidden');

  tbody.innerHTML = filtered.map(p => {
    const stockClass = p.stock === 0 ? 'stock-zero' : p.stock <= 10 ? 'stock-low' : 'stock-ok';
    const stockLabel = p.stock === 0 ? 'Out of Stock' : p.stock <= 10 ? `Low (${p.stock})` : p.stock;
    return `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td>₹${p.price}</td>
        <td><span class="stock-badge ${stockClass}">${stockLabel}</span></td>
        <td>${p.requiresRx ? '<span style="color:var(--danger);font-weight:600">Yes</span>' : '<span style="color:var(--primary)">No</span>'}</td>
        <td>
          <div class="actions-cell">
            <button class="tbl-edit" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i> Edit</button>
            <button class="tbl-delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  updateAdminStats();
}

function handleAdminSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('adminName')?.value.trim();
  const category = document.getElementById('adminCategory')?.value;
  const price = parseFloat(document.getElementById('adminPrice')?.value);
  const desc = document.getElementById('adminDesc')?.value.trim();
  const stock = parseInt(document.getElementById('adminStock')?.value || 0);
  const requiresRx = document.getElementById('adminRx')?.value === 'true';
  const editId = document.getElementById('editProductId')?.value;

  if (!name || !category || isNaN(price)) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  if (editId) {
    // Update existing
    const idx = products.findIndex(p => p.id === parseInt(editId));
    if (idx !== -1) {
      products[idx] = { ...products[idx], name, category, price, description: desc, stock, requiresRx };
      showToast(`${name} updated successfully!`, 'success');
    }
  } else {
    // Add new
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    products.push({
      id: newId, name, category, price,
      description: desc || 'No description provided.',
      stock, requiresRx,
      emoji: getProductEmoji(category),
      featured: false
    });
    showToast(`${name} added to inventory!`, 'success');
  }

  saveProducts();
  renderAdminTable();
  renderProducts();
  renderFeatured();
  cancelAdminEdit();
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById('editProductId').value = id;
  document.getElementById('adminName').value = product.name;
  document.getElementById('adminCategory').value = product.category;
  document.getElementById('adminPrice').value = product.price;
  document.getElementById('adminDesc').value = product.description;
  document.getElementById('adminStock').value = product.stock;
  document.getElementById('adminRx').value = product.requiresRx ? 'true' : 'false';
  document.getElementById('adminFormTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Medicine';
  document.getElementById('adminSubmitBtn').innerHTML = '<i class="fas fa-save"></i> Update Medicine';

  // Scroll to form
  document.getElementById('adminForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function cancelAdminEdit() {
  document.getElementById('adminForm')?.reset();
  document.getElementById('editProductId').value = '';
  document.getElementById('adminFormTitle').innerHTML = '<i class="fas fa-plus"></i> Add New Medicine';
  document.getElementById('adminSubmitBtn').innerHTML = '<i class="fas fa-save"></i> Save Medicine';
}

function deleteProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (!confirm(`Are you sure you want to delete "${product.name}"? This cannot be undone.`)) return;

  products = products.filter(p => p.id !== id);
  cart = cart.filter(item => item.id !== id);
  saveProducts();
  saveCart();
  updateCartBadge();
  renderAdminTable();
  renderProducts();
  renderFeatured();
  showToast(`${product.name} has been deleted.`, 'info');
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function handleContact(e) {
  e.preventDefault();
  clearErrors(['cNameError', 'cEmailError', 'cSubjectError', 'cMessageError']);
  let valid = true;

  const name = document.getElementById('cName')?.value.trim();
  const email = document.getElementById('cEmail')?.value.trim();
  const subject = document.getElementById('cSubject')?.value;
  const message = document.getElementById('cMessage')?.value.trim();

  if (!name || name.length < 2) { setError('cNameError', 'Please enter your name (at least 2 characters).'); valid = false; }
  if (!validateEmail(email)) { setError('cEmailError', 'Please enter a valid email address.'); valid = false; }
  if (!subject) { setError('cSubjectError', 'Please select a subject.'); valid = false; }
  if (!message || message.length < 20) { setError('cMessageError', 'Message must be at least 20 characters long.'); valid = false; }

  if (valid) {
    showToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
    e.target.reset();
  }
}
