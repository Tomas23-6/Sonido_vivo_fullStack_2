document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    const correo = document.getElementById('login-correo').value.trim();
    const password = document.getElementById('login-password').value;

    let esValido = true;
    if (!correo) { showError('error-login-correo', 'Ingrese su correo.'); esValido = false; }
    if (!password) { showError('error-login-password', 'Ingrese su contraseña.'); esValido = false; }

    if (!esValido) return;

    const usuarios = getUsuarios();
    const usuarioIndex = usuarios.findIndex(u => u.correo.toLowerCase() === correo.toLowerCase());

    if (usuarioIndex === -1) {
      showError('error-login-general', 'Credenciales incorrectas o usuario no registrado.');
      return;
    }

    const usuario = usuarios[usuarioIndex];

    // Control de Bloqueo
    if (usuario.bloqueado) {
      showError('error-login-general', 'Esta cuenta se encuentra BLOQUEADA debido a 3 intentos fallidos consecutivos.');
      return;
    }

    // Verificación de credenciales
    if (usuario.password !== password) {
      usuario.intentosFallidos += 1;
      if (usuario.intentosFallidos >= 3) {
        usuario.bloqueado = true;
        saveUsuarios(usuarios);
        showError('error-login-general', 'Ha alcanzado el límite de 3 intentos fallidos. Su cuenta ha sido BLOQUEADA.');
      } else {
        saveUsuarios(usuarios);
        const intentosRestantes = 3 - usuario.intentosFallidos;
        showError('error-login-general', `Contraseña incorrecta. Intentos restantes: ${intentosRestantes}`);
      }
      return;
    }

    // Login Exitoso
    usuario.intentosFallidos = 0;
    saveUsuarios(usuarios);
    setSesion({ correo: usuario.correo, nombre: `${usuario.nombre} ${usuario.apellido}` });

    alert(`¡Bienvenido/a, ${usuario.nombre}!`);
    window.location.href = 'index.html';
  });
});