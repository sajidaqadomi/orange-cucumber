import { ECandidateStatus } from "../../enums/candidate-status-enums";
import { ICandidateData } from "../../types/candidate-data-interface";
import {
  CandidateStatusService,
  EmployeeService,
  JobTitleService,
  LoginService,
  RecruitmentService,
} from "./data-services";

/**
 * CandidateGenerator class provides methods for generating and preparing candidate data.
 */
export class CandidateGenerator {
  /**
   * Prepare candidate data with the given initial status or APPLICATION_INITIATED by default.
   *
   * @param status - The initial candidate status (default: APPLICATION_INITIATED).
   * @returns A Promise that resolves with the generated candidate data.
   */
  static prepareCandidateData(
    status: ECandidateStatus = ECandidateStatus.APPLICATION_INITIATED
  ) {
    let candidateData: ICandidateData = {} as ICandidateData;

    // Login to the system and create candidate data step by step
    LoginService.login();

    // Step 1: Create an employee and extract the employee number
    EmployeeService.createEmployee().then((employeeRes) => {
      candidateData.empNumber = employeeRes.data.empNumber;
    });

    // Step 2: Create a job title and extract the job title ID
    JobTitleService.createJobTitle()
      .then((jobTitleRes) => {
        candidateData.jobTitleId = jobTitleRes.data.id;
      })

      // Step 3: Create a vacancy for the candidate and extract the vacancy ID
      .then(() => {
        RecruitmentService.createVacancy(
          candidateData.jobTitleId,
          candidateData.empNumber
        ).then((vacancyRes) => {
          candidateData.vacancyId = vacancyRes.data.id;
        });
      })

      // Step 4: Create a candidate and extract the candidate ID
      .then(() => {
        RecruitmentService.createCandidate(candidateData.vacancyId).then(
          (candidateRes) => {
            candidateData.candidateId = candidateRes.data.id;
          }
        );
      })

      // Step 5: Set the candidate status to the specified status
      .then(() => {
        CandidateStatusService.setCandidateStatus(
          candidateData.candidateId,
          candidateData.empNumber,
          status
        );
      });

    // Return the generated candidate data as a Promise
    return cy.wrap(candidateData);
  }
}
