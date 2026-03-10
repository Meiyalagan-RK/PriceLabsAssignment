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

    cy.get(`.react-datepicker__day--${String(startDay).padStart(3, '0')}`)
      .not('.react-datepicker__day--outside-month')
      .click()

    cy.get(`.react-datepicker__day--${String(endDay).padStart(3, '0')}`)
      .not('.react-datepicker__day--outside-month')
      .click()

  })

});


Cypress.Commands.add('mockBulkUpdateTags', (data) => {

  cy.intercept('POST', '**/api/bulk_update_tags*', (req) => {

    expect(req.body.rowData[0].listing_id).to.eq(data.listingId)
    expect(req.body.rowData[0].tags).to.eq(data.tag)

    req.reply({
      statusCode: 200,
      body: {
        message: "SUCCESS",
        response: {
          mapped: [],
          unmapped: [
            {
              listing_id: data.listingId,
              pms_name: data.pmsName,
              unique_id: `${data.listingId}___${data.pmsName}`,
              taglist: null,
              tags: data.tag
            }
          ],
          failure: []
        }
      }
    })

  }).as('bulkUpdateTags')

})

