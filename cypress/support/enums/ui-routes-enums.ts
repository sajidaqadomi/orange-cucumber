/**
 * Enum representing navigation paths in the application.
 */
export enum NavigationPath {
  Login = "/auth/login",
  Admin = "/admin/viewSystemUsers",
  PIM = "/pim/viewEmployeeList",
  Leave = "/leave/viewLeaveList",
  Time = "/time/viewEmployeeTimesheet",
  Recruitment = "/recruitment/viewCandidates",
  MyInfo = "/pim/viewPersonalDetails/empNumber",
  Performance = "/performance/searchEvaluatePerformanceReview",
  Dashboard = "/dashboard/index",
  Directory = "/directory/viewDirectory",
  Maintenance = "/maintenance/purgeEmployee",
  Claim = "/claim/viewAssignClaim",
  Buzz = "/buzz/viewBuzz",
  viewReports = "/pim/viewDefinedPredefinedReports",
  ViewassignClaimById = "/claim/assignClaim/id",
  ViewAllAssignClaim = "claim/viewAssignClaim",
  CandidateProfile ="/recruitment/addCandidate"
}
