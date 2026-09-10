document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registro-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let esValido = true;

    // Limpiar errores previos
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const fechaNac = document.getElementById('fechaNacimiento').value;
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const direccion = document.getElementById('direccion').value.trim();
    const region = document.getElementById('region').value;
    const genero = document.getElementById('genero').value;
    const terminos = document.getElementById('terminos').checked;

    // Validaciones Regla de Negocio
    if (!nombre) { showError('error-nombre', 'El nombre es obligatorio.'); esValido = false; }
    if (!apellido) { showError('error-apellido', 'El apellido es obligatorio.'); esValido = false; }

    // Validación de Edad (Mínimo 14 años)
    if (!fechaNac) {
      showError('error-fechaNacimiento', 'La fecha de nacimiento es obligatoria.');
      esValido = false;
    } else {
      const hoy = new Date();
      const nac = new Date(fechaNac);
      let edad = hoy.getFullYear() - nac.getFullYear();
      const mes = hoy.getMonth() - nac.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nac.getDate())) { edad--; }
      if (edad < 14) {
        showError('error-fechaNacimiento', 'Debes tener al menos 14 años para registrarte.');
        esValido = false;
      }
    }

    // Correo Institucional
    if (!correo) {
      showError('error-correo', 'El correo electrónico es obligatorio.');
      esValido = false;
    } else if (!correo.toLowerCase().endsWith('@duoc.cl')) {
      showError('error-correo', 'El correo debe pertenecer al dominio institucional @duoc.cl');
      esValido = false;
    }

    // Contraseña Segura
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
      showError('error-password', 'La contraseña es obligatoria.');
      esValido = false;
    } else if (!passRegex.test(password)) {
      showError('error-password', 'Debe tener al menos 8 caracteres, 1 mayúscula y 1 número.');
      esValido = false;
    }

    if (!confirmPassword) {
      showError('error-confirmPassword', 'Confirme su contraseña.');
      esValido = false;
    } else if (password !== confirmPassword) {
      showError('error-confirmPassword', 'Las contraseñas no coinciden.');
      esValido = false;
    }

    if (!direccion) { showError('error-direccion', 'La dirección es obligatoria.'); esValido = false; }
    if (!region) { showError('error-region', 'Seleccione una región.'); esValido = false; }
    if (!genero) { showError('error-genero', 'Seleccione un género.'); esValido = false; }
    if (!terminos) { showError('error-terminos', 'Debe aceptar los términos y condiciones.'); esValido = false; }

    if (!esValido) return;

    // Verificar si el correo ya existe
    const usuarios = getUsuarios();
    if (usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase())) {
      showError('error-correo', 'Este correo ya se encuentra registrado.');
      return;
    }

    // Guardar nuevo usuario
    const nuevoUsuario = {
      id: Date.now().toString(),
      nombre, apellido, fechaNac, correo, password, direccion, region, genero,
      intentosFallidos: 0,
      bloqueado: false
    };

    usuarios.push(nuevoUsuario);
    saveUsuarios(usuarios);

    alert('¡Registro exitoso! Redirigiendo al inicio de sesión.');
    window.location.href = 'login.html';
  });
});

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}