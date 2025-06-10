// 🎯 SISTEMA DE VALIDACIÓN AVANZADA
const formulario = document.getElementById('formularioAvanzado');
const campos = formulario.querySelectorAll('input, textarea, select');
const btnEnviar = document.getElementById('btnEnviar');

// Estado de validación de cada campo
let estadoValidacion = {};

// Inicializar estado de todos los campos
campos.forEach((campo) => {
  estadoValidacion[campo.name] = false;
});

// 🎯 VALIDACIONES ESPECÍFICAS POR CAMPO

// Validar Nombres
function validarNombres() {
    const input = document.getElementById('nombres');
    const valor = input.value.trim();
    const errorId = 'errorNombres';
    const exitoId = 'exitoNombres';
    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,40}$/;

    if (!valor) {
        mostrarError(errorId, 'El campo nombres es obligatorio');
        marcarCampo(input, false);
        return false;
    }
    if (!pattern.test(valor)) {
        mostrarError(errorId, 'Nombres inválidos');
        marcarCampo(input, false);
        return false;
    }
    ocultarMensaje(errorId);
    mostrarExito(exitoId, '✓ Nombre(s) validos');
    marcarCampo(input, true);
    return true;
}

function validarApellidos() {
    const input = document.getElementById('apellidos');
    const valor = input.value.trim();
    const errorId = 'errorApellidos';
    const exitoId = 'exitoApellidos';

    if (!valor) {
        mostrarError(errorId, 'El campo apellidos es obligatorio');
        marcarCampo(input, false);
        return false;
    }

    const palabras = valor.split(' ').filter(p => p.length > 0);
    if (palabras.length < 2) {
        mostrarError(errorId, 'Por favor ingresa al menos dos apellidos');
        marcarCampo(input, false);
        return false;
    }
    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!pattern.test(valor)) {
        mostrarError(errorId, 'Apellidos inválidos, solo letras y espacios');
        marcarCampo(input, false);
        return false;
    }

    ocultarMensaje(errorId);
    mostrarExito(exitoId, '✓ Apellidos Validos');
    marcarCampo(input, true);
    return true;
}

['correo', 'confirmarCorreo'].forEach(id => {
  const input = document.getElementById(id);
  ['copy', 'cut'].forEach(evt => {
    input.addEventListener(evt, e => e.preventDefault());
  });
});


function validarCorreo() {
    const input = document.getElementById('correo');
    const correo = input.value.trim();
    const errorId = 'errorCorreo';
    const exitoId = 'exitoCorreo';
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo) {
        mostrarError(errorId, 'El correo electrónico es obligatorio');
        marcarCampo(input, false);
        return false;
    }
    if (!regexCorreo.test(correo)) {
        mostrarError(errorId, 'Formato de correo inválido');
        marcarCampo(input, false);
        return false;
    }
    ocultarMensaje(errorId);
    mostrarExito(exitoId, '✓ Correo válido');
    marcarCampo(input, true);
    return true;
}
// Validar Confirmación de Correo Electrónico
function validarConfirmarCorreo() {
    const correo = document.getElementById('correo').value.trim();
    const confirmarCorreo = document.getElementById('confirmarCorreo').value.trim();
    const input = document.getElementById('confirmarCorreo');
    const errorId = 'errorConfirmarCorreo';
    const exitoId = 'exitoConfirmarCorreo';

    if (!confirmarCorreo) {
        mostrarError(errorId, 'Este campo es obligatorio');
        marcarCampo(input, false);
        return false;
    }
    if (correo !== confirmarCorreo) {
        mostrarError(errorId, 'Los correos electrónicos no coinciden');
        marcarCampo(input, false);
        return false;
    }
    ocultarMensaje(errorId);
    mostrarExito(exitoId, '✓ Los correos elctronicos coinciden');
    marcarCampo(input, true);
    return true;
}



