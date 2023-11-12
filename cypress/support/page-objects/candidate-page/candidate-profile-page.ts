import { Loader } from "../../common-helper";
import {
  ECandidateActionStatus,
  ECandidateStatus,
} from "../../enums/candidate-status-enums";
import { NavigationPath } from "../../enums/ui-routes-enums";

/**
 * Class representing the Candidate Profile Page, which contains methods for interacting
 * with candidate profiles and performing actions on them.
 */
class CandidateProfilePge {
  // Elements on the page
  elements = {
    applicationStageForm: () => cy.contains("form", "Application Stage"),
    candidateProfileForm: () =>
      cy.contains(".orangehrm-card-container", "Candidate Profile"),
    recruitmentStatus: () =>
      this.elements
        .applicationStageForm()
        .find(".orangehrm-recruitment-status p"),
    recruitmentActionsBtnsContainer: () =>
      this.elements
        .applicationStageForm()
        .find(".orangehrm-recruitment-actions"),
    editProfileSwitch: () =>
      this.elements.candidateProfileForm().find("input[type='checkbox']"),
    fileInput: () =>
      this.elements.candidateProfileForm().find("input[type='file']"),
    saveProfileBtn: () =>
      this.elements.candidateProfileForm().find("button[type='submit']"),
    downloadFileIcon: () =>
      this.elements.candidateProfileForm().find(".orangehrm-file-preview"),
  };

  /**
   * Navigates to the profile page of a specific candidate.
   *
   * @param {number} candidateId - The unique identifier of the candidate.
   */
  navigateToCandidateProfile(candidateId: number) {
    cy.visit(`${NavigationPath.CandidateProfile}/${candidateId}`);
  }

  /**
   * Retrieves an action button by its text content.
   *
   * @param {ECandidateActionStatus} textContent - The text content of the action button.
   * @returns {Cypress.Chainable} - A Cypress Chainable object representing the button.
   */
  getActionButtonByText(textContent: ECandidateActionStatus) {
    return this.elements
      .recruitmentActionsBtnsContainer()
      .find(`button:contains(${textContent})`);
  }

  /**
   * Verifies the presence of multiple action buttons and their text content.
   *
   * @param {ECandidateActionStatus[]} actionButtons - An array of action button statuses to verify.
   */
  verifyActionBtn(actionBtn: ECandidateActionStatus[]) {
    const expectedButtonCount = actionBtn.length;
    this.elements.recruitmentActionsBtnsContainer().as("actionBtnsContainer");

    cy.get("@actionBtnsContainer")
      .find("button")
      .should("have.length", expectedButtonCount);

    actionBtn.forEach((element) => {
      cy.get("@actionBtnsContainer")
        .find(`button:contains(${element})`)
        .should("exist");
    });
  }

  /**
   * Verifies the candidate's status on the page.
   *
   * @param {ECandidateStatus} expectedStatus - The expected candidate status to verify.
   */
  verifyCandidateStatus(expectedStatus: ECandidateStatus) {
    this.elements
      .recruitmentStatus()
      .invoke("text")
      .then((text) => {
        let currentStatusText = text.split(":")[1];

        expect(currentStatusText.trim(), "Status").to.eq(expectedStatus.trim());
      });
  }

  /**
   * Clicks an action button on the page.
   *
   * @param {ECandidateActionStatus} action - The action to be performed.
   */
  clickCandidateActionButton(action: ECandidateActionStatus) {
    this.getActionButtonByText(action).click({ force: true });
  }

  /**
   * Turns on the edit profile switch.
   */
  turnOnEditProfileSwitch() {
    this.elements.editProfileSwitch().check({ force: true });
  }

  /**
   * Attaches a candidate's resume file.
   *
   * @param {string} file - The path to the candidate's resume file.
   */
  attachCandidateResume(file: string) {
    this.elements.fileInput().selectFile(file, { force: true });
  }

  /**
   * Clicks the "Save Candidate Profile" button on the page.
   */
  clickSaveCandidateProfile() {
    this.elements.saveProfileBtn().click({ force: true });
  }

  /**
   * Initiates the download of the candidate's resume and waits for it to be visible.
   */
  downloadCandidateResume() {
    Loader.waitUntilVisible();
    return this.elements.downloadFileIcon().click();
  }

  /**
   *  Verifies the data of an uploaded resume by comparing its content with the content of the downloaded file .
   *
   * @param {string} uploadFile - The path to the uploaded file.
   * @param {string} downloadFile - The path to the downloaded file.
   */
  verifyUploadedResumeData(uploadFile: string, downloadFile: string) {
    cy.readFile(uploadFile).as("uploadFileContent");
    cy.readFile(downloadFile).as("downloadFileContent");

    cy.get("@uploadFileContent").then((uploadFile) => {
      cy.get("@downloadFileContent").then((downloadFile) => {
        expect(uploadFile).to.equal(downloadFile);
      });
    });
  }
}

export default CandidateProfilePge;
