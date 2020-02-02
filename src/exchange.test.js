import * as exchange from './exchange.js';

const respuesta = require('../cypress/fixtures/exchange.json');

describe('exchange', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      { json: () => Promise.resolve(respuesta) },
    ));
  });

  it('testea que obtenerCambios construye una URL válida', () => {
    exchange.obtenerCambios();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.exchangeratesapi.io/latest?base=EUR');

    exchange.obtenerCambios('AUD', '2020-01-01');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://api.exchangeratesapi.io/2020-01-01?base=AUD');

    exchange.obtenerCambios('AUD');
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenCalledWith('https://api.exchangeratesapi.io/latest?base=AUD');
  });

  it('testea que obtenerMonedas obtena una lista válida de monedas', async () => {
    const monedas = await exchange.obtenerMonedas();
    expect(monedas).toHaveLength(33);
    expect(monedas).toContain('EUR');
  });
});
