export function mostrarCambios(cambios) {
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

export function mostrarListadoMonedas(monedas, callbackSeleccionMoneda) {
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

      callbackSeleccionMoneda(base);
    });
    $lista.appendChild($item);
  });

  document.querySelector('#monedas').appendChild($lista);
}

export function obtenerMonedaSeleccionada() {
  const $activeItem = document.querySelector('.list-group-item.active');
  if ($activeItem) {
    return document.querySelector('.list-group-item.active').dataset.base;
  }

  return undefined;
}

export function obtenerFechaSeleccionada() {
  const fechaSeleccionada = document.querySelector('#fecha').value;
  return fechaSeleccionada || undefined;
}

export function configurarInputFecha(callbackSeleccionFecha) {
  const $fecha = document.querySelector('#fecha');

  $fecha.setAttribute('max', (new Date()).toISOString().split('T')[0]);
  $fecha.addEventListener('change', callbackSeleccionFecha);
}

export function mostrarCartelActualizacion() {
  document.querySelector('#cambio tbody').innerHTML = 'Cargando...';
}
