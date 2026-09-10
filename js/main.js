function updateCartBadge() {
  const carrito = getCarrito();
  const totalCount = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const badgeEl = document.getElementById('cart-badge');
  if (badgeEl) {
    badgeEl.textContent = totalCount;
  }
}

function renderNavSession() {
  const sessionEl = document.getElementById('nav-session');
  if (!sessionEl) return;
  const sesion = getSesion();
  if (sesion) {
    sessionEl.innerHTML = `
      <span style="color:#f39c12; font-size:0.9rem;">Hola, <strong>${sesion.nombre}</strong></span>
      <button onclick="logout()" class="btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;">Salir</button>
    `;
  } else {
    sessionEl.innerHTML = `
      <a href="login.html" class="nav-link">Iniciar Sesión</a>
      <a href="registro.html" class="btn-primary" style="padding: 6px 12px; font-size:0.85rem;">Registro</a>
    `;
  }
}

function addToCart(productoId, cantidad = 1) {
  const productos = getProductos();
  const producto = productos.find(p => p.id === productoId);
  if (!producto) return;

  let carrito = getCarrito();
  const itemExistente = carrito.find(item => item.productoId === productoId);
  const cantidadActual = itemExistente ? itemExistente.cantidad : 0;

  if (cantidadActual + cantidad > producto.stock) {
    alert(`Stock insuficiente. Solo quedan ${producto.stock} unidades disponibles.`);
    return;
  }

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ productoId: productoId, cantidad: cantidad });
  }

  saveCarrito(carrito);
  updateCartBadge();
  alert(`"${producto.nombre}" ha sido agregado al carrito.`);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderNavSession();

  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }
});