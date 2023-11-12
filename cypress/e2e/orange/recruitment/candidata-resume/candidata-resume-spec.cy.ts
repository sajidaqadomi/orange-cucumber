import { ECandidateStatus } from "../../../../support/enums/candidate-status-enums";
import {
  ApiEmployeesHelper,
  ApiJobsHelper,
  ApiRecruitmentHelper,
} from "../../../../support/helpers/api-helpers";
import { CandidateProfilePage } from "../../../../support/page-objects";
import { ICandidateData } from "../../../../support/types/candidate-data-interface";
import { CandidateGenerator } from "../../../../support/utils/data-utils.ts/candidate-data-generator";
import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { CandidateStatusService } from "../../../../support/utils/data-utils.ts/data-services";

let candidateData: ICandidateData;
const candidateProfilePage: CandidateProfilePage = new CandidateProfilePage();

Before(() => {
  CandidateGenerator.prepareCandidateData(
    ECandidateStatus.APPLICATION_INITIATED
  ).then((candidatData) => {
    candidateData = candidatData;
  });
});

Given("The system has a candidate with Hired statuse Status", () => {
  const { candidateId, empNumber } = candidateData;

  CandidateStatusService.setCandidateStatus(
    candidateId,
    empNumber,
    ECandidateStatus.HIRED
  );
});

Given("The admin Access the candidate form", () => {
  const { candidateId } = candidateData;
  
  candidateProfilePage.navigateToCandidateProfile(candidateId);
});

When("The admin Enable Edit candidate switch", () => {
  candidateProfilePage.turnOnEditProfileSwitch();
});

When("The admin Upload a txt file to the Resume section", function () {
  this.uploadFile = "cypress/fixtures/candidate-cv.txt";

  candidateProfilePage.attachCandidateResume(this.uploadFile);
});

When("The admin Save the form", () => {
  candidateProfilePage.clickSaveCandidateProfile();
});

When("The admin download the uploaded file", function () {
  candidateProfilePage.downloadCandidateResume();
});

Then(
  "The uploaded file should contain the same data as what was originally uploaded",
  function () {
    const downloadFile = "cypress/downloads/candidate-cv.txt";

    candidateProfilePage.verifyUploadedResumeData(
      this.uploadFile,
      downloadFile
    );
  }
);

After(() => {
  const {candidateId,vacancyId,jobTitleId,empNumber} = candidateData

  ApiRecruitmentHelper.deleteCandidate({ ids: [candidateId] });
  ApiRecruitmentHelper.deleteVacancy({ ids: [vacancyId] });
  ApiJobsHelper.deleteJobTitle({ ids: [jobTitleId] });
  ApiEmployeesHelper.deleteEmployee({ ids: [empNumber] });
});
