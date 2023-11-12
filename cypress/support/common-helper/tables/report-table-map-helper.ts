import { IkeyValue } from "../../types/generic-interface";

/**
 * Report_Map_Header is a mapping of report header labels to corresponding data keys.
 * It provides a convenient way to access data fields based on report column headers.
 */
export const Report_Map_Header: IkeyValue = {
  "Employee First Name": "firstName",
  "Job Title": "jobTitle",
  Amount: "salaryAmount",
};

export const Employee_Claims_Map_Header: IkeyValue = {
  "Reference Id": "referenceId",
  "Employee Name": "employeeName",
  "Event Name": "eventName",
  Description: "description",
  Currency: "currency",
  "Submitted Date": "submittedDate",
  Status: "status",
  Amount: "amount",
  Actions: "actions",
};
