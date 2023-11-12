export interface ICreateVacancyReq {
  description: string;
  employeeId: number;
  isPublished: boolean;
  jobTitleId: number;
  name: string;
  numOfPositions: null | number;
  status: boolean;
}
