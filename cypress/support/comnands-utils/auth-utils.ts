export {};

// Extend the Cypress namespace to add a custom command for logging out.
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      Logout: typeof logout;
    }
  }
}

/**
 * Logs the user out of the application.
 */
const logout = () => {
  const elements = {
    userDropdownIcon: () =>
      cy.get(".oxd-topbar-header-userarea .oxd-userdropdown-icon"),
    LogoutButton: () => cy.get('a[href="/web/index.php/auth/logout"]'),
  };
  elements.userDropdownIcon().click({ force: true });
  elements.LogoutButton().click({ force: true });
};

Cypress.Commands.add("Logout", logout);
