import { obtenerMonedas, obtenerCambios } from './cambios.js';
import {
  mostrarCambios, mostrarListadoMonedas, obtenerFechaSeleccionada, obtenerMonedaSeleccionada,
} from './ui.js';


async function actualizar() {
  const cambios = await obtenerCambios(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada());
  mostrarCambios(cambios);
}

async function inicializar() {
  const $monedas = document.querySelector('#monedas');
  const $fecha = document.querySelector('#fecha');

  $monedas.appendChild(mostrarListadoMonedas(await obtenerMonedas(), actualizar));

  $fecha.addEventListener('change', () => {
    actualizar();
  });
}

inicializar();
