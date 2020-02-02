const BASE_URL = 'https://api.exchangeratesapi.io';

function obtenerCambios(base = 'EUR', fecha = 'latest') {
  return fetch(`${BASE_URL}/${fecha}?base=${base}`)
    .then((r) => r.json())
    .then((r) => r.rates);
}

function obtenerMonedas() {
  return obtenerCambios().then((r) => Object.keys(r).concat('EUR'));
}

function mostrarCambios(cambios) {
  const $cambios = document.querySelector('#cambio tbody');
  $cambios.innerHTML = '';

  Object.keys(cambios).sort().forEach((moneda) => {
    const $fila = document.createElement('tr');
    const $moneda = document.createElement('td');
    const $cambio = document.createElement('td');
    $moneda.textContent = moneda;
    $cambio.textContent = cambios[moneda];
    $fila.appendChild($moneda);
    $fila.appendChild($cambio);
    $cambios.appendChild($fila);
  });
}

function obtenerMonedaSeleccionada() {
  const $activeItem = document.querySelector('.list-group-item.active');
  if ($activeItem) {
    return document.querySelector('.list-group-item.active').dataset.base;
  }

  return undefined;
}

function obtenerFechaSeleccionada() {
  const fechaSeleccionada = document.querySelector('#fecha').value;
  return fechaSeleccionada || undefined;
}

function mostrarCartelActualizacion() {
  document.querySelector('#cambio tbody').innerHTML = 'Cargando...';
}


async function actualizar() {
  mostrarCartelActualizacion();
  const cambios = await obtenerCambios(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada());
  mostrarCambios(cambios);
}


function mostrarListadoMonedas(monedas) {
  const $lista = document.createElement('div'); // esto antes era un ul
  $lista.className = 'list-group';

  monedas.sort().forEach((base) => {
    const $item = document.createElement('a'); // esto antes era un li
    $item.href = '#';
    $item.classList.add('list-group-item', 'list-group-item-action');
    $item.textContent = base;
    $item.dataset.base = base;
    $item.addEventListener('click', () => {
      const $itemActivo = document.querySelector('.list-group-item.active');
      if ($itemActivo) {
        $itemActivo.classList.remove('active');
      }
      $item.classList.add('active');
      actualizar();
    });
    $lista.appendChild($item);
  });

  document.querySelector('#monedas').appendChild($lista);
}

function configurarInputFecha() {
  const $fecha = document.querySelector('#fecha');
  $fecha.setAttribute('max', (new Date()).toISOString().split('T')[0]);
  $fecha.addEventListener('change', actualizar);
}

async function inicializar() {
  mostrarListadoMonedas(await obtenerMonedas());
  configurarInputFecha();
}

inicializar().catch((e) => console.error(e));
