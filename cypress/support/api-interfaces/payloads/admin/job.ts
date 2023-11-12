export interface IAddJobTitleReq {
  title: string;
  description: string;
  specification: string | null;
  note: string;
}

export interface IDeleteJobTitleReq {
  ids: number[];
}
