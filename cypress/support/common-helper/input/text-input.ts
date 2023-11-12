/**
 * TextInput class provides reusable methods for interacting with text input elements in Cypress tests.
 */
class TextInput {
  static elements = {
    textInput: (label: string, usePlaceholder: boolean) =>
      !usePlaceholder
        ? cy.contains(".oxd-input-group", label).find("input")
        : cy.get("input[placeholder*='" + label + "']"),
  };

  /**
   * Type the given value into a text input element identified by label or placeholder.
   * @param {string} label - The label or placeholder text to identify the input element.
   * @param {string} value - The text to type into the input element.
   * @param {boolean} usePlaceholder - If true, search for input elements by placeholder; if false, search by label.
   */
  static type(label: string, value: string, usePlaceholder: boolean = false) {
    this.elements.textInput(label, usePlaceholder).as("textInput");
    cy.get("@textInput").clear().type(value);
  }

  /**
   * Clear the text from a text input element identified by label or placeholder.
   * @param {string} label - The label or placeholder text to identify the input element.
   * @param {boolean} usePlaceholder - If true, search for input elements by placeholder; if false, search by label.
   */
  static clear(label: string, usePlaceholder: boolean = false) {
    this.elements.textInput(label, usePlaceholder).as("textInput");
    cy.get("@textInput").clear();
  }

  /**
   * Append the given value to a text input element identified by label or placeholder.
   * @param {string} label - The label or placeholder text to identify the input element.
   * @param {string} value - The text to append to the input element.
   * @param {boolean} usePlaceholder - If true, search for input elements by placeholder; if false, search by label.
   */
  static appeand(
    label: string,
    value: string,
    usePlaceholder: boolean = false
  ) {
    this.elements.textInput(label, usePlaceholder).as("textInput");
    cy.get("@textInput").type(`${value}`);
  }
}

export default TextInput;
