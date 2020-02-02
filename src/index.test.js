const respuesta = require('../cypress/fixtures/exchange.json');

describe('casa de cambio', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      { json: () => Promise.resolve(respuesta) },
    ));
  });
  it('configura el input de la fecha para que tenga la fecha maxima de hoy', async (done) => {
    document.body.innerHTML = `<div id="app">
    <div class="form-group row">
      <label for="example-date-input" class="col-2 col-form-label">Fecha</label>
      <div class="col-10">
        <input class="form-control" type="date" id="fecha">
      </div>
    </div>
    <div class="row">
      <div class="col-6" id="monedas">
      </div>
      <div class="col-6" id="cambio">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Moneda</th>
              <th scope="col">Cambio</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;

    require('./index.js');
    window.onload = function () {
      const today = (new Date()).toISOString().split('T')[0];
      expect(document.querySelector('#fecha')).toHaveAttribute('max', today);
      done();
    };
  });
});
