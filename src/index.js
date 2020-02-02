import { obtenerMonedas, obtenerCambios } from './exchange.js';
import {
  mostrarCambios, mostrarListadoMonedas, obtenerFechaSeleccionada, obtenerMonedaSeleccionada,
} from './ui.js';


function actualizar() {
  obtenerCambios(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada())
    .then((cambios) => mostrarCambios(cambios));
}

function inicializar() {
  const $monedas = document.querySelector('#monedas');
  const $fecha = document.querySelector('#fecha');

  obtenerMonedas().then((monedas) => {
    $monedas.appendChild(mostrarListadoMonedas(monedas, actualizar));
  });

  $fecha.addEventListener('change', () => {
    actualizar();
  });
}

inicializar();
