import { ECandidateStatus } from "../../../../support/enums/candidate-status-enums";
import {
  ApiEmployeesHelper,
  ApiJobsHelper,
  ApiRecruitmentHelper,
} from "../../../../support/helpers/api-helpers";
import {
  CandidateProfilePage,
  ChangeCandidateStatusPage,
} from "../../../../support/page-objects";
import { ICandidateData } from "../../../../support/types/candidate-data-interface";
import { CandidateGenerator } from "../../../../support/utils/data-utils.ts/candidate-data-generator";
import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";

let candidateData: ICandidateData;
const candidateProfilePage: CandidateProfilePage = new CandidateProfilePage();
const changeCandidateStatusPage: ChangeCandidateStatusPage =
  new ChangeCandidateStatusPage();

Before(() => {
  CandidateGenerator.prepareCandidateData(
    ECandidateStatus.INTERVIEW_SCHEDULED
  ).then((candidatData) => {
    candidateData = candidatData;
  });
});

Given("The admin Access the candidate Profile page", () => {
  const { candidateId } = candidateData;
  candidateProfilePage.navigateToCandidateProfile(candidateId);
});

When("The Admin Press {string}", (actionText: any) => {
  candidateProfilePage.clickCandidateActionButton(actionText);
  changeCandidateStatusPage.clickSaveButton();
});

Then("The Candidate Status should be {string}", (status: any) => {
  candidateProfilePage.verifyCandidateStatus(status);
});

Then(
  "The candidate should have the appropriate action buttons:",
  (actions: any) => {
    const actionButtons = actions.rawTable[0];

    candidateProfilePage.verifyActionBtn(actionButtons);
  }
);

afterEach(() => {
  const { candidateId, vacancyId, jobTitleId, empNumber } = candidateData;

  ApiRecruitmentHelper.deleteCandidate({ ids: [candidateId] });
  ApiRecruitmentHelper.deleteVacancy({ ids: [vacancyId] });
  ApiJobsHelper.deleteJobTitle({ ids: [jobTitleId] });
  ApiEmployeesHelper.deleteEmployee({ ids: [empNumber] });
});
