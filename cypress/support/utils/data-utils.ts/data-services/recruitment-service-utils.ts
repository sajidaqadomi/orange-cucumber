import { EDateOption } from "../../../enums/date-enum";
import { ApiRecruitmentHelper } from "../../../helpers/api-helpers";
import { GenericMethods } from "../../../helpers/generic-methods";

/**
 * RecruitmentService class contains methods for handling recruitment-related operations.
 */
export default class RecruitmentService {
  /**
   * Creates a new vacancy.
   *
   * @param jobTitleId - The ID of the job title for the vacancy.
   * @param hiringManagerId - The ID of the hiring manager for the vacancy.
   * @returns A Promise that resolves with the created vacancy data.
   */
  static createVacancy(jobTitleId: number, hiringManagerId: number) {
    cy.fixture("recruitment-data").as("recruitmentData");
    return cy
      .get("@recruitmentData")
      .its("vacancyData")
      .then((vacancyData) => {
        vacancyData.name = GenericMethods.randomString(vacancyData.name);
        vacancyData.employeeId = hiringManagerId;
        vacancyData.jobTitleId = jobTitleId;

        //Call The API
        return ApiRecruitmentHelper.createVacancy(vacancyData);
      });
  }

  static createCandidate(vacancyId: number) {
    // Alias the recruitment data for later use
    cy.fixture("recruitment-data").as("recruitmentData");
    return cy
      .get("@recruitmentData")
      .its("candidatesData")
      .then((candidatesData) => {
        // Generate a random name for the vacanc
        candidatesData.firstName = GenericMethods.randomString(
          candidatesData.firstName
        );
        candidatesData.email = GenericMethods.randomString(
          candidatesData.email
        );
        candidatesData.dateOfApplication = GenericMethods.getDateInFormat(
          EDateOption.NOW
        );
        candidatesData.vacancyId = vacancyId;

        //Call The API
        return ApiRecruitmentHelper.createCandidate(candidatesData);
      });
  }

  /**
   * Adds a candidate to the shortlist.
   *
   * @param candidateId - The ID of the candidate to be added to the shortlist.
   * @returns A Promise that resolves with the updated candidate status data.
   */
  static addCandidateToShortlist(candidateId: number) {
    cy.fixture("recruitment-data").as("recruitmentData");
    return cy
      .get("@recruitmentData")
      .its("candidateStatusData")
      .then((candidateStatusData) => {
        //Call The API
        return ApiRecruitmentHelper.addCandidateToShortlist(
          candidateId,
          candidateStatusData
        );
      });
  }

  /**
   * Schedules an interview for a candidate.
   *
   * @param candidateId - The ID of the candidate for whom the interview is scheduled.
   * @param interviewerEmpNumbers - An array of employee numbers of interviewers.
   * @returns A Promise that resolves with the scheduled interview data.
   */
  static scheduleInterviewForCandidate(
    candidateId: number,
    interviewerEmpNumbers: Number[]
  ) {
    cy.fixture("recruitment-data").as("recruitmentData");
    return cy
      .get("@recruitmentData")
      .its("scheduleInterviewData")
      .then((scheduleInterviewData) => {
        // Generate a random interview name and set the interview date to the current date
        scheduleInterviewData.interviewName = GenericMethods.randomString(
          scheduleInterviewData.interviewName
        );
        scheduleInterviewData.interviewDate = GenericMethods.getDateInFormat(
          EDateOption.NOW
        );
        scheduleInterviewData.interviewerEmpNumbers = interviewerEmpNumbers;

        //Call The API
        return ApiRecruitmentHelper.scheduleInterviewForCandidate(
          candidateId,
          scheduleInterviewData
        );
      });
  }

  /**
   * Marks an interview as passed for a candidate.
   *
   * @param candidateId - The ID of the candidate.
   * @param interviewId - The ID of the interview to be marked as passed.
   * @returns A Promise that resolves with the updated candidate status data.
   */
  static markInterviewPass(candidateId: number, interviewId: number) {
    cy.fixture("recruitment-data").as("recruitmentData");
    return cy
      .get("@recruitmentData")
      .its("candidateStatusData")
      .then((candidateStatusData) => {
        //Call The API
        return ApiRecruitmentHelper.markInterviewPass(
          candidateId,
          interviewId,
          candidateStatusData
        );
      });
  }

  /**
   * Offers a job to a candidate.
   *
   * @param candidateId - The ID of the candidate to whom the job is offered.
   * @returns A Promise that resolves with the updated candidate status data.
   */
  static offerJobForCandidate(candidateId: number) {
    cy.fixture("recruitment-data").as("recruitmentData");
    return cy
      .get("@recruitmentData")
      .its("candidateStatusData")
      .then((candidateStatusData) => {
        //Call The API
        return ApiRecruitmentHelper.offerJobForCandidate(
          candidateId,
          candidateStatusData
        );
      });
  }

  /**
   * Hires a candidate.
   *
   * @param candidateId - The ID of the candidate to be hired.
   * @returns A Promise that resolves with the updated candidate status data.
   */
  static hireCandidate(candidateId: number) {
    cy.fixture("recruitment-data").as("recruitmentData");
    return cy
      .get("@recruitmentData")
      .its("candidateStatusData")
      .then((candidateStatusData) => {
        //Call The API
        return ApiRecruitmentHelper.hireCandidate(
          candidateId,
          candidateStatusData
        );
      });
  }
}
