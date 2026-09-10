document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const container = document.getElementById('detalle-container');

  if (!id) {
    container.innerHTML = `<p class="error-msg">Producto no especificado. <a href="catalogo.html">Volver al catálogo</a></p>`;
    return;
  }

  const productos = getProductos();
  const p = productos.find(item => item.id === id);

  if (!p) {
    container.innerHTML = `<p class="error-msg">Producto no encontrado. <a href="catalogo.html">Volver al catálogo</a></p>`;
    return;
  }

  const tieneOferta = p.precioOferta !== null && p.precioOferta < p.precio;
  const precioHTML = tieneOferta 
    ? `<span class="precio-antiguo">$${p.precio.toLocaleString('es-CL')}</span> <span class="precio-oferta">$${p.precioOferta.toLocaleString('es-CL')}</span>`
    : `<span>$${p.precio.toLocaleString('es-CL')}</span>`;

  const sinStock = p.stock <= 0;

  container.innerHTML = `
    <div class="detalle-wrapper">
      <div>
        <img src="${p.imagen}" alt="${p.nombre}" class="detalle-img">
      </div>
      <div>
        <span class="card-cat">${p.categoria}</span>
        <h1 style="margin: 10px 0;">${p.nombre}</h1>
        <p style="color:var(--text-muted); margin-bottom:15px;">Marca: <strong>${p.marca}</strong> | Modelo: <strong>${p.modelo}</strong> (Cód: ${p.id})</p>
        <div style="font-size: 1.8rem; font-weight: bold; margin-bottom:15px;">${precioHTML}</div>
        <p class="card-stock ${sinStock ? 'sin-stock' : ''}" style="font-size:1.1rem; margin-bottom:20px;">
          ${sinStock ? 'Sin stock disponible' : `Stock disponible: ${p.stock} unidades`}
        </p>
        <div style="margin-bottom:25px;">
          <h3>Descripción</h3>
          <p style="line-height:1.6; color:#555;">${p.descripcion}</p>
        </div>
        
        ${!sinStock ? `
          <div style="display:flex; gap:15px; align-items:center;">
            <label for="cant-input" style="font-weight:bold;">Cantidad:</label>
            <input type="number" id="cant-input" value="1" min="1" max="${p.stock}" class="form-control" style="width:80px;">
            <button class="btn-primary" id="btn-add-detalle" style="padding:12px 24px;">Agregar al Carrito</button>
          </div>
        ` : `<p class="error-msg" style="font-size:1.1rem;">Producto agotado temporalmente.</p>`}
      </div>
    </div>
  `;

  const btnAdd = document.getElementById('btn-add-detalle');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const cant = parseInt(document.getElementById('cant-input').value) || 1;
      addToCart(p.id, cant);
    });
  }
});