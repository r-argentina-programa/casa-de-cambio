/// <reference types="Cypress" />

describe('casa de cambio', () => {
  const URL = 'http://127.0.0.1:8081';
  const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
  let polyfill;

  // grab fetch polyfill from remote URL, could be also from a local package
  before(() => {
    cy.request(polyfillUrl)
      .then((response) => {
        polyfill = response.body;
      });

    cy.visit(URL, {
      onBeforeLoad(win) {
        delete win.fetch;
        win.eval(polyfill);
        win.fetch = win.unfetch;
      },
    });
  });

  beforeEach(() => {
    cy.server();
    cy.route('GET', 'https://api.exchangeratesapi.io/*', 'fixture:exchange.json');
  });

  it('carga las monedas', () => {
    cy.get('#monedas .list-group-item').should('have.length', 33);
  });

  it('carga el cambio', () => {
    cy.get('#monedas .list-group-item:nth-child(1)').click().should('have.class', 'active');
    cy.get('#monedas .list-group-item.active').should('have.length', 1);
    cy.get('#cambio tr').should('have.length', 33);
  });
});
