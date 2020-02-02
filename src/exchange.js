const BASE_URL = 'https://api.exchangeratesapi.io';

export function obtenerCambios(base = 'EUR', fecha = 'latest') {
  return fetch(`${BASE_URL}/${fecha}?base=${base}`)
    .then((r) => r.json())
    .then((r) => r.rates);
}

export function obtenerMonedas() {
  return obtenerCambios().then((r) => Object.keys(r).concat('EUR'));
}
