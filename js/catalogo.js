document.addEventListener('DOMContentLoaded', () => {
  renderCategoriasOptions();
  renderCatalogo();

  document.getElementById('filter-categoria').addEventListener('change', renderCatalogo);
  document.getElementById('filter-precio').addEventListener('input', (e) => {
    document.getElementById('precio-val').textContent = `$${parseInt(e.target.value).toLocaleString('es-CL')}`;
    renderCatalogo();
  });
});

function renderCategoriasOptions() {
  const productos = getProductos();
  const categorias = [...new Set(productos.map(p => p.categoria))];
  const select = document.getElementById('filter-categoria');
  if (!select) return;

  select.innerHTML = `<option value="todas">Todas las categorías</option>`;
  categorias.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

function renderCatalogo() {
  const productos = getProductos();
  const catSelec = document.getElementById('filter-categoria').value;
  const precioMax = parseInt(document.getElementById('filter-precio').value);

  const filtrados = productos.filter(p => {
    const cumpleCat = (catSelec === 'todas' || p.categoria === catSelec);
    const precioEfectivo = p.precioOferta ? p.precioOferta : p.precio;
    const cumplePrecio = precioEfectivo <= precioMax;
    return cumpleCat && cumplePrecio;
  });

  const grid = document.getElementById('catalogo-grid');
  if (!grid) return;

  if (filtrados.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; font-size:1.1rem;">No se encontraron productos con los filtros seleccionados.</p>`;
    return;
  }

  grid.innerHTML = filtrados.map(p => {
    const tieneOferta = p.precioOferta !== null && p.precioOferta < p.precio;
    const precioHTML = tieneOferta 
      ? `<span class="precio-antiguo">$${p.precio.toLocaleString('es-CL')}</span> <span class="precio-oferta">$${p.precioOferta.toLocaleString('es-CL')}</span>`
      : `<span>$${p.precio.toLocaleString('es-CL')}</span>`;

    const sinStock = p.stock <= 0;

    return `
      <article class="card-producto">
        ${tieneOferta ? `<span class="badge-oferta">OFERTA</span>` : ''}
        <img src="${p.imagen}" alt="${p.nombre}" class="card-img">
        <div class="card-body">
          <span class="card-cat">${p.categoria}</span>
          <h3 class="card-title">${p.nombre}</h3>
          <p class="card-brand">${p.marca} ${p.modelo}</p>
          <div class="card-precio">${precioHTML}</div>
          <p class="card-stock ${sinStock ? 'sin-stock' : ''}">${sinStock ? 'Agotado' : 'Stock: ' + p.stock}</p>
          <div class="card-actions">
            <a href="detalle.html?id=${p.id}" class="btn-secondary">Ver detalle</a>
            <button class="btn-primary" onclick="addToCart('${p.id}')" ${sinStock ? 'disabled style="opacity:0.5;"' : ''}>
              ${sinStock ? 'Sin stock' : 'Agregar'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}