// Validación de contraseña con indicador de fortaleza
document
  .getElementById('password')
  .addEventListener('input', function () {
    const password = this.value;
    const fortaleza = calcularFortalezaPassword(password);
    actualizarBarraFortaleza(fortaleza);
    if (password.length < 8) {
      mostrarError('errorPassword', 'La contraseña debe tener al menos 8 caracteres');
      marcarCampo(this, false);
    } else if (fortaleza.nivel < 2) {
      mostrarError('errorPassword', 'Contraseña muy débil. Añade números y símbolos');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoPassword', `✓ Contraseña ${fortaleza.texto}`);
      marcarCampo(this, true);
    }
    // Revalidar confirmación si existe
    const confirmar = document.getElementById('confirmarPassword');
    if (confirmar.value) {
      confirmar.dispatchEvent(new Event('input'));
    }
  });

// Validación de confirmación de contraseña
document
  .getElementById('confirmarPassword')
  .addEventListener('input', function () {
    const password = document.getElementById('password').value;
    if (this.value !== password) {
      mostrarError('errorConfirmar', 'Las contraseñas no coinciden');
      marcarCampo(this, false);
    } else if (this.value.length > 0) {
      mostrarExito('exitoConfirmar', '✓ Contraseñas coinciden');
      marcarCampo(this, true);
    }
  });

// Validación del teléfono con formato automático
document
  .getElementById('telefono')
  .addEventListener('input', function () {
    // Aplicar formato automático
    let valor = this.value.replace(/\D/g, '');
    if (valor.length >= 6) {
      valor = valor.substring(0, 3) + '-' + valor.substring(3, 6) + '-' + valor.substring(6, 10);
    } else if (valor.length >= 3) {
      valor = valor.substring(0, 3) + '-' + valor.substring(3);
    }
    this.value = valor;
    const telefonoRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!telefonoRegex.test(valor)) {
      mostrarError('errorTelefono', 'Formato: 300-123-4567');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoTelefono', '✓ Teléfono válido');
      marcarCampo(this, true);
    }
  });

// Validación de fecha de nacimiento
document
  .getElementById('fechaNacimiento')
  .addEventListener('change', function () {
    const fechaNacimiento = new Date(this.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
      mostrarError('errorFecha', 'Debes ser mayor de 18 años');
      marcarCampo(this, false);
    } else if (edad > 100) {
      mostrarError('errorFecha', 'Fecha no válida');
      marcarCampo(this, false);
    } else {
      mostrarExito('exitoFecha', `✓ Edad: ${edad} años`);
      marcarCampo(this, true);
    }
  });

// Contador de caracteres para comentarios
document
  .getElementById('comentarios')
  .addEventListener('input', function () {
    const contador = document.getElementById('contadorComentarios');
    contador.textContent = this.value.length;
    if (this.value.length > 450) {
      contador.style.color = '#dc3545';
    } else if (this.value.length > 400) {
      contador.style.color = '#ffc107';
    } else {
      contador.style.color = '#666';
    }
    marcarCampo(this, true); // Los comentarios son opcionales
  });

// Validación de términos
document
  .getElementById('terminos')
  .addEventListener('change', function () {
    if (!this.checked) {
      mostrarError('errorTerminos', 'Debes aceptar los términos y condiciones');
      marcarCampo(this, false);
    } else {
      ocultarMensaje('errorTerminos');
      marcarCampo(this, true);
    }
  });

