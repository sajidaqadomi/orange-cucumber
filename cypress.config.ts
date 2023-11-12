const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    async setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
      return require("./cypress/plugins")(on, config);
    },
    specPattern: "cypress/e2e/**/*.feature",
  },
});
