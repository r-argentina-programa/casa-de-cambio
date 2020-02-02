import { obtenerMonedas, obtenerCambios } from './cambios.js';
import {
  configurarInputFecha,
  mostrarCambios,
  mostrarListadoMonedas,
  obtenerFechaSeleccionada,
  obtenerMonedaSeleccionada,
  mostrarCartelActualizacion,
} from './ui.js';


async function actualizar() {
  mostrarCartelActualizacion();
  const cambios = await obtenerCambios(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada());
  mostrarCambios(cambios);
}

async function inicializar() {
  mostrarListadoMonedas(await obtenerMonedas(), actualizar);
  configurarInputFecha(actualizar);
}

inicializar();
