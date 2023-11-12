/**
 * ToastMessage class provides methods for verifying toast messages in Cypress tests.
 */
import { IToastMessages } from "../enums/toast-message-enums";

class ToastMessage {
  static elements = {
    toast: () => cy.get(".oxd-text--toast-message"),
  };

  /**
   * Verify that a toast message with the specified content exists and contains the given message.
   * @param {IToastMessages} message - The expected message to be found in the toast message element.
   */
  static verifyToastMessage(message: IToastMessages) {
    this.elements.toast().should("exist").should("contain", message);
  }
}

export default ToastMessage;
