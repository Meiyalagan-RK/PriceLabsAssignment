const { defineConfig } = require('cypress');
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  experimentalMemoryManagement: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    baseUrl: 'https://app.pricelabs.co',
    env: {
   // login credentials
      loginUrl: 'https://pricelabs.co/signin',
      username: 'qa.pricelabs@gmail.com',
      password: 'qg33N$yxJP'
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.js',
    chromeWebSecurity: false,
    numTestsKeptInMemory: 1,
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    }
  }
});
