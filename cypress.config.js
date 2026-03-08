const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://app.pricelabs.co',
        env: {
      loginUrl: "https://pricelabs.co/signin",
      username: "qa.pricelabs@gmail.com",
      password: "qg33N$yxJP"
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.js',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});

