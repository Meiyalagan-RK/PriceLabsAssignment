import home from '../support/pageObjects/HomePage';

describe('Home page tests', () => {
  it('performs a search', () => {
    cy.visit('/');
    home.search('Cypress');
    cy.contains('Results');
  });
});
