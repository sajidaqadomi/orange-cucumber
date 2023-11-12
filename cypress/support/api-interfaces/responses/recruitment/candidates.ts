export interface ICreateCandidateRes {
  data: {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
  };
  meta: [];
  rels: [];
}

export interface IUpdateCandidateStatusRes {
  data: {
    id: number;
    candidate: {
      id: number;
      firstName: string;
      middleName: null | string;
      lastName: string;
    };
    vacancy: {
      id: number;
      name: string;
      hiringManager: {
        empNumber: number;
        firstName: string;
        middleName: string;
        lastName: string;
        terminationId: null | number;
      };
    };
    note: null | string;
    action: {
      id: number;
      label: string;
    };
  };
  meta: any[];
  rels: any[];
}

export interface IScheduleInterviewRes {
  data: {
    id: number;
    name: string;
    candidate: {
      id: number;
      firstName: string;
      middleName: null | string;
      lastName: string;
    };
    vacancy: {
      id: number;
      name: string;
    };
    interviewers: [
      {
        empNumber: number;
        lastName: string;
        firstName: string;
        middleName: string;
        terminationId: null | number;
      }
    ];
    interviewDate: string;
    interviewTime: string;
    note: null | string;
  };
  meta: {
    historyId: number;
  };
  rels: any[];
}
