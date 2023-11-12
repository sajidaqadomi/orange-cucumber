import TextInput from "../../common-helper/input/text-input";
import { NavigationPath } from "../../enums/ui-routes-enums";

class LoginPage {
  elements = {
    loginButton: () => cy.contains("button[type='submit']", "Login"),
  };

  typeLoginInputs(userName: string, password: string) {
    TextInput.type("sername", userName);
    TextInput.type("assword", password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(username: string, password: string) {
    cy.visit(NavigationPath.Login);
    this.typeLoginInputs(username, password);
    this.clickLogin();
  }
}

export default LoginPage;
