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

// Alternatively you can use CommonJS syntax:
// require('./commands');

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test due to cross-origin script errors
  return false
});
