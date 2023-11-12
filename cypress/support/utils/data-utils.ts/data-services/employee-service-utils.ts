import { ApiEmployeesHelper } from "../../../helpers/api-helpers";
import { GenericMethods } from "../../../helpers/generic-methods";

/**
 * Service for performing various employee-related operations, such as creating employees,
 * updating their job information, and managing employee salaries.
 */
export default class EmployeeService {
  /**
   * Creates a new employee with random data.
   * @returns A Promise that resolves with the created employee data.
   */
  static createEmployee() {
    // Load employee data from a fixture and access the "addEmployeeData" property.
    return cy
      .fixture("employees-data")
      .its("addEmployeeData")
      .then((employeeData: any) => {
        employeeData.employeeId = `${GenericMethods.randomNumberFromInterval(
          1,
          100
        )}`;
        employeeData.firstName = GenericMethods.randomString(
          employeeData.firstName
        );

        // Call the API
        return ApiEmployeesHelper.addEmployee(employeeData);
      });
  }
}
