/**
 * Class representing a page for changing a candidate's status with a save button.
 */
class ChangeCandidateStatusPage {
  elements = {
    saveButton: () => cy.contains("button", "Save"),
  };

  /**
   * Clicks the "Save" button to change the candidate's status.
   */
  clickSaveButton() {
    this.elements.saveButton().click();
  }
}

export default ChangeCandidateStatusPage;
