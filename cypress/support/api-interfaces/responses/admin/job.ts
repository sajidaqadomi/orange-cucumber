export interface IAddJobTitleRes {
  data: {
    id: number;
    title: string;
    description: string;
    note: string;
    jobSpecification: {
      id: number | null;
      filename: string | null;
      fileType: string | null;
      fileSize: any;
    };
  };
  meta: any[];
  rels: any[];
}