// 🎯 FUNCIONES AUXILIARES
function mostrarError(idElemento, mensaje) {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = mensaje;
  elemento.style.display = 'block';
  ocultarMensaje(idElemento.replace('error', 'exito'));
}
function mostrarExito(idElemento, mensaje) {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = mensaje;
  elemento.style.display = 'block';
  ocultarMensaje(idElemento.replace('exito', 'error'));
}
function ocultarMensaje(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) elemento.style.display = 'none';
}
function marcarCampo(campo, esValido) {
  estadoValidacion[campo.name] = esValido;
  if (esValido) {
    campo.classList.remove('invalido');
    campo.classList.add('valido');
  } else {
    campo.classList.remove('valido');
    campo.classList.add('invalido');
  }
  actualizarProgreso();
  actualizarBotonEnvio();
}
function calcularFortalezaPassword(password) {
  let puntos = 0;
  if (password.length >= 8) puntos++;
  if (password.length >= 12) puntos++;
  if (/[a-z]/.test(password)) puntos++;
  if (/[A-Z]/.test(password)) puntos++;
  if (/[0-9]/.test(password)) puntos++;
  if (/[^A-Za-z0-9]/.test(password)) puntos++;
  const niveles = ['muy débil', 'débil', 'media', 'fuerte', 'muy fuerte'];
  const nivel = Math.min(Math.floor(puntos / 1.2), 4);
  return { nivel, texto: niveles[nivel], puntos };
}
function actualizarBarraFortaleza(fortaleza) {
  const barra = document.getElementById('strengthBar');
  const clases = [
    'strength-weak',
    'strength-weak',
    'strength-medium',
    'strength-strong',
    'strength-very-strong',
  ];
  barra.className = 'password-strength ' + clases[fortaleza.nivel];
}
function actualizarProgreso() {
  const totalCampos = Object.keys(estadoValidacion).length;
  const camposValidos = Object.values(estadoValidacion).filter((valido) => valido).length;
  const porcentaje = Math.round((camposValidos / totalCampos) * 100);
  document.getElementById('barraProgreso').style.width = porcentaje + '%';
  document.getElementById('porcentajeProgreso').textContent = porcentaje + '%';
}
function actualizarBotonEnvio() {
  const todosValidos = Object.values(estadoValidacion).every((valido) => valido);
  btnEnviar.disabled = !todosValidos;
}

// 🎯 MANEJO DEL ENVÍO DEL FORMULARIO
formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  const datosFormulario = new FormData(this);
  let resumenHTML = '';
  for (let [campo, valor] of datosFormulario.entries()) {
    if (valor && valor.trim() !== '') {
      const nombreCampo = obtenerNombreCampo(campo);
      resumenHTML += `
        <div class="dato-resumen">
          <span class="etiqueta-resumen">${nombreCampo}:</span> ${valor}
        </div>
      `;
    }
  }
  document.getElementById('contenidoResumen').innerHTML = resumenHTML;
  document.getElementById('resumenDatos').style.display = 'block';
  // Scroll suave hacia el resumen
  document.getElementById('resumenDatos').scrollIntoView({
    behavior: 'smooth',
  });
  console.log('📊 Formulario enviado con validación completa:', Object.fromEntries(datosFormulario));
});

function obtenerNombreCampo(campo) {
const nombres = {
  nombres: 'nombres',
  apellidos: 'apellidos',
  correo: 'correo',
  confirmarCorreo: 'confirmarCorreo',
  password: 'password',
  confirmarPassword: 'confirmarPassword',
  telefono: 'telefono',
  fechaNacimiento: 'fechaNacimiento',
  comentarios: 'comentarios',
  terminos: 'terminos',
};
  return nombres[campo] || campo;
}

function reiniciarFormulario() {
  formulario.reset();
  document.getElementById('resumenDatos').style.display = 'none';
  // Reiniciar estado de validación
  Object.keys(estadoValidacion).forEach((campo) => {
    estadoValidacion[campo] = false;
  });
  // Limpiar clases y mensajes
  campos.forEach((campo) => {
    campo.classList.remove('valido', 'invalido');
  });
  document.querySelectorAll('.mensaje-error, .mensaje-exito').forEach((mensaje) => {
    mensaje.style.display = 'none';
  });
  actualizarProgreso();
  actualizarBotonEnvio();
  // Limpiar barra de fortaleza
  document.getElementById('strengthBar').className = 'password-strength';
}
// Event listeners para validaciones en tiempo real
document.getElementById('nombres').addEventListener('input', validarNombres);
document.getElementById('apellidos').addEventListener('input', validarApellidos);
document.getElementById('confirmarCorreo').addEventListener('input', validarConfirmarCorreo);
document.getElementById('correo').addEventListener('input', validarCorreo);
