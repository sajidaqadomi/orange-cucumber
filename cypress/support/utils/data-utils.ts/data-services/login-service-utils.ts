import { LoginPage } from "../../../page-objects";

/**
 * Service for handling login operations.
 * This service provides methods for logging into the application.
 */
const loginPage: LoginPage = new LoginPage();

export default class LoginService {
  /**
   * Performs a login operation with valid user credentials.
   * @returns  A Promise that resolves when the login is successful.
   */
  static login() {
    cy.fixture("login-data").as("loginInfo");
    return cy
      .get("@loginInfo")
      .its("validUserNamePassword")
      .then(({ userName, password }) => {
        //Call The API
        return loginPage.login(userName, password);
      });
  }
}
