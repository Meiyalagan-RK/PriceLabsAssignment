class LoginPage {

  visitLogin() {
    cy.visit(Cypress.env("loginUrl"))
  }

  enterEmail(email) {
    cy.get('#user_email').type(email)
  }

  enterPassword(password) {
    cy.get('#password-field').type(password)
  }

  clickRemember() {
    cy.get('#user_remember_me').click()
  }

  clickLogin() {
    cy.get('.btn-red').click()
  }

  verifyLogin() {
    cy.url().should("include", "/multicalendar")
  }

}

export default LoginPage