import {
  ICreateCandidateReq,
  IScheduleInterviewReq,
  IUpdateCandidateStatusReq,
} from "../../api-interfaces/payloads/recruitment/candidates";
import { ICreateVacancyReq } from "../../api-interfaces/payloads/recruitment/vacancies";
import { ISharedDeleteReq } from "../../api-interfaces/payloads/shared-payloads";
import {
  ICreateCandidateRes,
  IScheduleInterviewRes,
  IUpdateCandidateStatusRes,
} from "../../api-interfaces/responses/recruitment/candidates";
import { ICreateVacancyRes } from "../../api-interfaces/responses/recruitment/vacancies";
import { ISharedDeleteRes } from "../../api-interfaces/responses/shared-reponse";
import { EAPIMethods } from "../../enums/api-enum";

/**
 * URLs for employee-related API endpoints.
 */
const URLS = {
  vacanciesUrl: () => "/api/v2/recruitment/vacancies",
  candidateUrl: () => "/api/v2/recruitment/candidates",
  shortlistUrl: (candidateId: number) =>
    `/api/v2/recruitment/candidates/${candidateId}/shortlist`,
  sheduleInterviewUrl: (candidateId: number) =>
    `/api/v2/recruitment/candidates/${candidateId}/shedule-interview`,
  interviewspassUrl: (candidateId: number, interviewId: number) =>
    `/api/v2/recruitment/candidates/${candidateId}/interviews/${interviewId}/pass`,
  jobOfferUrl: (candidateId: number) =>
    `/api/v2/recruitment/candidates/${candidateId}/job/offer`,
  hireUrl: (candidateId: number) =>
    `/api/v2/recruitment/candidates/${candidateId}/hire`,
};

/**
 * Class for interacting with recruitment-related API endpoints.
 */
class Recruitment {
  static createVacancy(data: ICreateVacancyReq) {
    return cy.APIRequest<ICreateVacancyReq, ICreateVacancyRes>(
      EAPIMethods.POST,
      URLS.vacanciesUrl(),
      data
    );
  }

  static createCandidate(data: ICreateCandidateReq) {
    return cy.APIRequest<ICreateCandidateReq, ICreateCandidateRes>(
      EAPIMethods.POST,
      URLS.candidateUrl(),
      data
    );
  }

  static addCandidateToShortlist(
    candidateId: number,
    data: IUpdateCandidateStatusReq
  ) {
    return cy.APIRequest<IUpdateCandidateStatusReq, IUpdateCandidateStatusRes>(
      EAPIMethods.PUT,
      URLS.shortlistUrl(candidateId),
      data
    );
  }

  static scheduleInterviewForCandidate(
    candidateId: number,
    data: IScheduleInterviewReq
  ) {
    return cy.APIRequest<IScheduleInterviewReq, IScheduleInterviewRes>(
      EAPIMethods.POST,
      URLS.sheduleInterviewUrl(candidateId),
      data
    );
  }

  static markInterviewPass(
    candidateId: number,
    interviewId: number,
    data: IUpdateCandidateStatusReq
  ) {
    return cy.APIRequest<IUpdateCandidateStatusReq, IUpdateCandidateStatusRes>(
      EAPIMethods.PUT,
      URLS.interviewspassUrl(candidateId, interviewId),
      data
    );
  }

  static offerJobForCandidate(
    candidateId: number,
    data: IUpdateCandidateStatusReq
  ) {
    return cy.APIRequest<IUpdateCandidateStatusReq, IUpdateCandidateStatusRes>(
      EAPIMethods.PUT,
      URLS.jobOfferUrl(candidateId),
      data
    );
  }
  static hireCandidate(candidateId: number, data: IUpdateCandidateStatusReq) {
    return cy.APIRequest<IUpdateCandidateStatusReq, IUpdateCandidateStatusRes>(
      EAPIMethods.PUT,
      URLS.hireUrl(candidateId),
      data
    );
  }

  static deleteCandidate(data: ISharedDeleteReq) {
    return cy.APIRequest<ISharedDeleteReq, ISharedDeleteRes>(
      EAPIMethods.DELETE,
      URLS.candidateUrl(),
      data
    );
  }

  static deleteVacancy(data: ISharedDeleteReq) {
    return cy.APIRequest<ISharedDeleteReq, ISharedDeleteRes>(
      EAPIMethods.DELETE,
      URLS.vacanciesUrl(),
      data
    );
  }
}

export default Recruitment;
