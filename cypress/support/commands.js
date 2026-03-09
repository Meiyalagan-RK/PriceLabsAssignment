import LoginPage from "../e2e/pageObjects/LoginPage"

const loginPage = new LoginPage()

Cypress.Commands.add("loginSession", (username, password) => {

  cy.session([username, password], () => {
    loginPage.visitLogin()
    loginPage.enterEmail(username)
    loginPage.enterPassword(password)
    loginPage.clickRemember()
    loginPage.clickLogin()
    loginPage.verifyLogin()
  }, {
    cacheAcrossSpecs: true // keep session state when running multiple spec files
  });
});

// utility command for selecting a range in the date picker
Cypress.Commands.add("selectDateRange", (month, startDay, endDay) => {

  cy.get('[qa-id="month-header-menu-button"]').click()

  cy.get(`[qa-id="date-range-picker-month-${month}"]`)
    .should('be.visible')
    .click()

  cy.get(`[aria-label="month  ${month}"]`).within(() => {

    cy.get(`.react-datepicker__day--${String(startDay).padStart(3,'0')}`)
      .not('.react-datepicker__day--outside-month')
      .click()

    cy.get(`.react-datepicker__day--${String(endDay).padStart(3,'0')}`)
      .not('.react-datepicker__day--outside-month')
      .click()

  })

});
// ---------- API helper commands ----------

Cypress.Commands.add('createTag', (listingId, tagName) => {
  return cy.request({
    method: 'POST',
    url: '/api/tags',
    body: { listingId, tagName },
    failOnStatusCode: false
  }).then(resp => {
    expect(resp.status).to.eq(201);
    return resp.body;
  });
});

Cypress.Commands.add('getTags', listingId => {
  return cy.request(`/api/listings/${listingId}/tags`);
});

Cypress.Commands.add('deleteTag', (listingId, tagId) => {
  return cy.request('DELETE', `/api/tags/${tagId}`);
});

