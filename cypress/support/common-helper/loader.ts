/**
 * Loader class provides methods for interacting with loading spinner elements in Cypress tests.
 */
class Loader {
  static elements = {
    loader: () => cy.get(".oxd-loading-spinner"),
  };

  /**
   * Wait until the loading spinner becomes visible, and then wait for it to disappear.
   */
  static waitUntilVisible() {
    this.elements.loader().should("exist");

    // Wait for the loading spinner to disappear, indicating the end of loading.
    this.elements.loader().should("not.exist");
  }
}

export default Loader;
