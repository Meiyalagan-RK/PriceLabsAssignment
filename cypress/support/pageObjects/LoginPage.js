class LoginPage {
  usernameField() {
    return cy.get('#username');
  }

  passwordField() {
    return cy.get('#password');
  }

  login(user, pass) {
    this.usernameField().type(user);
    this.passwordField().type(pass);
    cy.get('button[type=submit]').click();
  }
}

export default new LoginPage();
