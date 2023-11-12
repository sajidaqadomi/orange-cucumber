export interface ICreateCandidateReq {
  firstName: string;
  middleName: null | string;
  lastName: string;
  email: string;
  contactNumber: null | string;
  keywords: any;
  comment: null | string;
  dateOfApplication: string;
  consentToKeepData: boolean;
  vacancyId: number;
}

export interface IUpdateCandidateStatusReq {
  note: null | string;
}

export interface IScheduleInterviewReq {
  interviewName: string;
  interviewDate: string;
  interviewTime: string;
  note: null | string;
  interviewerEmpNumbers: number[];
}
