// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// You can put global configuration and behavior that modifies
// Cypress here.
//
// You can change the location of this file or turn off
// automatically serving support files with the 'supportFile'
// configuration option.
//
// ***********************************************************

import './commands';
import 'cypress-real-events/support';

// automatically restore cached session before each test
beforeEach(() => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');
  if (username && password) {
    cy.loginSession(username, password);
  }
});


beforeEach(() => {
  // cypress/support/e2e.js

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false prevents Cypress from failing the test
    return false
  })
})
