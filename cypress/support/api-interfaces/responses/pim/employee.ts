export interface ICreateEmployeeRes {
  data: {
    empNumber: number;
    lastName: string;
    firstName: string;
    middleName: string;
    employeeId: string;
    terminationId: any;
  };
  meta: any[];
  rels: any[];
}
