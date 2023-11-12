/**
 * Utility class for handling table pagination in Cypress tests.
 */

export default class TablePagination {
  static elements = {
    paginationButtons: () =>
      cy.get("[role='navigation'] .oxd-pagination-page-item--page"),

    paginationContainer: () => cy.get(".orangehrm-bottom-container"),
  };

  /**
   * Get the number of pages in the pagination.
   * @returns {Promise<number>} A promise that resolves to the number of pages.
   */
  static async size(): Promise<number> {
    return new Cypress.Promise((resolve) => {
      this.elements.paginationContainer().then(($paginationContainer) => {
        const length = $paginationContainer.find(
          "[role='navigation'] .oxd-pagination-page-item--page"
        ).length;
        resolve(length);
      });
    }) as unknown as Promise<number>;
  }

  /**
   * Click the next page in pagination if available.
   * @param {number} currentIndex - The current index of the page.
   * @returns A promise that resolves when the click operation is complete.
   */
  static async clickNextPage(currentIndex: number) {
    const paginationSize = await this.size();

    return new Cypress.Promise((resolve) => {
      if (paginationSize > currentIndex) {
        this.elements.paginationButtons().eq(currentIndex);

        resolve(
          this.elements
            .paginationButtons()
            .eq(currentIndex)
            .click({ force: true })
        );
      }
    });
  }
}
