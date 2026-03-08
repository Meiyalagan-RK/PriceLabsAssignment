import LoginPage from "./pageObjects/LoginPage"

const loginPage = new LoginPage()

Cypress.Commands.add("login", (username, password) => {
  loginPage.visitLogin()
  loginPage.enterEmail(username)
  loginPage.enterPassword(password)
  loginPage.clickRemember()
  loginPage.clickLogin()
  loginPage.verifyLogin()
})

Cypress.Commands.add("loginSession", (username, password) => {

  cy.session([username, password], () => {
    loginPage.visitLogin()
    loginPage.enterEmail(username)
    loginPage.enterPassword(password)
    loginPage.clickRemember()
    loginPage.clickLogin()
    loginPage.verifyLogin()
  })

})