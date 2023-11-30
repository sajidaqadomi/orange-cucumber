import { ECandidateStatus } from "../../../enums/candidate-status-enums";
import RecruitmentService from "./recruitment-service-utils";

/**
 * CandidateStatusService provides methods for managing the status of job candidates during the recruitment process.
 */
export default class CandidateStatusService {
  /**
   * Adds a candidate to the shortlist.
   *
   * @param {number} candidateId - The unique identifier of the candidate.
   */
  private static addCandidateToShortlist(candidateId: number) {
    RecruitmentService.addCandidateToShortlist(candidateId);
  }

  /**
   * Schedules an interview for a candidate and adds them to the shortlist.
   *
   * @param {number} candidateId - The unique identifier of the candidate.
   * @param {number} empNumber - The employee number responsible for scheduling the interview.
   * @returns  A Promise that resolves to the interview ID.
   */
  private static scheduleInterviewAndAddToShortlist(
    candidateId: number,
    empNumber: number
  ) {
    this.addCandidateToShortlist(candidateId);
    return RecruitmentService.scheduleInterviewForCandidate(candidateId, [
      empNumber,
    ]).then((interviewRes) => {
      const interviewID = interviewRes.data.id;
      return interviewID;
    });
  }

  /**
   * Marks the interview as passed for a candidate.
   *
   * @param {number} candidateId - The unique identifier of the candidate.
   * @param {number} empNumber - The employee number responsible for marking the interview as passed.
   */
  private static markInterviewAsPassed(candidateId: number, empNumber: number) {
    this.scheduleInterviewAndAddToShortlist(candidateId, empNumber).as(
      "scheduleInterviewData"
    );
    return cy.get("@scheduleInterviewData").then((interviewID: any) => {
      RecruitmentService.markInterviewPass(candidateId, interviewID);
    });
  }

  /**
   * Offers a job to a candidate.
   *
   * @param {number} candidateId - The unique identifier of the candidate.
   * @param {number} empNumber - The employee number responsible for offering the job.
   */
  private static offerJobToCandidate(candidateId: number, empNumber: number) {
    this.markInterviewAsPassed(candidateId, empNumber),
      RecruitmentService.offerJobForCandidate(candidateId);
  }

  /**
   * Hires a candidate.
   *
   * @param {number} candidateId - The unique identifier of the candidate.
   * @param {number} empNumber - The employee number responsible for hiring the candidate.
   */
  private static hireCandidate(candidateId: number, empNumber: number) {
    this.offerJobToCandidate(candidateId, empNumber),
      RecruitmentService.hireCandidate(candidateId);
  }

  /**
   * Sets the status of a candidate in the recruitment process.
   *
   * @param {number} candidateId - The unique identifier of the candidate.
   * @param {number} empNumber - The employee number responsible for the action.
   * @param {ECandidateStatus} status - The desired candidate status (e.g., SHORTLISTED, INTERVIEW_SCHEDULED, HIRED).
   */
  static setCandidateStatus(
    candidateId: number,
    empNumber: number,
    status: ECandidateStatus
  ) {
    if (status === ECandidateStatus.SHORTLISTED) {
      this.addCandidateToShortlist(candidateId);
    }

    if (status === ECandidateStatus.INTERVIEW_SCHEDULED) {
      this.scheduleInterviewAndAddToShortlist(candidateId, empNumber);
    }

    if (status === ECandidateStatus.HIRED) {
      this.hireCandidate(candidateId, empNumber);
    }
  }
}
