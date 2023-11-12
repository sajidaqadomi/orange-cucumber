export interface ICreateVacancyRes {
  data: {
    id: number;
    name: string;
    description: string;
    numOfPositions: any;
    status: true;
    isPublished: true;
    jobTitle: {
      id: number;
      title: string;
      isDeleted: boolean;
    };
    hiringManager: {
      id: number;
      firstName: string;
      middleName: string;
      lastName: string;
      terminationId: any;
    };
  };
  meta: [];
  rels: [];
}
