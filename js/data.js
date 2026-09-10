// Base de datos inicial de productos de Sonido Vivo
const PRODUCTOS_INICIALES = [
  {
    id: "GA001",
    nombre: "Guitarra Acústica Folk",
    marca: "Yamaha",
    modelo: "F310",
    categoria: "Guitarras Acústicas",
    precio: 129990,
    precioOferta: 114990,
    stock: 8,
    imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
    descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes que buscan gran sonoridad y durabilidad."
  },
  {
    id: "GA002",
    nombre: "Guitarra Acústica Dreadnought",
    marca: "Fender",
    modelo: "CD-60S",
    categoria: "Guitarras Acústicas",
    precio: 189990,
    precioOferta: null,
    stock: 5,
    imagen: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=500",
    descripcion: "Tapa de abeto macizo, brazo de caoba. Sonido cálido, resonante y proyectado."
  },
  {
    id: "GA003",
    nombre: "Guitarra Clásica 4/4",
    marca: "Yamaha",
    modelo: "C40",
    categoria: "Guitarras Acústicas",
    precio: 89990,
    precioOferta: 79990,
    stock: 10,
    imagen: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500",
    descripcion: "Cuerdas de nailon, tapa de abeto. Excelente acabado y comodidad para estudio y flamenco."
  },
  {
    id: "GE001",
    nombre: "Guitarra Eléctrica Stratocaster",
    marca: "Squier",
    modelo: "Affinity Strat",
    categoria: "Guitarras Eléctricas",
    precio: 249990,
    precioOferta: null,
    stock: 5,
    imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500",
    descripcion: "Cuerpo de álamo, mástil de arce y 3 pastillas single-coil para un tono clásico versátil."
  },
  {
    id: "GE002",
    nombre: "Guitarra Eléctrica Les Paul",
    marca: "Epiphone",
    modelo: "Les Paul Std",
    categoria: "Guitarras Eléctricas",
    precio: 329990,
    precioOferta: 299990,
    stock: 4,
    imagen: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500",
    descripcion: "Cuerpo de caoba con tapa de arce y dos pastillas humbucker de alta ganancia."
  },
  {
    id: "BA001",
    nombre: "Bajo Eléctrico 4 Cuerdas",
    marca: "Squier",
    modelo: "Affinity PJ",
    categoria: "Bajos Eléctricos",
    precio: 299990,
    precioOferta: null,
    stock: 5,
    imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500",
    descripcion: "Configuración de pastillas PJ versátiles, cuerpo de álamo y mástil en C suave al tacto."
  },
  {
    id: "BA002",
    nombre: "Bajo Eléctrico Jazz Bass",
    marca: "Fender",
    modelo: "Player Jazz",
    categoria: "Bajos Eléctricos",
    precio: 699990,
    precioOferta: null,
    stock: 2,
    imagen: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500",
    descripcion: "Cuerpo de aliso (Alder), dos pastillas Alnico V Jazz single-coil con sonido definido."
  },
  {
    id: "AM001",
    nombre: "Amplificador de Guitarra 15W",
    marca: "Fender",
    modelo: "Frontman 15G",
    categoria: "Amplificadores",
    precio: 99990,
    precioOferta: null,
    stock: 6,
    imagen: "https://images.unsplash.com/photo-1558086478-f71661d9a04a?w=500",
    descripcion: "15 Watts RMS, altavoz de 8 pulgadas, canal limpio y overdrive seleccionable."
  },
  {
    id: "TE001",
    nombre: "Teclado Sintetizador 61 Teclas",
    marca: "Casio",
    modelo: "CTX700",
    categoria: "Teclados",
    precio: 219990,
    precioOferta: 199990,
    stock: 4,
    imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500",
    descripcion: "61 teclas sensibles a la pulsación, fuente de sonido AiX y 600 tonos dinámicos."
  },
  {
    id: "BAT01",
    nombre: "Batería Acústica 5 Piezas",
    marca: "Pearl",
    modelo: "Roadshow",
    categoria: "Baterías",
    precio: 499990,
    precioOferta: null,
    stock: 3,
    imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500",
    descripcion: "Incluye bombo, toms, caja, platillos de ensayo y banquillo. Lista para empezar a tocar."
  }
];

// Inicialización de LocalStorage
function initStorage() {
  if (!localStorage.getItem('sv_productos')) {
    localStorage.setItem('sv_productos', JSON.stringify(PRODUCTOS_INICIALES));
  }
  if (!localStorage.getItem('sv_usuarios')) {
    localStorage.setItem('sv_usuarios', JSON.stringify([]));
  }
  if (!localStorage.getItem('sv_carrito')) {
    localStorage.setItem('sv_carrito', JSON.stringify([]));
  }
}

function getProductos() {
  return JSON.parse(localStorage.getItem('sv_productos')) || [];
}

function saveProductos(prods) {
  localStorage.setItem('sv_productos', JSON.stringify(prods));
}

function getCarrito() {
  return JSON.parse(localStorage.getItem('sv_carrito')) || [];
}

function saveCarrito(cart) {
  localStorage.setItem('sv_carrito', JSON.stringify(cart));
}

function getUsuarios() {
  return JSON.parse(localStorage.getItem('sv_usuarios')) || [];
}

function saveUsuarios(users) {
  localStorage.setItem('sv_usuarios', JSON.stringify(users));
}

function getSesion() {
  return JSON.parse(localStorage.getItem('sv_sesion')) || null;
}

function setSesion(user) {
  localStorage.setItem('sv_sesion', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('sv_sesion');
  window.location.reload();
}

initStorage();