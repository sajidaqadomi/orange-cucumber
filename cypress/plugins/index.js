const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsBuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = async (on, config) => {
  const bundler = createBundler({
    plugins: [createEsBuildPlugin(config)],
  });
  on("file:preprocessor", bundler);
  await addCucumberPreprocessorPlugin(on, config);
  allureWriter(on, config);
  return config;
};
