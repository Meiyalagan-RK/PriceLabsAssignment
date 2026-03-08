
import home from '../support/pageObjects/HomePage';


describe("Multicalendar Tests", () => {

  beforeEach(() => {
    cy.loginSession(
      Cypress.env("username"),
      Cypress.env("password")
    )
  })

  it("Verify multicalendar page loads", () => {
    cy.visit("/multicalendar")
    cy.url().should("include", "multicalendar")
  })

})