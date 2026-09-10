document.addEventListener('DOMContentLoaded', () => {
  renderCarrito();
});

function renderCarrito() {
  const carrito = getCarrito();
  const productos = getProductos();
  const body = document.getElementById('carrito-body');
  const totalEl = document.getElementById('carrito-total');
  const emptyMsg = document.getElementById('carrito-vacio');
  const tableWrapper = document.getElementById('carrito-tabla-wrapper');

  if (!carrito || carrito.length === 0) {
    if (tableWrapper) tableWrapper.style.display = 'none';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (tableWrapper) tableWrapper.style.display = 'block';
  if (emptyMsg) emptyMsg.style.display = 'none';

  let totalGeneral = 0;

  body.innerHTML = carrito.map(item => {
    const prod = productos.find(p => p.id === item.productoId);
    if (!prod) return '';

    const precioUnitario = prod.precioOferta ? prod.precioOferta : prod.precio;
    const subtotal = precioUnitario * item.cantidad;
    totalGeneral += subtotal;

    return `
      <tr>
        <td class="col-prod">
          <img src="${prod.imagen}" alt="${prod.nombre}" class="cart-thumb">
          <div>
            <strong>${prod.nombre}</strong><br>
            <small style="color:var(--text-muted);">${prod.marca} ${prod.modelo}</small>
          </div>
        </td>
        <td>$${precioUnitario.toLocaleString('es-CL')}</td>
        <td>
          <input type="number" min="1" max="${prod.stock}" value="${item.cantidad}" 
            onchange="modificarCantidad('${prod.id}', this.value)" class="form-control" style="width:70px;">
        </td>
        <td><strong>$${subtotal.toLocaleString('es-CL')}</strong></td>
        <td>
          <button class="btn-danger" onclick="eliminarDelCarrito('${prod.id}')">Eliminar</button>
        </td>
      </tr>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = `$${totalGeneral.toLocaleString('es-CL')}`;
}

function modificarCantidad(productoId, nuevaCantidad) {
  let cant = parseInt(nuevaCantidad);
  if (isNaN(cant) || cant < 1) cant = 1;

  const productos = getProductos();
  const prod = productos.find(p => p.id === productoId);
  if (cant > prod.stock) {
    alert(`No puedes agregar más de ${prod.stock} unidades de este producto.`);
    cant = prod.stock;
  }

  let carrito = getCarrito();
  const item = carrito.find(i => i.productoId === productoId);
  if (item) {
    item.cantidad = cant;
    saveCarrito(carrito);
    renderCarrito();
    updateCartBadge();
  }
}

function eliminarDelCarrito(productoId) {
  let carrito = getCarrito();
  carrito = carrito.filter(i => i.productoId !== productoId);
  saveCarrito(carrito);
  renderCarrito();
  updateCartBadge();
}

function vaciarCarrito() {
  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
    saveCarrito([]);
    renderCarrito();
    updateCartBadge();
  }
}

function finalizarCompra() {
  let carrito = getCarrito();
  if (carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  let productos = getProductos();

  // Validar stock antes de descontar
  for (let item of carrito) {
    let p = productos.find(prod => prod.id === item.productoId);
    if (!p || p.stock < item.cantidad) {
      alert(`Stock insuficiente para "${p ? p.nombre : item.productoId}". Stock disponible: ${p ? p.stock : 0}.`);
      return;
    }
  }

  // Descontar stock
  for (let item of carrito) {
    let p = productos.find(prod => prod.id === item.productoId);
    if (p) {
      p.stock -= item.cantidad;
    }
  }

  saveProductos(productos);
  saveCarrito([]);
  updateCartBadge();

  alert('¡Compra realizada con éxito! Gracias por preferir Sonido Vivo. Tu pedido ha sido procesado.');
  window.location.href = 'index.html';
}