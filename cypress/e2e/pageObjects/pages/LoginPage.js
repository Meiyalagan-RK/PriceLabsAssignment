import loginLocators from "../locators/loginLocators"

class LoginPage {

  visitLogin() {
    cy.visit(Cypress.env("loginUrl"))
  }

  enterEmail(email) {
    cy.get(loginLocators.emailInput).type(email)
  }

  enterPassword(password) {
    cy.get(loginLocators.passwordInput).type(password)
  }

  clickRemember() {
    cy.get(loginLocators.rememberMeCheckbox).click()
  }

  clickLogin() {
    cy.get(loginLocators.loginButton).click()
  }

  verifyLogin() {
    cy.url().should("include", "/multicalendar")
  }

}

export default LoginPage