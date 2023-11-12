/**
 * SelectOptions class provides methods for interacting with select dropdown elements in Cypress tests.
 */
class SelectOptions {
  static elements = {
    selectParent: (label: string) =>
      label
        ? cy.contains(".oxd-input-group", label)
        : cy.get(".oxd-input-group"),
  };

  /**
   * Select an option from a dropdown menu based on a label.
   * @param {string} label - The label text associated with the dropdown.
   * @param {string} value - The value of the option to select from the dropdown.
   */
  static select(label: string, value: string) {
    this.elements.selectParent(label).as("selectParent");

    // Click the dropdown arrow to open the options and then select the desired value.
    cy.get("@selectParent")
      .find(".oxd-select-text--arrow")
      .click({ force: true });
    cy.get("@selectParent").find('[role="listbox"]').contains(value).click();
  }
}
export default SelectOptions;
